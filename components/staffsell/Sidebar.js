"use client";
import Image from "next/image";
import React, { forwardRef, useState } from "react";
import Logo from "../../public/images/logo.svg";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
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
    BuildingLibraryIcon,
    WalletIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon, PlusIcon
} from "@heroicons/react/24/outline";
import { Icon } from '@iconify/react';




const Sidebar = ({ children, className }) => {
    const [isActive, setIsActive] = useState(null);
    const handleActive = (page) => {
        setIsActive(page);
        console.log(isActive);
    };
    return (
        // nav ส่วนบน

        <div className={`flex flex-row items-start overflow-x-hidden ${className} `}>
            {/* เริ่มต้น Sidebar */}
            <nav nav="true" className="flex flex-col gap-4 py-4 bg-white h-screen max-w-md min-w-[240px]  border border-r-[#C5B182] border-r-1  " >
                <SoftDoughLogo />
                {/* MenuLink คือ Component ที่สร้างขึ้นมาเองโค้ดอยู่ด้านล่าง */}
                <div className="flex flex-col">
                    <MenuLink
                        isActive={isActive === "สินค้า"}
                        href="/staffsell/pos"
                        title="สินค้า"
                        startIcon={<Icon icon="solar:donut-outline" className="h-5 w-5 inherit"
                        />}
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "โปรโมชัน"}
                        href="/staffsell/promotion/promotion"
                        title="โปรโมชัน"
                        startIcon={<MegaphoneIcon className="h-5 w-5 inherit" />}
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "รายการขายสินค้า"}
                        href="/staffsell/selllist/list"
                        title="รายการขายสินค้า"
                        startIcon={<QueueListIcon className="h-5 w-5 inherit" />}
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "สต๊อกสินค้า"}
                        href="/staffsell/stock/list"
                        title="สต๊อกสินค้า"
                        startIcon={<CubeIcon className="h-5 w-5 inherit " />}
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "เพิ่มเงินเข้าธนาคาร"}
                        href="/staffsell/bank/add"
                        title="รอบการขาย"
                        startIcon={<WalletIcon class="h-5 w-5 inherit" />}
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "เงินเข้าธนาคาร"}
                        href="/staffsell/bank/all"
                        title="เงินเข้าธนาคาร"
                        startIcon={<BuildingLibraryIcon class="h-5 w-5 inherit" />}
                        handleActive={handleActive} />

                    <MenuLink
                        isActive={isActive === "เพิ่มรายการจ่าย"}
                        href="/staffsell/expenses/add"
                        title="เพิ่มรายการจ่าย"
                        startIcon={<CreditCardIcon class="h-5 w-5 inherit" />
                    }
                        handleActive={handleActive} />
                    <MenuLink
                        isActive={isActive === "รายการจ่าย"}
                        href="/staffsell/expenses/list"
                        title="รายการจ่าย"
                        startIcon={<CurrencyDollarIcon className="h-5 w-5 inherit" />}
                        handleActive={handleActive} />
                    {/* ออกจากระบบ */}
                    <MenuLink
                        isActive={isActive === "ออกจากระบบ"}
                        href="/logout"
                        title="ออกจากระบบ"
                        startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5 inherit" />}
                        handleActive={handleActive}
                    />
                </div>
            </nav>

            <div className="flex flex-col w-screen">
                {/* nav ส่วนบน */}
                <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border border-b-[#C5B182] border-b-1">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">
                            <UserCircleIcon className="h-6 w-6 text-[#73664B] justify-end" />
                            <span className="text-[#73664B] pl-2">นายฉันทกร อุดรพันธ์</span>
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                            <ul className="flex flex-col font-medium p-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0 " aria-current="page">ซอฟโดว์ พนักงานฝ่ายขาย</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow bg-white h-full w-full">{children}</main>

            </div>
        </div>




    );
};

export default Sidebar;

const SoftDoughLogo = () => {
    return (
        <Link href="/" className="w-full flex justify-center items-center">
            <Image
                src={Logo}
                width={120}
                height="auto"
                className="object-cover"
                alt="logo"
                priority={true}
            />
        </Link>
    );
};

const MenuLink = ({
    title,
    startIcon,
    endIcon,
    href,
    isActive = false,
    handleActive,
}) => {
    const handleClick = () => {
        handleActive(title);
    };
    return (
        <Link
            href={href}
            onClick={handleClick}
            className={`flex flex-row flex-wrap justify-between items-center py-2 px-4 ${isActive
                ? "bg-[#73664B] hover:bg-[#5E523C]"
                : "bg-white hover:bg-gray-50"
                }`}
        >
            <div className="flex gap-2.5 ">
                {startIcon && (
                    <span className={isActive ? "text-white" : "text-[#73664B]"}>
                        {startIcon}
                    </span>
                )}
                <span
                    className={`text-sm  
          ${!startIcon && "ml-8 "} 
          ${isActive ? "text-white" : "text-[#73664B]"}`}
                >
                    {title}
                </span>
            </div>
            {endIcon && (
                <span className={isActive ? "text-white" : "text-[#73664B]"}>
                    {endIcon}
                </span>
            )}
        </Link>
    );
};

const MenuDropdown = ({ title, startIcon, children, endIcon }) => {
    return (
        <>
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button
                            className={`flex flex-row flex-wrap justify-between items-center py-2 px-4 ${open
                                ? "bg-[#73664B] hover:bg-[#5E523C]"
                                : "bg-white hover:bg-gray-50"
                                }`}
                        >
                            <div className="flex gap-2.5 ">
                                {startIcon && (
                                    <span className={open ? "text-white" : "text-[#73664B]"}>
                                        {startIcon}
                                    </span>
                                )}
                                <span
                                    className={`text-sm  ${open ? "text-white" : "text-[#73664B]"
                                        }
                  `}
                                >
                                    {title}
                                </span>
                            </div>
                            {endIcon && (
                                <span
                                    className={`${open && "rotate-180 transform"} 
                  ${open ? "text-white" : "text-[#73664B]"}`}
                                >
                                    {endIcon}
                                </span>
                            )}
                        </Disclosure.Button>
                        <Disclosure.Panel>{children}</Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
};