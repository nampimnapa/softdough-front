import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});



function add() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const ingredientsData =
    {
        id: 1,
        name: 'ไข่ไก่',
        stock: 5,
        unit: 'แผง',
        min: 5,
        status: 'ปกติ',
        gramperunit: '650',
        unitgram: 'กรัม'
    }

    const [nameIn, setnameIn] = useState('');
    const [stockIn, setstockIn] = useState('');
    const [unitIn, setunitIn] = useState('');
    const [minIn, setminIn] = useState('');
    const [statusIn, setstatusIn] = useState('');
    const [gramperunitIn, setgramperunitIn] = useState('');
    const [unitgramIn, setunitgramIn] = useState('');

    const [formIn, setformIn] = useState({
        name: '',
        stock: '',
        min: '',
        pw: '',
        depart: '',
    });

    const formInsave = {
        nameIn,
        stockIn,
        unitIn,
        minIn,
        statusIn,
        gramperunitIn,
        unitgramIn
    }



    const handleCancelClick = () => {
        setformIn({
            name: '',
            stock: '',
            min: '',
            pw: '',
            depart: '',
        });

        console.log("Test data => ", formInsave);

        setnameIn('');
        setstockIn('');
        setunitIn('');
        setminIn('');
        setstatusIn('');
        setgramperunitIn('');
        setunitgramIn('');
    };




    // const [categories, setCategories] = useState(ingredients);

    // const [ingredients, setIngredient] = useState(ingredientsData);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setIngredient((prevFormIn) => ({
    //         ...prevFormIn,
    //         [name]: value,
    //     }));
    // }

    // console.log(ingredients);

    return (
        <div className='h-screen' >
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบทั้งหมด
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>เพิ่มวัตถุดิบ</p>
            <form className="mt-5 w-1/2 key={index} ">
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        รายการ :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            placeholder="ชื่อวัตถุดิบ"
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            // placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        จำนวนการซื้อขั้นต่ำ :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            placeholder="จำนวน"
                            min="0"
                            onChange={handleCancelClick}
                            type="number"
                            name="min"
                            id="min"
                            autoComplete="family-name"
                            // placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        หน่วยของวัตถุดิบ :</label>
                    <div className="mt-2 col-span-2">
                        <select id="countries"

                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                            name="unit">
                            <option disabled selected value="">
                                เลือกหน่วยวัตถุดิบ
                            </option>
                            <option>ถุง</option>
                            <option>แผง</option>
                            <option>กล่อง</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        ปริมาณต่อหน่วย :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            placeholder="ปริมาณต่อหน่วย"
                            min="0"
                            type="number"
                            name="min"
                            id="min"
                            autoComplete="family-name"
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]    sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        หน่วยปริมาณต่อหน่วย :</label>
                    <div className="mt-2 col-span-2">
                        <select id="countries"
                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                            name="unitgram"
                        >
                            <option disabled selected value="">
                                เลือกหน่วยปริมาณต่อวัตถุดิบ
                            </option>
                            <option>กรัม</option>
                            <option>กิโลกรัม</option>
                            <option>ลิตร</option>
                        </select>
                    </div>
                </div>
            </form>

            < div className="flex justify-between  mt-8 " >
                <button>
                    <Link href="/ingredients/all"
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        ย้อนกลับ</Link></button>
                <>
                    {isOpen && (
                        <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-[73664B]"
                                                >
                                                    ยืนยันการเพิ่มวัตถุดิบ
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการเพิ่มวัตถุดิบหรือไม่
                                                    </p>
                                                </div>
                                                {/*  choose */}
                                                <div className="flex justify-end">
                                                    <div className="inline-flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        >
                                                            ยกเลิก
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        // onClick={closeModal}
                                                        ><Link href="/ingredients/all">
                                                                ยืนยัน
                                                            </Link></button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    )
                    }
                </>
                <button onClick={openModal} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
            </div >

        </div >
    )
}

export default add