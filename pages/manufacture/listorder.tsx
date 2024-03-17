import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";


function listorder() {


    const [loading, setLoading] = useState(true);
    const [Production, setProduction] = useState([]);
    interface Production {

        pdo_id_name: string;
        updated_at: string;
        pdo_status: number;

    }
    useEffect(() => {
        // Fetch staff data on component mount
        fetch('http://localhost:8080/production/readall')
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
        [{ id: 1, name: "ทั้งหมด" },
        { id: 2, name: "สั่งผลิตแล้ว" },
        { id: 3, name: "กำลังดำเนินการ" },
        { id: 4, name: "ยกเลิกแล้ว" },
        { id: 5, name: "เสร็จสิ้น" }
        ];



    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รายการสั่งผลิต</p>
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
                                                วันที่สั่งผลิต
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                ใบสั่งผลิต
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                สถานะ
                                            </td>
                                            <td scope="col" className="px-6 py-3">
                                                รายละเอียด
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Production
                                            .filter((order) => selectedTab.name === "ทั้งหมด" ? true : order.status === selectedTab.name)
                                            .map((order) => (
                                                <tr
                                                    key={order.pdo_id}
                                                >
                                                    <td
                                                        scope="row"
                                                        className="px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {order.updated_at}
                                                    </td>
                                                    <td className="px-6 py-1">{order.pdo_id_name}</td>
                                                    {/* // order.status === 'ยกเลิกแล้ว' ? ' text-red-600' : */}
                                                    {/* order.pdo_status === 'เสร็จสิ้น' ? ' text-green-600' : */}
                                                    <td className={`h-10 
                                                    ${order.pdo_status === '2' ? ' text-yellow-500' :
                                                            order.pdo_status === '1' ? 'text-[#73664B]' : ''
                                                        }`}>

                                                        {order.pdo_status === '2' ? 'กำลังดำเนินการ' : order.pdo_status === '1' ? 'สั่งผลิตแล้ว' : order.pdo_status}
                                                    </td>
                                                    <td className="px-6 py-4 flex items-center justify-center">
                                                        <button type="submit">
                                                            <Link
                                                                href={`./detail/${order.pdo_id}`}
                                                                className="w-full flex justify-center items-center">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182]" />
                                                            </Link>
                                                        </button>
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

export default listorder