import React, { ChangeEvent, Fragment, useState, useEffect } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
// import Datepicker from "../components/admin-softdough/DatePicker";
import Datepicker from "react-tailwindcss-datepicker";
import router from "next/router";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Add() {
    const [startValue, setStartValue] = useState({
        startDate: null,
        endDate: null
    });

    const [valueForm, setValueForm] = useState(
        {
            st_name: "",
            st_username: "",
            st_password: "",
            ept_id: "",
            st_tel: "",
            ep_note: "",
            ep_sum: 0,
            ep_status: 1,
            st_type: "",
            st_start: "",
            st_status: 1
        }
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValueForm((prevIngredient) => ({
            ...prevIngredient,
            [name]: value,
        }));
    };

    const handleValueChangeDate = (newValue: { startDate: any; endDate: any; }) => {
        console.log("newValue:", newValue.startDate);
        setValueForm((prevIngredient) => ({
            ...prevIngredient,
            "st_start": newValue.startDate,
        }));
    }

    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    interface Ingredients {
        ept_id: string;
        ept_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readtype`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []); // Run only once on component mount

    // modal
    // const [isOpen, setIsOpen] = useState(true); จะขึ้นอัตโนมัติ
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };


    // ยกเลิก
    const handleCancelClick = () => {
        setValueForm({
            st_name: "",
            st_username: "",
            st_password: "",
            ept_id: "",
            st_tel: "",
            ep_note: "",
            ep_sum: 0,
            ep_status: 1,
            st_type: "",
            st_start: "",
            st_status: 1
        })

        setStartValue({
            startDate: null,
            endDate: null
        })
    };

    const saveData = async () => {
        const response = await fetch(`http://localhost:8080/staff/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueForm),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.message === 'success') {
            console.log("success")
            setIsOpen(false);
        }
    }



    return (
        <div className='h-screen'>
            <p className='text-[#F2B461] font-medium m-4' >เพิ่มรายการจ่าย</p>
            <div className="flex justify-center">
            {/* <div className="flex m-4"> */}

                <div className="mt-5 w-1/2 ">
                    {/* <form className="grid grid-cols-4 items-center ">
                        
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left">
                            ชื่อพนักงาน :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="text"
                                name="st_name"
                                id="name"
                                value={valueForm.st_name}
                                onChange={handleInputChange}
                                placeholder='ชื่อพนักงาน'
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>
                    </form> */}
                    <div className="grid grid-cols-4 items-center mt-3 ">
                        <label className="mr- block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left">
                            วันที่ :</label>
                        <Datepicker
                            // className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
                            useRange={false}
                            asSingle={true}
                            value={startValue}
                            onChange={handleValueChangeDate}
                        // name="st_start"
                        />
                    </div>
                    {/* <div className="flex items-center justify-center"> */}
                    <div className="grid grid-cols-4 items-center justify-center">
                        <label className="block text-sm font-medium leading-6 text-[#73664B] mt-3 text-left">
                            ประเภทรายการจ่าย:
                        </label>
                        <select
                            id="ingredients"
                            className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>เลือกประเภทการจ่าย</option>
                            {Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind) => (
                                <option key={ind.ept_id} value={ind.ept_name}>
                                    {ind.ept_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            รายละเอียด :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="text"
                                name="st_username"
                                id="username"
                                placeholder='รายละเอียด'
                                value={valueForm.st_username}
                                onChange={handleInputChange}
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>

                    </div>
                    {/* <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            รหัสผ่าน :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="password"
                                name="st_password"
                                id="pw"
                                placeholder='รหัสผ่าน'
                                value={valueForm.st_password}
                                onChange={handleInputChange}
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}
                    <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            จำนวนเงิน :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="tel"
                                name="st_tel"
                                id="tel"
                                placeholder='จำนวนเงิน'
                                value={valueForm.st_tel}
                                onChange={handleInputChange}
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            แผนก :</label>
                        <div className="mt-2 col-span-3 flex">
                            <div className="form-control">
                                <label className="label cursor-pointer ">
                                    <input type="radio" name="st_type"
                                        value="1"
                                        onChange={handleInputChange}
                                        className="radio checked:bg-[#C5B182] " />
                                    <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
                                </label>
                            </div>
                            <div className="form-control ml-4">
                                <label className="label cursor-pointer">
                                    <input type="radio" name="st_type"
                                        value="2"
                                        onChange={handleInputChange}
                                        className="radio checked:bg-[#C5B182]" />
                                    <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
                                </label>
                            </div>

                        </div>
                    </div> */}

                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <button
                        onClick={handleCancelClick}
                        type="button"
                        className=" text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2 ">
                        ยกเลิก</button>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment}>
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
                                                        ยืนยันการเพิ่มพนักงาน
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเพิ่มพนักงานหรือไม่
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
                                                                onClick={saveData}
                                                            >
                                                                ยืนยัน
                                                            </button>
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
                    <button onClick={openModal} type="button" className="ml-3 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5  mb-2 ">บันทึก</button>
                </div>
            </div >
        </div >

    )
}


export default Add