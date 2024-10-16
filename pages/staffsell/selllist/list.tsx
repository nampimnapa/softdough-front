import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";


function Listorder() {


    const [loading, setLoading] = useState(true);
    const [Production, setProduction] = useState([]);
    interface Production {
        od_id: number,
        od_date: string;
        od_net: number;
        odt_name: string;
        odt_id: number;
        st_name: string;

    }
    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/order`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProduction(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const StatusTabs =
        [{ id: 0, name: "ทั้งหมด" },
        { id: 1, name: "หน้าร้าน" },
        { id: 2, name: "Line man" },
        { id: 3, name: "Grab" },
        ];



    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รายการขายสินค้า</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required ></input>
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border  hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
            </div>
            <div className="flex w-full flex-col ">
                <Tabs aria-label="Dynamic tabs" items={StatusTabs} variant="underlined" className="mx-2">
                    {(selectedTab) => (
                        <Tab key={selectedTab.id} title={selectedTab.name}>
                            <div className="relative overflow-x-auto mx-4 ">
                                <table className="w-full text-sm text-center text-gray-500 ">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362] ">
                                            <td scope="col" className="px-6 py-3">
                                                วันที่และเวลา
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                คำสั่งซื้อ
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                พนักงาน
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                ยอดรวมสุทธิ
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                รายละเอียด
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(Production) && Production

                                            // เรียงวันที่จากล่าสุดไปเก่าสุด
                                            // .sort((a, b) => new Date(b.od_date) - new Date(a.od_date))
                                            .sort((a, b) => new Date(b.od_date).getTime() - new Date(a.od_date).getTime())
                                            .filter((order) => {
                                                // เพิ่มเงื่อนไขกรองข้อมูลที่ต้องการที่นี่
                                                const isOrderNameValid = order.odt_name !== null && order.odt_name !== undefined;
                                                const isStatusValid = selectedTab.name === "ทั้งหมด" ||
                                                    (selectedTab.name === "หน้าร้าน" && order.odt_id === 1) || // ถ้าแท็บเป็นหน้าร้าน ให้แสดงถ้า odt_id = 1
                                                    (order.odt_id.toString() === selectedTab.id.toString()); // หรือถ้า pdo_status ตรงกับ selectedTab.id

                                                return isOrderNameValid && isStatusValid; // คืนค่า true ถ้าผ่านทั้งสองเงื่อนไข
                                            })
                                            .map((order) => (
                                                <tr
                                                    key={order.od_id}
                                                    className="odd:bg-white even:bg-[#F5F1E8] border-b h-10"
                                                >
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {new Date(order.od_date).toLocaleString("th-TH", {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                            hour12: false // ใช้ 24 ชั่วโมง
                                                        })}                                                    </td>
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {order.odt_name}
                                                    </td>
                                                    <td className="px-6 py-1">{order.st_name}</td>
                                                    <td className="px-6 py-1">{order.od_net}</td>
                                                    <td className="px-6 py-4 flex items-center justify-center">
                                                        <Link
                                                            href={`./detail/${order.pdo_id}`}
                                                            className="w-full flex justify-center items-center"
                                                        >
                                                            <button type="submit">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182]" />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>

                                </table>
                            </div>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </div >
    )
}

export default Listorder