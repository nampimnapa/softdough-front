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

function sell_detail() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    return (
        <div>
            <button className='my-3 mx-5 '>
                <Link href="/product/sell_all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    เมนูสำหรับขาย
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดเมนูสำหรับขาย</p>

            <div className="mx-6 my-2 text-sm text-[#73664B] grid grid-cols-2 ">
                <div>
                    <p className="my-3">ชื่อเมนู :</p>
                    <p className="my-3">ประเภทเมนูสำหรับขาย :</p>
                    <p className="my-3">ราคา :</p>
                    <p className="my-3 font-semibold">เมนูกำหนดไว้</p>
                    <p>เลือกสินค้า :</p>
                </div>
                <div className="mx-6 my-2">
                    <p>รูปภาพประกอบ :</p>
                    <img src="/images/logo.svg" className="w-32 h-32" />
                </div>
            </div>
            <div className="mx-6 my-2">
                <p className="text-sm mt-10  text-[#73664B]">สถานะสินค้า :</p>
                <div className="mt-2 col-span-3 flex ">
                    <div className="form-control">
                        <label className="label cursor-pointer ">
                            <input type="radio" name="status" className="radio checked:bg-[#C5B182]" checked />
                            <span className="text-sm text-[#73664B] px-3 ">ใช้งานอยู่</span>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="radio" name="status" className="radio checked:bg-[#C5B182]" />
                            <span className="text-sm text-[#73664B] px-3">ยกเลิกรายการ</span>
                        </label>
                    </div>
                </div>
            </div>
            <button type="button" className="ml-6 mt-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>

        </div>
    )
}

export default sell_detail