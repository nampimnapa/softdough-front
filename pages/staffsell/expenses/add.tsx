import React, { ChangeEvent, Fragment, useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import router from "next/router";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { Checkbox } from "@nextui-org/react";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Add() {
    const [message, setMessage] = useState('Loading');

    const [startValue, setStartValue] = useState({
        startDate: null,
        endDate: null
    });

    const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox status
        setValueForm((prevForm) => ({
            ...prevForm,
            ep_status: !isChecked ? 2 : 1, // Toggle ep_status
        }));
    };

    const [valueForm, setValueForm] = useState({
        ep_date: "",
        ept_id: "",
        ep_note: "",
        ep_sum: ""
    });

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
            "ep_date": newValue.startDate,
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
            ep_date: "",
            ept_id: "",
            ep_note: "",
            ep_sum: ""
            //เทสส่งไปก่อน
        });
        // setIsChecked(false); // Reset checkbox status
    };

    // const saveData = async () => {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/add`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(valueForm),
    //     });
    //     const responseData = await response.json();
    //     console.log(responseData);
    //     if (responseData.message === 'success') {
    //         console.log("success");
    //         setIsOpen(false);
    //     }
    // }

    //เคยได้
    // const saveData = async () => {
    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/add`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include', // ตรวจสอบว่าใช้ 'include' หรือไม่
    //             body: JSON.stringify(valueForm),

    //         });

    //         if (!response.ok) {
    //             throw new Error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    //         }

    //         const responseData = await response.json();
    //         console.log(responseData);
    //         console.log('ValueForm:', valueForm);

    //         if (responseData.message === 'success') {
    //             console.log('บันทึกข้อมูลสำเร็จ');
    //             setIsOpen(false);
    //         }
    //     } catch (error) {
    //         console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error.message);
    //     }
    // };

    const saveData = async () => {
        try {
            console.log("Sending data:", valueForm); // ตรวจสอบข้อมูลที่ส่ง

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(valueForm),
            });

            console.log("Response status:", response.status); // ตรวจสอบสถานะของคำตอบ
            handleCancelClick()
            if (!response.ok) {
                const errorData = await response.text(); // รับข้อมูลข้อผิดพลาดจากคำตอบ
                throw new Error(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${errorData}`);
            }

            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (responseData.message === 'success') {
                console.log('บันทึกข้อมูลสำเร็จ');
                setIsOpen(false);
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล2:', error.message);
        }
    };



    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setStartValue(newValue);

        // Assuming newValue is in the format { startDate: "2024-03-15", endDate: "2024-03-16" }
        setValueForm((prevForm) => ({
            ...prevForm,
            ep_date: newValue.startDate,
        }));
    };



    return (
        <div className='h-screen'>
            <p className='text-[#F2B461] font-medium m-4' >เพิ่มรายการจ่าย</p>
            <div className="flex justify-center">
                <div className="mt-5 w-1/2 ">
                    <div className="grid grid-cols-4 items-center ">
                        <label className="text-sm font-medium leading-6 text-[#73664B] text-left flex items-center ">
                            วันที่ :</label>
                        <div className="col-span-2" >
                            <Datepicker
                                // className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
                                useRange={false}
                                asSingle={true}
                                value={startValue}
                                onChange={handleValueChange}
                            // name="st_start"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center justify-center">
                        <label className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left mr-5">
                            ประเภทรายการจ่าย:
                        </label>
                        <div className="mt-2 col-span-3">
                            <select
                                id="ept_id"
                                name="ept_id"
                                value={valueForm.ept_id}
                                onChange={handleInputChange}
                                className="bg-[#E3D9C0] w-full block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                defaultValue=""
                            >
                                <option value="" disabled hidden>เลือกประเภทการจ่าย</option>
                                {Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind) => (
                                    <option key={ind.ept_id} value={ind.ept_id}>
                                        {ind.ept_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            รายละเอียด :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="text"
                                name="ep_note"
                                id="note"
                                placeholder='รายละเอียด'
                                value={valueForm.ep_note}
                                onChange={handleInputChange}
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center ">
                        <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                            จำนวนเงิน :</label>
                        <div className="mt-2 col-span-3">
                            <input
                                type="tel"
                                name="ep_sum"
                                id="sum"
                                placeholder='จำนวนเงิน'
                                value={valueForm.ep_sum}
                                onChange={handleInputChange}
                                className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                   
                </div>
            </div>


            <div className="flex justify-center">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <button
                        onClick={handleCancelClick}
                        type="button"
                        className="text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">
                        ยกเลิก
                    </button>
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
                                                        ยืนยันการเพิ่มรายการจ่าย
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเพิ่มรายการจ่ายหรือไม่
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={closeModal}
                                                        >
                                                            ยกเลิก
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={saveData}
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}
                    </>
                    <button onClick={openModal} type="button" className="ml-3 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">บันทึก</button>
                </div>
            </div>
        </div>
    )
}

export default Add;