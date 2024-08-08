

// สร้างไว้แล้วลืมมั้ง
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";




function ingreincome() {

    // const [ingrelot, setIngrelot] = useState([
    //     {
    //         lotno: "LOT01",
    //         date: '10/10/2555',
    //         ingre: [
    //             {
    //                 name: 'แป้ง',
    //                 count: "2",
    //                 unit: "ถุง",
    //                 exp: "10/10/2556",
    //                 price: '500'
    //             },
    //             {
    //                 name: 'น้ำตาล',
    //                 count: "2",
    //                 unit: "ถุง",
    //                 exp: "10/10/2556",
    //                 price: '100'
    //             }
    //         ],

    //     },
    //     {
    //         lotno: "LOT02",
    //         date: '10/10/2555',
    //         ingre: [
    //             {
    //                 name: 'แป้ง',
    //                 count: "2",
    //                 unit: "ถุง",
    //                 exp: "10/10/2556",
    //                 price: '500'
    //             },
    //             {
    //                 name: 'น้ำตาล',
    //                 count: "2",
    //                 unit: "ถุง",
    //                 exp: "10/10/2556",
    //                 price: '100'
    //             }
    //         ],

    //     },

    // ]);
    const [indid, setIngredientlotID] = useState({ /* ตัวแปรที่คุณต้องการใช้ เช่น indl_id, ind_id และอื่นๆ */ });
    const [loading, setLoading] = useState(false);
    const [ind, setIngredientLot] = useState<any[]>([]);
    const [pendingIngredientLot, setPendingIngredientLot] = useState<any[]>([]);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/selltype`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredientLot(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const getStatusText = (status) => {
        return status === 2 ? 'ยืนยัน' : 'ไม่ยืนยัน';
    };

    return (
        <div className='h-screen'>
            <p className='text-[#F2B461] font-medium m-4'>ประเภทการขาย</p>
            <div className="flex justify-between">

                <div className="mr-4 scale-90 flex items-center">
                    <Link href={`./add`}>
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto mx-5 mt-5">
                <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
                    <thead >
                    {Array.isArray(ind) && ind.map((lot, idx) => (
                        <tr key={lot.odt_id} className="text-white  font-normal  bg-[#908362]  ">
                            <td scope="col" className="px-1 py-3 ">
                                {lot.odt_name}
                            </td>
                            {/* <td scope="col" className="px-1 py-3 ">
                                เมนู
                            </td>
                            <td scope="col" className="px-6 py-3 ">
                                เลขล็อตวัตถุดิบ
                            </td>

                            <td scope="col" className="px-1 py-3 ">
                                สถานะ
                            </td>
                            <td scope="col" className="px-1 py-3 ">

                            </td>
                            <td scope="col" className="px-1 py-3 ">

                            </td> */}
                        </tr>
                        ))}
                    </thead>
                    <tbody>
                        {/* {Array.isArray(ind) && ind.map((lot, idx) => (
                            <tr key={lot.indl_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10 items-center">
                                <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
                                    {lot.created_at}                            </td>
                                <td className="px-6 py-1  text-[#73664B] text-center">
                                    {lot.indl_id_name}
                                </td>
                                <td
                                    className={`px-6 py-1 
                                ${lot.status === '2' ? 'text-green-500'
                                            : lot.status === '1' ? 'text-red-500'
                                                : ''}`}

                                >
                                    {lot.status === '2' ? 'ใช้งาน' : lot.status === '1' ? 'ไม่ถูกใช้งาน' : lot.status}
                                </td>
                                <td className="px-1 py-3  items-center justify-center  ">
                                    {lot.status === '1' && (
                                        <button >
                                            <Link href={`./edit/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                            </Link>
                                        </button>
                                    )}

                                </td>
                                <td className="px-1 py-3  items-center justify-center  ">
                                    <button >
                                        <Link href={`./detail/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                            <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                        </Link>
                                    </button>
                                </td>

                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default ingreincome