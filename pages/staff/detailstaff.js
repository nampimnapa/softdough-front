import React, { Fragment, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Kanit } from "next/font/google";

function detailstaff() {
    const staff =
        [
            {
                id: 1,
                name: 'น้องอายฟู',
                username: 'eyefu',
                pw: '1234',
                tel: '099-9999999',
                depart: 'ฝ่ายผลิต',
                startdate: '10/10/2555',
                status: 'ลาออก',
                enddate: '10/10/2556'
            },

        ]

    return (
        <div className="h-screen">
            <button className='my-3 mx-5 '>
                <Link href="/staff/allstaff" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    พนักงานทั้งหมด
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182]  border-b border-[#C5B182] py-2'>รายละเอียดพนักงาน</p>
            {staff.map((staff) => (<div>
                <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อพนักงาน : {staff.name}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อผู้ใช้งาน : {staff.username}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">รหัสผ่าน : {staff.pw}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">เบอร์โทร : {staff.tel}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">แผนก : {staff.depart}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">วันที่เข้าทำงาน : {staff.startdate}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">สถานะ : {staff.status}</p>
                {staff.status === 'ลาออก' && (
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ลาออก: {staff.enddate}</p>
                )}

            </div>
            ))}

            <div className="flex  mt-5 " >
                <button>
                    <Link href="/staff/editstaff"
                        type="button"
                        className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        แก้ไขพนักงาน</Link></button>



                <button type="button" className="ml-2 mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    <Link href="/staff/allstaff">
                        เสร็จสิ้น</Link></button>
            </div></div>
    )
}

export default detailstaff