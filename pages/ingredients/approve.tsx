import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Button } from "@nextui-org/react";

function approve() {

    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รออนุมัติ</p>
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
            <div className="w-full">
                <div className="flex w-full flex-col">
                    
                            <div className="relative overflow-x-auto mx-4">

                                <table className="w-full text-sm text-center table-fixed">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362]  ">
                                            <td scope="col" className="px-3 py-3 w-64">
                                                ล็อตสินค้า
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                                วันที่ทำรายการ
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">รายการที่ใช้
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">รายละเอียด
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                                อนุมัติวัตถุดิบที่ใช้
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                            <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">

                                            </td>

                                            <td className=" py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">

                                            </td>

                                            <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">

                                            </td>
                                            <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                            <button type="submit" className="w-full flex justify-center items-center" >
                                                        {/* <Link  className="w-full flex justify-center items-center"> */}
                                                            <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
                                                        {/* </Link> */}
                                                    </button>
</td>
                                            <td className="px-12 py-1 whitespace-nowrap overflow-hidden ">
                                                <Button className="mr-2 bg-red-500 text-white" size="sm">ยกเลิก</Button>
                                                <Button size="sm" className="bg-green-500 text-white">ยืนยัน</Button>
                                            </td>

                                        </tr>



                                    </tbody>
                                </table>
                            </div>


                   
                       
                </div>
            </div>
        </div>
    )
}

export default approve