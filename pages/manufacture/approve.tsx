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
                    <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 mx-5 border-b-1 border-b-[#E3D8BF]",
                            cursor: "w-full bg-[#73664B]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#73664B]"
                        }}
                    >
                        {/* Tab 1 */}
                        <Tab
                            key="product"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>ยืนยันใบสั่งผลิต</span>
                                </div>
                            }
                        >
                            <div className="relative overflow-x-auto mx-4">

                                <table className="w-full text-sm text-center table-fixed">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362]  ">
                                            <td scope="col" className="px-3 py-3 w-64">
                                                วันที่ผลิต
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                                ใบสั่งผลิต
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">รายละเอียด
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                                อนุมัติใบสั่งผลิต
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
                                            <td className="px-12 py-1 whitespace-nowrap overflow-hidden ">
                                                <Button className="mr-2 bg-red-500 text-white" size="sm">ยกเลิก</Button>
                                                <Button size="sm" className="bg-green-500 text-white">ยืนยัน</Button>
                                            </td>

                                        </tr>



                                    </tbody>
                                </table>
                            </div>


                        </Tab>
                        {/* tab2 */}
                        {/* Tab Menu */}
                        <Tab
                            key="menusell"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>ยืนยันการดำเนินการ</span>
                                </div>
                            }
                        >
                            <div className="second-tab-layout mx-4">

                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    วันที่ผลิต
                                                </td>
                                                <td scope="col" className="px-12 py-3 ">
                                                    ใบสั่งผลิต
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    รายละเอียด
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    อนุมัติดำเนินการผลิต
                                                </td>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap dark:text-white">

                                                </td>
                                                <td className="px-6 py-1 text-left text-[#73664B]">

                                                </td>
                                                <td className="px-6 py-1 text-[#73664B]">

                                                </td>
                                                <td className="px-6 py-1 text-[#73664B]">
                                                    <Button size="sm" className="bg-green-500 text-white">รับทราบ</Button>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default approve