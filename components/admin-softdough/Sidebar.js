"use client";
import Image from "next/image";
import React, { forwardRef, useState, useEffect, useRef } from "react";
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
  UserCircleIcon,
  BellIcon, Bars3Icon, XMarkIcon

} from "@heroicons/react/24/outline";
import { Icon } from '@iconify/react';

// วัตถุดิบ
const ingredientDropdown = [
  { title: "วัตถุดิบเข้าร้าน", href: "/ingredients/income/all" },
  { title: "วัตถุดิบทั้งหมด", href: "/ingredients/all" },
  { title: "วัตถุดิบที่ใช้", href: "/ingredients/using/list" },
  { title: "รออนุมัติ", href: "/ingredients/approve" },
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
  { title: "รายการสั่งผลิต", href: "/manufacture/listorder" },
  { title: "รออนุมัติ", href: "/manufacture/approve" },
];
// รายการขาย
const sellDropdown = [
  { title: "ทำรายการขาย", href: "/pos" },
  { title: "รายการขายทั้งหมด", href: "/sale/all" },
  { title: "สต๊อกสินค้า", href: "/sale/stock" },
  { title: "สรุปยอดรายการขายรายวัน", href: "/ingredients/instore" },
  { title: "รออนุมัติ", href: "/ingredients/using" },
];
// โปรโมชัน
const promotionDropdown = [
  { title: "โปรโมชันส่วนลด", href: "/promotion/discountall" },
  { title: "โปรโมชันของแถม", href: "/promotion/freeall" }
];
// รายการจ่่าย
const payDropdown = [
  { title: "ประเภทรายการจ่าย", href: "/expenses/type" },
  { title: "เพิ่มรายการจ่าย", href: "/expenses/add" },
  { title: "รายการจ่ายทั้งหมด", href: "/expenses/all" },
  { title: "รออนุมัติ", href: "/expenses/approve" }
];
// พนักงาน
const staffDropdown = [
  { title: "เพิ่มพนักงาน", href: "/staff/addstaff" },
  { title: "พนักงานทั้งหมด", href: "/staff/allstaff" }
];
// ตั้งค่า
const settingDropdown = [
  { title: "รอบการขาย", href: "/setting/roundsell" },
  { title: "ที่อยู่", href: "/setting/address" },
  { title: "ประเภทการขาย", href: "/setting/ordertype" },
  { title: "หน่วย", href: "/setting/unit" }
];

import io from 'socket.io-client';


