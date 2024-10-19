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
    const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา
    interface Production {
        pdo_id: string;
        pdo_id_name: string;
        updated_at: string;
        pdo_status: number;

    }
    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readall`)
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
        { id: 1, name: "สั่งผลิตแล้ว" },
        { id: 2, name: "กำลังดำเนินการ" },
        { id: 4, name: "เสร็จสิ้น" }
        ];

    // ค้นหา
    const filteredProduction = Production.filter((Productio) =>
        Productio.pdo_id_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รายการสั่งผลิต</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input
                            type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา"
                            value={searchTerm} // เชื่อมต่อกับ state
                            onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต searchTerm เมื่อผู้ใช้พิมพ์
                        />
                    </div>
                </form>
            </div>
            <div className="flex w-full flex-col ">
                <Tabs aria-label="Dynamic tabs" items={StatusTabs} variant="underlined" className="mx-2">
                    {(selectedTab) => (
                        <Tab key={selectedTab.id} title={selectedTab.name}>
                            <div className="relative max-h-[calc(100vh-225px)] overflow-y-auto">
                                <table className="w-full text-sm text-center text-gray-500 mb-10">
                                    <thead className="sticky top-0 bg-[#908362]">
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
                                        {Array.isArray(filteredProduction) && filteredProduction.filter((order) => {
                                            if (selectedTab.name === "ทั้งหมด") {
                                                return true; // แสดงทุก pdo_status เมื่อเลือกแท็บ "ทั้งหมด"
                                            } else {
                                                return order.pdo_status.toString() === selectedTab.id.toString();
                                            }
                                        })
                                            .sort((a, b) => Number(b.pdo_id) - Number(a.pdo_id))

                                            // .sort((a, b) => {
                                            //     // Sort by date first (newest to oldest)
                                            //     const dateComparison = new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                                            //     if (dateComparison !== 0) return dateComparison;

                                            //     // Ensure pdo_id is a string and sort it (largest to smallest)
                                            //     if (typeof b.pdo_id === 'string' && typeof a.pdo_id === 'string') {
                                            //         return b.pdo_id.localeCompare(a.pdo_id);
                                            //     }
                                            //     return 0;
                                            // })
                                            .map((order) => (
                                                <tr
                                                    key={order.pdo_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10"
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
                                                            order.pdo_status === '1' ? 'text-[#C5B182]' :
                                                                order.pdo_status === '3' ? 'text-green-500' :
                                                                    order.pdo_status === '4' ? 'text-green-500' : ''
                                                        }`}>
                                                        {/* 3 เสร็จสิ้นแล้วแบบยังไม่เพิ่มวัตถุดิบที่ใช้   4 เสร็จสิ้นแล้วเพิ่มแล้ว */}
                                                        {order.pdo_status === '5' ? 'รออนุมัติ' : order.pdo_status === '4' ? 'เสร็จสิ้นแล้ว' : order.pdo_status === '3' ? 'เสร็จสิ้นแล้วยังไม่เพิ่มวัตถุดิบ' : order.pdo_status === '2' ? 'กำลังดำเนินการ' : order.pdo_status === '1' ? 'สั่งผลิตแล้ว' : order.pdo_status}
                                                    </td>
                                                    <td className="px-6 py-4 flex items-center justify-center">

                                                        <Link
                                                            href={`./detail/${order.pdo_id}`}
                                                            className="w-full flex justify-center items-center">
                                                            <button type="submit">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182]" /></button>
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