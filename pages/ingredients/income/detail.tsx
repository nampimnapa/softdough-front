import React, { Fragment, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function detail() {
    const [ingrelot, setIngrelot] = useState([
        {
            lotno: "LOT01",
            date: '10/10/2555',
            ingre: [
                {
                    name: 'แป้ง',
                    count: "2",
                    unit: "ถุง",
                    exp: "10/10/2556",
                    price: '500'
                },
                {
                    name: 'น้ำตาล',
                    count: "2",
                    unit: "ถุง",
                    exp: "10/10/2556",
                    price: '100'
                }
            ],
        },
    ]);

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดวัตถุดิบเข้าร้าน</p>
            {ingrelot.map((lot, idx) => (
                <div key={idx}>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {lot.lotno}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {lot.date}</p>
                    {lot.ingre.map((ingredient, Idx) => (
                        <Fragment key={Idx}>
                            <div className="grid grid-cols-8">
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ : {ingredient.name}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">จำนวน : {ingredient.count} {ingredient.unit}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.exp}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p></div>
                        </Fragment>
                    ))}
                </div>
            ))}
            <div className="flex justify-end  mt-5" >
                <button type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    <Link href="/ingredients/income/all">
                        เสร็จสิ้น</Link></button>
            </div>
        </div>
    );
}

export default detail