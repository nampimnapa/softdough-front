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
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { Icon } from '@iconify/react';


// วัตถุดิบ
const ingredientDropdown = [
  { title: "วัตถุดิบเข้าร้าน", href: "/ingredients/income/all" },
  { title: "วัตถุดิบทั้งหมด", href: "/ingredients/all" },
  { title: "วัตถุดิบที่ใช้", href: "/ingredients/using" },
  { title: "รออนุมัติ", href: "/ingredients/pending" },
];
// สินค้า
const productDropdown = [
  { title: "ประเภทสินค้า/สำหรับขาย", href: "/product/all" },
  { title: "สูตรอาหาร", href: "/product/recipeall" },
  { title: "เมนูสำหรับขาย", href: "/product/sell_all" },
];
// การผลิต
const manufactureDropdown = [
  { title: "เพิ่มใบสั่งผลิต", href: "/manufacture/add" },
  { title: "รายการสั่งผลิต", href: "/manufacture/list" },
  { title: "รออนุมัติ", href: "/manufacture/pending" },
];
// รายการขาย
const sellDropdown = [
  { title: "ทำรายการขาย", href: "/ingredients/instore" },
  { title: "รายการขายทั้งหมด", href: "/ingredients/all" },
  { title: "สต๊อกสินค้า", href: "/ingredients/using" },
  { title: "สรุปยอดรายการขายรายวัน", href: "/ingredients/instore" },
  { title: "รออนุมัติ", href: "/ingredients/using" },
];
// โปรโมชัน
const promotionDropdown = [
  { title: "โปรโมชันส่วนลด", href: "/ingredients/instore" },
  { title: "โปรโมชันของแถม", href: "/ingredients/all" }
];
// รายการจ่่าย
const payDropdown = [
  { title: "ประเภทรายการจ่าย", href: "/ingredients/instore" },
  { title: "เพิ่มรายการจ่าย", href: "/ingredients/all" },
  { title: "รายการจ่ายทั้งหมด", href: "/ingredients/instore" },
  { title: "รออนุมัติ", href: "/ingredients/all" }
];
// พนักงาน
const staffDropdown = [
  { title: "เพิ่มพนักงาน", href: "/staff/addstaff" },
  { title: "พนักงานทั้งหมด", href: "/staff/allstaff" }
];
// ตั้งค่า
const settingDropdown = [
  { title: "รอบการขาย", href: "/ingredients/instore" },
  { title: "ที่อยู่", href: "/ingredients/all" },
  { title: "ประเภทการขาย", href: "/ingredients/instore" },
  { title: "บรรจุภัณฑ์", href: "/ingredients/all" }
];

const Sidebar = ({ children, className }) => {
  const [isActive, setIsActive] = useState(null);
  const handleActive = (page) => {
    setIsActive(page);
    console.log(isActive);
  };
  return (
    // nav ส่วนบน

    <div className={`flex flex-row items-start ${className} `}>
      {/* เริ่มต้น Sidebar */}
      <nav nav="true" className="flex flex-col gap-4 py-4 bg-white h-screen max-w-md min-w-[240px]  border border-r-[#C5B182] border-r-1  " >
        <SoftDoughLogo />
        {/* MenuLink คือ Component ที่สร้างขึ้นมาเองโค้ดอยู่ด้านล่าง */}
        <div className="flex flex-col">

          {/* ภาพรวม */}
          <MenuLink
            isActive={isActive === "ภาพรวม"}
            href="/dashboard"
            title="ภาพรวม"
            startIcon={<ChartPieIcon className="h-5 w-5 inherit " />}
            handleActive={handleActive} />

          {/* วัตถุดิบ */}
          <MenuDropdown
            title="วัตถุดิบ"
            startIcon={<CubeIcon className="h-5 w-5 inherit " />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}>
            {ingredientDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>

          {/* สินค้า */}
          <MenuDropdown
            title="สินค้า"
            startIcon={<Icon icon="solar:donut-outline" className="h-5 w-5 inherit"
            />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />
          }
          >
            {productDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>

          {/* การผลิต */}
          <MenuDropdown
            title="การผลิต"
            startIcon={<Icon icon="tabler:tools-kitchen-2"
              className="h-5 w-5 inherit" />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit"/>}
          >
            {manufactureDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>

          {/* รายการขาย */}
          <MenuDropdown
            title="รายการขาย"
            startIcon={<QueueListIcon className="h-5 w-5 inherit" />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}
          >
            {sellDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>
          {/* โปรโมชัน */}
          <MenuDropdown
            title="โปรโมชัน"
            startIcon={<MegaphoneIcon className="h-5 w-5 inherit" />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}>
            {promotionDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>
          {/* รายการจ่าย */}
          <MenuDropdown
            title="รายการจ่าย"
            startIcon={<CurrencyDollarIcon className="h-5 w-5 inherit" />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}
          >
            {payDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>
          {/* พนักงาน */}
          <MenuDropdown
            title="พนักงาน"
            startIcon={<UserGroupIcon className="h- w-5 inherit" />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}>
            {staffDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive} />
              </React.Fragment>
            ))}
          </MenuDropdown>
          {/* ตั้งค่า */}
          <MenuDropdown
            title="ตั้งค่า"
            startIcon={<Cog6ToothIcon className="h-5 w-5 inherit" />
            }
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}
          >
            {settingDropdown.map((item, index) => (
              <React.Fragment key={index}>
                <MenuLink
                  isActive={isActive === item.title}
                  href={item.href}
                  title={item.title}
                  handleActive={handleActive}
                />
              </React.Fragment>
            ))}
          </MenuDropdown>
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

      <div className="flex flex-col w-screen ">
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
                  <a href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0 " aria-current="page">ซอฟโดว์ แอดมิน</a>
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
