import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';

function sell_all() {
    const menusell = [
        {
            id: 1,
            name: "เรดเวลเวด, กล่อง L",
            price: 100,
        },
        {
            id: 2,
            name: "ใบเตย, กล่อง L",
            price: 100,
        },
    ]

    return (
        <div className="h-screen">
            <p className='text-[#F2B461] font-medium m-4'>เมนูสำหรับขาย</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required>
                        </input>
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    <Link href="/product/sell_add">
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-1/4 flex h-min items-center m-3">
                <select
                    id="sellmenu"
                    className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                    name="unit"
                >
                    <option disabled selected value="">
                        เลือกเมนูสำหรับขาย
                    </option>
                    <option>โดนัท</option>
                    <option>ดิป</option>
                </select>
            </div>
            <p className="font-medium m-4 text-[#C5B182]  border-b-1 border-b-[#C5B182] ">โดนัท</p>
            {/* card */}
            <div className="flex flex-wrap ">
                {menusell.map((menu) => (
                    <div key={menu.id} className="card w-52 h-52 bg-base-100 shadow-sm mx-2  ml-5">
                        <figure className="mt-3">
                            {/* You can replace the image source with the actual image URL */}
                            <img src="/images/logo.svg" alt={menu.name} className="w-32 h-32" />
                        </figure>
                        <div className="card-body">
                            <div className="text-center">
                                <p className="text-mediem text-[#73664B]">
                                    {menu.name}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-[#F2B461]">{menu.price} บาท</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182]">ดิป</p>
            <div className="flex flex-wrap ">
                {menusell.map((menu) => (
                    <div key={menu.id} className="card w-52 h-52 bg-base-100 shadow-sm mx-2  ml-5">
                        <figure className="mt-3">
                            {/* You can replace the image source with the actual image URL */}
                            <img src="/images/logo.svg" alt={menu.name} className="w-32 h-32" />
                        </figure>
                        <div className="card-body">
                            <div className="text-center">
                                <p className="text-mediem text-[#73664B]">
                                    {menu.name}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-[#F2B461]">{menu.price} บาท</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default sell_all