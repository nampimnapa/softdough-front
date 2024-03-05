import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});
function recipe_detail() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const handleConfirm = () => {
        closeModal();
    };
    // cancel
    const handleCancel = () => {

        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };
    return (
        <div>
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    สูตรอาหาร
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดสินค้า</p>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สินค้า</p>
                    <button>
                        <Link href="/product/recipe_edit#item1">
                            <PencilSquareIcon className="ml-3 h-4 w-4 text-[#73664B]" /></Link>
                    </button>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B] ">
                    <div className="flex">
                        <div className="w-full">
                            <p className="ml-3 w-full">ประเภทสินค้า :</p>
                            <p className="ml-3">ชื่อสินค้า :</p>
                            <p className="ml-3">จำนวนขั้นต่ำ :</p>
                            <p className="ml-3">หน่วยสินค้า :</p>
                        </div>
                        <div className="w-full flex">
                            <p className="ml-3">รูปภาพ :</p>
                            <img src="/images/logo.svg" alt="imgdonut" className="w-24 h-24" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สูตรอาหาร</p>
                    <button>
                        <Link href="/product/recipe_edit#item2">
                            <PencilSquareIcon className="ml-3 h-4 w-4 text-[#73664B]" /></Link>
                    </button>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B]">
                    {/* วนลูปเอาสูตรมาแสดง */}
                    <div className="flex">
                        <p className="ml-3">วัตถุดิบ :</p>
                        <p className="ml-5">ปริมาณ :</p>
                        <p className="ml-5">หน่วย :</p>
                    </div>
                    <p className="ml-3 mt-3">สูตรอาหารที่ผลิตได้ :</p>
                </div>
            </div>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สถานะสินค้า</p>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B]">
                    <div className="mt-2 col-span-3 flex ml-3">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="depart" className="radio checked:bg-[#C5B182] " />
                                <span className=" text-[#73664B] px-3 ">ใช้งานอยู่</span>
                            </label>
                        </div>
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="depart" className="radio checked:bg-[#C5B182]" />
                                <span className="text-[#73664B] px-3">ยกเลิกรายการ</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <button>
                        <Link href="/product/recipeall"
                            onClick={handleCancel}
                            type="button"
                            className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                            ยกเลิก</Link></button>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}  >
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
                                                        ยืนยันการเปลี่ยนสถานะสินค้า
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเปลี่ยนสถานะสินค้าหรือไม่
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
                                                                onClick={handleConfirm}
                                                            ><Link href="/product/all">
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
                    <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
                </div >
            </div>
        </div >
    )
}

export default recipe_detail