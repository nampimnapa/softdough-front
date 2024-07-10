import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

function waiting() {
    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รอดำเนินการผลิต</p>
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
                                    รายละเอียด
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    ดำเนินการผลิต
                                </td>
                            </tr>
                        </thead>
                        <tbody>

                            <tr
                                className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10"
                            >
                                <td
                                    scope="row"
                                    className="px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white"
                                >

                                </td>
                                <td className="px-6 py-1"></td>
                                {/* // order.status === 'ยกเลิกแล้ว' ? ' text-red-600' : */}
                                {/* order.pdo_status === 'เสร็จสิ้น' ? ' text-green-600' : */}
                                <td >
                                    <Link
                                        href=""
                                        className="w-full flex justify-center items-center">
                                        <button type="submit">
                                            <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182]" /></button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center">



                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default waiting