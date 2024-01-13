import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function allstaff() {
    const categoriesData =
        [
            {
                id: 1,
                name: 'น้องอายฟู',
                username: 'eyefu',
                pw: '1234',
                tel: '099-9999999',
                depart: 'ฝ่ายผลิต'
                , status: 'ลาออก'
            },
            {
                id: 2,
                name: 'น้องน้าม',
                username: 'nmps',
                pw: '1234',
                tel: '099-9999999',
                depart: 'ฝ่ายขาย'
                , status: 'ทำงาน'
            },
            {
                id: 3,
                name: 'น้องน้าม',
                username: 'nmps',
                pw: '1234',
                tel: '099-9999999',
                depart: 'ฝ่ายขาย'
                , status: 'ทำงาน'
            },
        ]

    const [categories, setCategories] = useState(categoriesData);

    const departs: string[] = ["ทั้งหมด", ...Array.from(new Set(categories.map((staff) => staff.depart)))];



    return (
        <div className="h-screen  bg-white">
            <p className='text-[#F2B461] font-medium m-4'>พนักงานทั้งหมด</p>
            <form className="flex items-center transform scale-75">
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
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className="">
                <Tab.Group>
                    <Tab.List className="flex space-x-5  bg-white border-b border-b-1 border-b-[#E3D8BF] mx-5">
                        {departs.map((depart) => (
                            <Tab
                                key={depart}
                                className={({ selected }) =>
                                    classNames(
                                        'w-sreen py-2.5 text-sm focus:outline-none',
                                        selected
                                            ? 'bg-white  text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
                                            : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
                                    )
                                }
                            >
                                {depart}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {departs.map((depart, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    ' bg-white p-3',

                                )}
                            >
                                <div className="relative overflow-x-auto  ">
                                    <table className="w-full text-sm text-center text-gray-500 ">
                                        <thead >
                                            <tr className="text-white  font-normal  bg-[#908362] ">
                                                <td scope="col" className="px-6 py-3">
                                                    ลำดับ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    แผนก
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    ชื่อ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    สถานะ
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    รายละเอียด
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(categories) &&
                                                categories
                                                    .filter((staff) => depart === "ทั้งหมด" || staff.depart === depart)
                                                    .map((staff, idx) => (
                                                        <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                            <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
                                                                {staff.id}
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                {staff.depart}
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                {staff.name}
                                                            </td>
                                                            <td className={`px-6 py-1 
                                                    ${staff.status === 'ทำงาน' ? 'text-green-500'
                                                                    : staff.status === 'ลาออก' ? 'text-red-500'
                                                                        : ''}`}>
                                                                {staff.status}

                                                            </td>
                                                            <td className="px-6 py-4 flex items-center justify-center  ">
                                                                <button type="submit" >
                                                                    <Link href="/staff/detailstaff" className="w-full flex justify-center items-center">
                                                                        <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
                                                                    </Link>
                                                                </button>

                                                            </td>
                                                        </tr>

                                                    ))}
                                        </tbody>

                                    </table>
                                </div>

                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default allstaff