const Sidebar = ({ children, className }) => {

  const [isOpen, setIsOpen] = useState(false); // State สำหรับเปิด/ปิดเมนู

  const [isActive, setIsActive] = useState(null);

  const handleActive = (page) => {
    setIsActive(page);
    console.log(isActive);
    setIsOpen(false); // ปิดเมนูเมื่อมีการเลือก

  };



  //ใหม่
  const [hasNotifications, setHasNotifications] = useState(false);
  const [Notifications, setNotifications] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
      query: { userId: localStorage.getItem('userId') }, // ส่ง userId
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('registerUser', localStorage.getItem('userId')); // ลงทะเบียนผู้ใช้
    });

    setHasNotifications(false);
    socket.on('newNotification', (notification) => {
      console.log('Received notification:', notification);
      // setNotifications((prevNotifications) => [...prevNotifications, notification]);
      setHasNotifications(true);
    });

    fetchUnreadNotifications();


    return () => {
      socket.disconnect();
    };
  }, []);



  const [allNotifications, setAllNotifications] = useState([]);

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  // เรียกใช้งานฟังก์ชันเพื่อดึงการแจ้งเตือนทั้งหมดเมื่อมีการกดที่กระดิ่ง
  // const handleBellClick = async () => {
  //   setHasNotifications(false); // Reset notification flag

  //   await fetchAllNotifications(); // ดึงการแจ้งเตือนทั้งหมด

  //   await markNotificationsAsRead();
  //   setIsNotificationVisible(prev => !prev); // สลับการแสดงผลของกล่องการแจ้งเตือน

  // };

  const handleBellClick = () => {
    setHasNotifications(false);
    setIsNotificationVisible(prev => !prev);

    fetchAllNotifications();  // ดึงข้อมูลทันทีโดยไม่ต้องรอการ mark as read
    markNotificationsAsRead();  // อัปเดตการแจ้งเตือนให้อ่านแล้ว
  };
  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/unread`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // ถ้ามีการยืนยันตัวตน
        },
        credentials: 'include',
      });
      const data = await response.json();
      // ตรวจสอบว่ามีการแจ้งเตือนที่ยังไม่ได้อ่านหรือไม่
      const hasUnread = data.some(notification => notification.read_status === 'N');
      console.log(hasUnread, "hasUnread")
      setHasNotifications(hasUnread); // ถ้ามี read_status = 'N' แสดงจุดสีแดง

      // เก็บข้อมูลการแจ้งเตือนทั้งหมด
      // setAllNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  // ฟังก์ชันในการอัปเดตการแจ้งเตือน
  const markNotificationsAsRead = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/markAsRead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userId }), // ส่ง userId เพื่ออัปเดต
      });

      if (!response.ok) {
        throw new Error('Failed to mark notifications as read');
      }

      console.log('Notifications marked as read');
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/unread`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      console.log('Fetched notifications:', data);
      setAllNotifications(data); // สมมติว่าคุณมี state เพื่อเก็บ notifications
    } catch (error) {
      console.error('Error fetching all notifications:', error);
    }
  };
  // ฟังก์ชันดึงการแจ้งเตือนที่ยังไม่ได้อ่านจาก API
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/unread`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      console.log('Fetched notifications:', data);
      setLowStockAlerts(data);
      setNotificationCount(data.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  // ฟังก์ชันจัดการการคลิกที่ไอคอนกระดิ่ง
  // const handleBellClick = () => {
  //   setIsNotificationOpen(!isNotificationOpen); // เปิด/ปิดหน้าต่างการแจ้งเตือน
  //   if (!isNotificationOpen) {
  //     socket.emit('getNotificationCount'); // ดึงจำนวนการแจ้งเตือนเมื่อเปิดหน้าต่างการแจ้งเตือน
  //   }
  // };


  //respon
  // const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/logout`, {
        method: 'GET',
        credentials: 'include',  // เพื่อส่ง cookies หรือ session ไปพร้อมกับ request
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      const data = await response.json();
      console.log('Logout successful:', data);

      // เคลียร์ข้อมูลที่เก็บไว้ใน localStorage หรือ state ของแอป
      localStorage.removeItem('userId');

      // เปลี่ยนเส้นทางไปหน้า LoginPage
      window.location.href = '/LoginPage';
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };


  return (
    // nav ส่วนบน
    <div className={`flex flex-row items-start overflow-x-hidden ${className} `}>

      {/* เริ่มต้น Sidebar */}
      {/* <nav nav="true" className="flex flex-col gap-4 py-4 bg-white h-screen max-w-md min-w-[240px]  border border-r-[#C5B182] border-r-1  " > */}

      {/* แสดงเมนูเต็มจอเมื่อ isOpen เป็น true และหน้าจอเล็กกว่า md */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 lg:hidden">
          <button
            className="self-end mb-4"
            onClick={() => setIsOpen(false)} // ปิดเมนู
          >
            <XMarkIcon className="h-6 w-6 text-[#73664B]" />
          </button>
          {/* รายการเมนู */}
          <div className="flex flex-col gap-4">
            <MenuLink
              isActive={isActive === "ภาพรวม"}
              href="/dashboard/dashboard"
              title="ภาพรวม"
              startIcon={<ChartPieIcon className="h-5 w-5 inherit " />}
              handleActive={handleActive}
            />
            {/* เมนูอื่นๆ */}
            {/* วัตถุดิบ */}
            <MenuDropdown title="วัตถุดิบ" startIcon={<CubeIcon className="h-5 w-5 inherit" />} endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}>
              {ingredientDropdown.map((item, index) => (
                <MenuLink key={index} isActive={isActive === item.title} href={item.href} title={item.title} handleActive={handleActive} />
              ))}
            </MenuDropdown>
            {/* เพิ่มเมนูอื่นๆ ที่ต้องการได้ที่นี่ */}
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
              endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}
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
              // handleActive={handleActive}
              handleActive={handleLogout}  // ใช้ handleLogout ที่เราเพิ่มไว้
            />
            {/* <MenuLink
              isActive={isActive === "ออกจากระบบ"}
              title="ออกจากระบบ"
              startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5 inherit" />}
              handleActive={handleLogout}  // ใช้ handleLogout ที่เราเพิ่มไว้
            /> */}

          </div>
        </div>
      )}

      {/* สำหรับหน้าจอใหญ่กว่า lg */}

      {/* MenuLink คือ Component ที่สร้างขึ้นมาเองโค้ดอยู่ด้านล่าง */}
      <nav className="flex flex-col h-screen max-w-md min-w-[240px] border border-r-[#C5B182] bg-white py-4 hidden lg:flex flex-row gap-4">
        <SoftDoughLogo />
        <div className="flex flex-col">
          {/* ภาพรวม */}
          <MenuLink
            isActive={isActive === "ภาพรวม"}
            href="/dashboard/dashboard"
            title="ภาพรวม"
            startIcon={<ChartPieIcon className="h-5 w-5 inherit " />}
            handleActive={handleActive} />

          {/* วัตถุดิบ */}
          <MenuDropdown
            title="วัตถุดิบ"
            startIcon={<CubeIcon className="h-5 w-5 inherit " />}
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}>
            {/* <MenuDropdown title="วัตถุดิบ" startIcon={<CubeIcon className="h-5 w-5 inherit" />} endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}> */}

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
            endIcon={<ChevronDownIcon className="h-5 w-5 inherit" />}
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
            href="/Logout"
            title="ออกจากระบบ"
            startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5 inherit" />}
            // handleActive={handleActive}
            handleActive={handleLogout}  // ใช้ handleLogout ที่เราเพิ่มไว้
          />
          {/* <MenuLink
            isActive={isActive === "ออกจากระบบ"}
            title="ออกจากระบบ"
            startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5 inherit" />}
            handleActive={handleLogout}  // ใช้ handleLogout ที่เราเพิ่มไว้
          /> */}

        </div>
      </nav>

      <div className="flex flex-col w-screen bg-red">
        {/* nav ส่วนบน */}
        <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border border-b-[#C5B182] border-b-1 border-l-0 border-t-0 border-r-0">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:p-4 md:p-0 ">

            {/* web name */}
            <div className="items-center hidden justify-between w-full lg:flex lg:w-auto " id="navbar-user">
              <ul className="flex flex-col font-medium p-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0 " aria-current="page">
                    ซอฟโดว์ แอดมิน
                  </a>
                </li>

              </ul>
            </div>

            {/* แฮมเบอร์เกอร์ไอคอน */}
            <button
              className="lg:hidden items-center justify-center p-2  text-[#73664B]"
              onClick={() => setIsOpen(!isOpen)} // สลับสถานะของเมนู
            >
              <Bars3Icon className="h-6 w-6 text-[#73664B]" />
            </button>
            {/* แจ้งเตือนและโปรไฟล์ */}
            <div className="flex items-center space-x-3 md:space-x-0">
              {/* bell icon */}
              <div
                onClick={handleBellClick}
                className="lg:border-r lg:border-transparent lg:border-r-[#C5B182] lg:mr-2 lg:pr-2 "
                style={{ position: 'relative' }}
              >
                <BellIcon className="h-6 w-6 text-[#73664B]" />
                {hasNotifications && (
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                  }} />
                )}
                {/* แสดงกล่องการแจ้งเตือน */}
                {isNotificationVisible && (

                  <div className="fixed mt-2 right-1 z-10 w-96 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">

                    {allNotifications.length > 0 ? (
                      <>
                        <div className="flex justify-center items-center px-5 py-3 mx-1 mt-2 text-[#73664B]">
                          การแจ้งเตือน
                        </div>
                        {allNotifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.noti_id}
                            className={`flex flex-col items-start px-5 py-3 mx-1 text-[#73664B] hover:bg-[#FFFFDD] data-[focus]:bg-[#F5F1E8] data-[focus]:text-[#73664B]`}
                          >
                            <div className="flex items-center justify-between w-full">
                              {/* ส่วนข้อความการแจ้งเตือน */}
                              <div className="flex-grow">
                                {notification.ind_id != null ? (
                                  notification.qty < notification.qtyminimum ? (
                                    `ถึงจุดต่ำกว่าขั้นต่ำ ${notification.ind_name} ปริมาณ ${notification.qty}/${notification.qtyminimum}`
                                  ) : (
                                    `ถึงปริมาณขั้นต่ำ ${notification.ind_name} ปริมาณ ${notification.qty}/${notification.qtyminimum}`
                                  )
                                ) : notification.pdod_id != null ? (
                                  `${notification.podde_pdname} ผลิตในวันที่ ${notification.pcreated_at} กำลังจะหมดอายุในวันที่ ${notification.dateexp}`
                                ) : notification.indlde_id != null ? (
                                  `${notification.nameindlot} ล็อต ${notification.indl_id_name} กำลังจะหมดอายุในวันที่ ${notification.indlexp}`
                                ) : (
                                  "ไม่พบข้อมูลการแจ้งเตือน"
                                )}
                              </div>

                              {/* ตัวบ่งชี้สถานะ */}
                              {notification.read_status === 'N' && (
                                <div className="flex items-center">
                                  <div
                                    className="inline-block w-2 h-2 bg-[#FFB800] rounded-full ml-2 flex-shrink-0"
                                    style={{ transform: 'translateX(-2px)' }}
                                  ></div>
                                </div>
                              )}
                            </div>

                            {/* แสดงเวลาที่ผ่านมา */}
                            <span className={`mt-1 text-xs ${notification.read_status === 'N' ? 'text-[#FFB800] font-semibold' : 'text-gray-500'}`}>
                              {notification.timeAgo}
                            </span>
                          </div>
                        ))}
                        {allNotifications.length > 1 && (
                          <div
                            className="flex justify-center items-center px-4 py-2 mb-2 text-[#73664B]"
                            style={{
                              cursor: 'pointer',
                              color: '#73664B',
                              textDecoration: 'underline',
                              width: '100%',
                            }}
                            onClick={() => window.location.href = '/notification/noti'}
                          >
                            ดูทั้งหมด
                          </div>
                        )}
                      </>
                    ) : (
                      <div>ไม่มีการแจ้งเตือนใหม่</div>
                    )}




                  </div>
                )}
              </div>

              {/* profile */}
              <div className="hidden lg:flex items-center">
                <UserCircleIcon className="h-6 w-6 text-[#73664B] justify-end" />
                <span className="text-[#73664B] pl-2">นายฉันทกร อุดรพันธ์</span>
              </div>

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