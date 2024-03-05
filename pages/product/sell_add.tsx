import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';

function sell_add() {
    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    เมนูสำหรับขาย
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>เพิ่มเมนูสำหรับขาย</p>
            <div className="grid grid-cols-3 w-1/3 my-2 h-min">
                <p className="text-sm px-6 py-2 text-[#73664B] w-full">ชื่อสินค้า :</p>
                <input
                    placeholder="ชื่อเมนูสำหรับขาย"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="col-span-2 px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
            </div>
            <div className="w-1/4 flex h-min items-center">
                <p className="text-sm pl-6 text-[#73664B] mr-4 w-full ">ประเภทสินค้า :</p>
                <select
                    id="product"
                    className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                    name="unit"
                >
                    <option disabled selected value="">
                        เลือกประเภทสินค้า
                    </option>
                    <option>โดนัท</option>
                    <option>ดิป</option>
                </select>
            </div>
            <div className="grid grid-cols-3 w-1/3 my-2 h-min">
                <p className="text-sm px-6 py-2 text-[#73664B] w-full">ราคา :</p>
                <input
                    placeholder="ราคา"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="col-span-2 px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
            </div>
        </div>
    )
}

export default sell_add