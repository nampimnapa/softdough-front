import React, { Fragment, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});



function detailstaff() {

    // Data JSON
    const categoriesData = 
     [
            {
                st_id: 1,
                st_name: 'น้องอายฟู',
                st_username: 'eyefu',
                st_password: '1234',
                st_tel: '099-9999999',
                st_type: '1',
                st_start: "2025-01-12"
            },

        ]

    const [categories, setCategories] = useState(categoriesData);

    const [workDate, setWorkDate] = useState({
        startDate: null,
        endDate: null
    });

    // setWorkDate({
    //     startDate: categories[0].st_start,
    //     endDate: categories[0].st_start
    // })

    // console.log(workDate);


    //leaveDate
    const [leaveDate, setLeaveDate] = useState({
        startDate: null,
        endDate: null
    });



    // const [workDate, setWorkDate] = useState(null);
    const [leaveDateselect, setLeaveDateselect] = useState(null);
    const handleWorkDateChange = (newValue) => {
        console.log("workDate:", newValue);
        setWorkDate(newValue);
    };


    const handleLeaveDateChange = (newValue) => {
        console.log("leaveDate:", newValue);
        setLeaveDate(newValue);
    };

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    // const handleDateChange = (field, newValue) => {
    //     console.log(`${field} Date:`, newValue);
    //     setDates((prevDates) => ({
    //         ...prevDates,
    //         [field]: newValue,
    //     }));
    // };
    // const [dates, setDates] = useState({
    //     workDate: null,
    //     leaveDate: null,
    // });
    // const handleDateChange = (type, newValue) => {
    //     setDates((prevDates) => ({
    //         ...prevDates,
    //         [type]: newValue,
    //     }));
    // };


    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/staff/detailstaff" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายละเอียดพนักงาน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขพนักงาน</p>

            {Object.keys(categories).map((staff, idx) => (
                <div className="mt-5 w-1/2 ">
                    {categories.map((staff) => (
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                ชื่อพนักงาน :</label>
                            <div className="mt-2 col-span-2 ">
                                <input
                                    key={staff.st_id}
                                    value={staff.st_name}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    placeholder='ชื่อพนักงาน'
                                    className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                                />

                            </div>
                        </div>
                    ))}
                    {categories.map((staff) => (
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                ชื่อผู้ใช้งาน :</label>
                            <div className="mt-2 col-span-2">
                                <input
                                    value={staff.st_username}

                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    placeholder='ชื่อผู้ใช้งาน'
                                    className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                        </div>
                    ))}
                    {categories.map((staff) => (
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                รหัสผ่าน :</label>
                            <div className="mt-2 col-span-2">
                                <input
                                    value={staff.st_password}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    placeholder='รหัสผ่าน'
                                    className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                        </div>
                    ))}
                    {categories.map((staff) => (
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                เบอร์โทร :</label>
                            <div className="mt-2 col-span-2">
                                <input
                                    value={staff.st_tel}

                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    placeholder='เบอร์โทร'
                                    className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                        </div>
                    ))}
                    {categories.map((staff) => (
                        // selected
                        // <div className="grid grid-cols-3 items-center ">
                        //     <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        //         แผนก :</label>
                        //     <div className="mt-2 col-span-2">
                        //         <select id="countries"
                        //             className="bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2">
                        //             <option>พนักงานฝ่ายขาย</option>
                        //             <option>พนักงานฝ่ายผลิต</option>
                        //         </select>
                        //     </div>
                        // </div>
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                แผนก :</label>
                            <div className="mt-2 col-span-2 flex">
                                <div className="form-control">
                                    <label className="label cursor-pointer ">
                                        <input type="radio" name="radio-10" className="radio checked:bg-[#C5B182] " checked={staff.st_type === "1"}/>
                                        <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
                                    </label>
                                </div>
                                <div className="form-control ml-4">
                                    <label className="label cursor-pointer">
                                        <input type="radio" name="radio-10" className="radio checked:bg-[#C5B182]" checked={staff.st_type === "2"}/>
                                        <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                    ))
                    }
                    {
                        categories.map((staff) => (
                            <div className="grid grid-cols-3 items-center mt-3 ">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                    วันที่เข้าทำงาน :</label>
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={staff.st_start}
                                    onChange={handleWorkDateChange}
                                />

                            </div>
                        ))
                    }
                    {categories.map((staff) => (
                        // selected
                        // <div className="grid grid-cols-3 items-center ">
                        //     <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        //         แผนก :</label>
                        //     <div className="mt-2 col-span-2">
                        //         <select id="countries"
                        //             className="bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2">
                        //             <option>พนักงานฝ่ายขาย</option>
                        //             <option>พนักงานฝ่ายผลิต</option>
                        //         </select>
                        //     </div>
                        // </div>
                        <div className="grid grid-cols-3 items-center ">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                                สถานะ :</label>
                            <div className="mt-2 col-span-2 flex">
                                <div className="form-control">
                                    <label className="label cursor-pointer ">
                                        <input type="radio" name="radio-1" className="radio checked:bg-[#C5B182] "
                                            onChange={() => setLeaveDateselect(null)} />
                                        <span className="label-text text-[#73664B] px-3 ">ทำงาน</span>
                                    </label>
                                </div>
                                <div className="form-control ml-4">
                                    <label className="label cursor-pointer">
                                        <input type="radio" name="radio-1" className="radio checked:bg-[#C5B182]"
                                            onChange={() => setLeaveDateselect(new Date())}
                                        />
                                        <span className="label-text text-[#73664B] px-3">ลาออก</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                    {leaveDateselect && (
                        <div className="grid grid-cols-3 items-center mt-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
                                วันที่ลาออก :</label>
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={leaveDate}
                                onChange={handleLeaveDateChange}
                            />
                        </div>
                    )}
                </div >
            ))}
            <div className="flex justify-between items-center mt-3" >
                <button>
                    
                    <Link href="/staff/detailstaff"
                    type="button"
                    className=" mx-auto  text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-6">
                    ยกเลิก</Link></button>
                <>
                    {isOpen && (
                        <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">

                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-[73664B]"
                                                >
                                                    ยืนยันการแก้ไขพนักงาน
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการแก้ไขพนักงานหรือไม่
                                                    </p>
                                                </div>
                                                {/*  choose */}
                                                <div className="flex justify-end">
                                                    <div className="inline-flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        >
                                                            ยกเลิก
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        ><Link href="/staff/allstaff">
                                                            ยืนยัน
                                                            </Link></button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>

                    )
                    }
                </>
                <button onClick={openModal} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
            </div>
        </div >
    );
}


export default detailstaff