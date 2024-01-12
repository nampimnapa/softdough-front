import React, { Fragment, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function detailall() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const ingredients =
        [
            {
                id: 1,
                name: 'ไข่ไก่',
                stock: 5,
                unit: 'แผง',
                min: 5,
                status: 'ปกติ',
                gramperunit: '650',
                unitgram: 'กรัม'
            },

        ]
    const [categories, setCategories] = useState(ingredients);





    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบทั้งหมด
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>รายละเอียดวัตถุดิบ</p>
            {ingredients.map((ingredients) => (<div>
                <p className="text-sm px-6 py-2 text-[#73664B]">รายการ : {ingredients.name}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนการซื้อขั้นต่ำ : {ingredients.min}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยของวัตถุดิบ : {ingredients.unit}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">ปริมาณต่อหน่วย : {ingredients.gramperunit}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยปริมาณต่อหน่วย : {ingredients.unitgram}</p>
            </div>
            ))}

            <div className="flex justify-between  mt-3 " >
                <button>
                    <Link href="/ingredients/edit"
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        แก้ไขวัตถุดิบ</Link></button>



                <button type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    <Link href="/ingredients/all">
                    เสร็จสิ้น</Link></button>
            </div>
        </div>
    )
}


export default detailall