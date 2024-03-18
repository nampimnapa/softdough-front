import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function allstaff() {
    // const categoriesData =
    //     [
    //         {
    //             id: 1,
    //             name: 'น้องอายฟู',
    //             username: 'eyefu',
    //             pw: '1234',
    //             tel: '099-9999999',
    //             depart: 'ฝ่ายผลิต'
    //             , status: 'ลาออก'
    //         },
    //         {
    //             id: 2,
    //             name: 'น้องน้าม',
    //             username: 'nmps',
    //             pw: '1234',
    //             tel: '099-9999999',
    //             depart: 'ฝ่ายขาย'
    //             , status: 'ทำงาน'
    //         },
    //         {
    //             id: 3,
    //             name: 'น้องน้าม',
    //             username: 'nmps',
    //             pw: '1234',
    //             tel: '099-9999999',
    //             depart: 'ฝ่ายขาย'
    //             , status: 'ทำงาน'
    //         },
    //     ]

    // const [categories, setCategories] = useState(categoriesData);

    // const departs: string[] = ["ทั้งหมด", ...Array.from(new Set(categories.map((staff) => staff.depart)))];

    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/staff/read')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStaff(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);
    const departs =
        [{ id: 0, name: "ทั้งหมด" },
        { id: 1, name: "ฝ่ายผลิต" },
        { id: 2, name: "ขายหน้าร้าน" },

        ];
    // const departs = ["ทั้งหมด", ...new Set(categories.map((staff) => staff.depart))];
    // const departs: string[] = ["ทั้งหมด", ...Array.from(new Set(staff.map((staffs) => {
    //     switch (staffs.st_type) {
    //         case '1':
    //             return "ฝ่ายผลิต";
    //         case '2':
    //             return "ฝ่ายขาย";
    //         default:
    //             return ""; // You can handle other cases if needed
    //     }
    // })))];

    return (
        <div className="h-screen bg-white">
            <p className='text-[#F2B461] font-medium m-4'>พนักงานทั้งหมด</p>
            <form className="flex items-center transform scale-75">
                <div className="relative w-1/2 ">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                        <MagnifyingGlassIcon className="h-6 w-6 text-[#C5B182]" />
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                        placeholder="ค้นหา"
                        required
                    />
                </div>
                <button type="submit" className="p-2 ms-2 text-sm rounded-full text-white bg-[#C5B182] border hover:bg-[#5E523C]">
                    ค้นหา
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div>
                <Tab.Group>
                    <Tab.List className="flex space-x-5 bg-white border-b border-b-1 border-b-[#E3D8BF] mx-5">
                        {departs.map((depart) => (
                            <Tab
                                key={depart.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-sreen py-2.5 text-sm focus:outline-none',
                                        selected
                                            ? 'bg-white text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
                                            : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
                                    )
                                }
                            >
                                {depart.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <div className="relative overflow-x-auto mx-4">
                            <table className="w-full text-sm text-center text-gray-500 ">
                                <thead>
                                    <tr className="text-white font-normal bg-[#908362]">
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
                                    {Array.isArray(staff) &&
                                        staff
                                            .filter((staffItem) => staffItem.depart === "ทั้งหมด" || (staffItem.depart === "ฝ่ายผลิต" && staffItem.st_type === '1') || (staffItem.depart === "ฝ่ายขาย" && staffItem.st_type === '2'))
                                            .map((staffItem, idx) => (
                                                <tr key={idx} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white">
                                                        {staffItem.id}
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        {staffItem.depart}
                                                    </td>
                                                    <td className="px-6 py-1">
                                                        {staffItem.name}
                                                    </td>
                                                    <td className={`px-6 py-1 
                                                        ${staffItem.status === 'ทำงาน' ? 'text-green-500' : staffItem.status === 'ลาออก' ? 'text-red-500' : ''}`}>
                                                        {staffItem.status}
                                                    </td>
                                                    <td className="px-6 py-4 flex items-center justify-center">
                                                        <button type="submit">
                                                            <Link href="/staff/detailstaff" className="w-full flex justify-center items-center">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182]" />
                                                            </Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}


export default allstaff
