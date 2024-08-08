import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";
// import { , } from '@headlessui/react'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, } from '@headlessui/react';
import { Tabs, Tab, } from "@nextui-org/react";

import { XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChartPieIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CubeIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    QueueListIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon, MagnifyingGlassIcon

} from "@heroicons/react/24/outline";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function pos() {
    const router = useRouter();
    const { id } = router.query;
    const [Sale, setSale] = useState([]);
    const [typesellmenufix, setTypesellmenufix] = useState([]);
    const [typesellmenumix, setTypesellmenumix] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);

    interface Sale {
        sm_id: number,
        sm_name: String,
        sm_price: number,
    }
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data2 => {
                setTypesellmenufix(data2);
                setTypesellmenumix(data2);
                // console.log(data2);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id, setSale]);
    const [open, setOpen] = useState(true)

    return (
        <div className={kanit.className}>
            <div className="flex flex-col w-screen h-screen">
                {/* nav ส่วนบน */}
                <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border border-b-[#C5B182] border-b-1">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <UserCircleIcon className="h-6 w-6 text-[#73664B] justify-end" />
                            <span className="text-[#73664B] pl-2">นายฉันทกร อุดรพันธ์</span>
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-user"
                        >
                            <ul className="flex flex-col font-medium p-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0"
                                        aria-current="page"
                                    >
                                        ซอฟโดว์ แอดมิน
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="flex flex-grow bg-white w-full overflow-hidden">
                    {/* Left Content */}
                    <div className="flex-grow overflow-y-auto p-4">
                        {/* Content that can scroll independently */}
                        <div>
                            <p className='text-[#F2B461] font-medium m-1'>ทำรายการขาย</p>
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
                                            tabList: "gap-6 w-full relative rounded-none p-0 mx-2 border-b-1 border-b-[#E3D8BF]",
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
                                                    <span>สินค้า</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1">
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

                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                        {/* tab2 */}
                                        {/* Tab Menu */}
                                        <Tab
                                            key="promotion"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>โปรโมชัน</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1">
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

                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            {/* Repeat or add more content to make the left section scrollable */}
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>

                    {/* Right Order Panel */}
                    <div className="relative w-screen max-w-sm h-full overflow-hidden border-l-1">
                        <div className="pointer-events-auto h-full w-full transform transition duration-500 ease-in-out bg-white shadow-xl">
                            <div className="flex h-full flex-col overflow-y-scroll">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <p className="text-lg font-medium text-[#73664B]">คำสั่งซื้อ</p>
                                    </div>
                                    <div className="flex items-start justify-between mt-2">
                                        <p className="font-normal text-[#73664B]">วันที่</p>
                                    </div>
                                    <div className="flex items-start justify-between mt-2 ">
                                        <select
                                            id="countries"
                                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                            name="sell"
                                        >
                                            <option>ขายหน้าร้าน</option>
                                            <option>เดลิเวอรี่</option>
                                        </select>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {Sale.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                alt={product.imageAlt}
                                                                src={product.imageSrc}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={product.href}>{product.name}</a>
                                                                    </h3>
                                                                    <p className="ml-4">{product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">Qty {product.quantity}</p>

                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 pb-3 sm:px-6">
                                    <div className="flex items-start justify-between my-3">
                                        <select
                                            id="countries"
                                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                            name="sell"
                                        >
                                            <option>ขายหน้าร้าน</option>
                                            <option>เดลิเวอรี่</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>รวมสุทธิ</p>
                                        <p>$262.00</p>
                                    </div>
                                    <div className="mt-6">
                                        <Button
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-[#73664B] px-6 py-3 text-base font-medium text-white shadow-sm w-full"
                                        >
                                            ยืนยัน
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>


    )
}

export default pos