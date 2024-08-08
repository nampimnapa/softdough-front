import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { Button, Input } from "@nextui-org/react";
import Datepicker from "react-tailwindcss-datepicker";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});



function add() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };


    const router = useRouter();
    const [message, setMessage] = useState('Loading');
    const [unitOptions, setUnitOptions] = useState([]);

    const [startValue, setStartValue] = useState({
        startDate: null,
        endDate: null
    });

    const [endValue, setendValue] = useState({
        startDate: null,
        endDate: null
    });

    const [formData, setFormData] = useState({
        dc_name: '',
        dc_detail: '',
        dc_diccountprice: 0,
        datestart: '',
        dateend: '',
    });

    // useEffect(() => {
    //     // Fetch unit data from the server and set the options
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setUnitOptions(data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching unit data:', error);
    //         });
    // }, []); // Run only once on component mount

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        // event.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/adddis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();

        if (responseData.message === 'success') {
            setMessage('Data added successfully');
            router.push('/promotion/discountall');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }

        // Reset the form after submission
        // (event.target as HTMLFormElement).reset();
    }
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setStartValue(newValue);
        // setendValue(newValue);

        // Assuming newValue is in the format { startDate: "2024-03-15", endDate: "2024-03-16" }
        setFormData((prevForm) => ({
            ...prevForm,
            datestart: newValue.startDate,
            //   dateend: newValue.startDate
        }));

    };
    const handleValueChange1 = (newValue) => {
        console.log("newValue:", newValue);
        setendValue(newValue);

        // Assuming newValue is in the format { startDate: "2024-03-15", endDate: "2024-03-16" }
        setFormData((prevForm) => ({
            ...prevForm,
            dateend: newValue.startDate
        }));

    };

    return (
        <div className='h-screen' >
            <button className='my-3 mx-5 '>
                <Link href="/promotion/discountall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    โปรโมชันส่วนลด
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182]  border-b border-[#C5B182] py-2'>เพิ่มโปรโมชั่นส่วนลด</p>
            <div className="mt-5 w-1/2 ">
                <form >
                    <div className="grid grid-cols-3 items-center ">
                        <label className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5 items-center">
                            วันที่เริ่มโปรโมชัน :</label>
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
                        <label className=" text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5 items-center">
                            วันที่เริ่มโปรโมชัน :</label>
                        <div className="col-span-2" >
                            <Datepicker
                                // className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
                                useRange={false}
                                asSingle={true}
                                value={endValue}
                                onChange={handleValueChange1}
                            // name="st_start"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center ">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                            ชื่อโปรโมชัน :</label>
                        <div className="mt-2 col-span-2">
                            <input
                                placeholder="ชื่อโปรโมชัน"
                                value={formData.dc_name}
                                onChange={handleInputChange}
                                type="text"
                                name="dc_name"
                                autoComplete="family-name"
                                // placeholder='ชื่อผู้ใช้งาน'
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-center ">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                            ส่วนลด :</label>
                        <div className="mt-2 col-span-2">
                            <input
                                placeholder="จำนวนเงิน"
                                min="0"
                                type="number"
                                name="dc_diccountprice"
                                value={formData.dc_diccountprice}
                                onChange={handleInputChange}
                                autoComplete="family-name"
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]    sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 items-center ">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                            รายละเอียด :</label>
                        <div className="mt-2 col-span-2">
                            <input
                                placeholder="รายละเอียด"
                                value={formData.dc_detail}
                                onChange={handleInputChange}
                                type="text"
                                name="dc_detail"
                                autoComplete="family-name"
                                // placeholder='ชื่อผู้ใช้งาน'
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                    </div>


                </form>

                <div className="flex justify-start">
                    <div className="w-1/2  mt-10  flex justify-start " >
                        <button>
                            <Link href="/ingredients/all"
                                type="button"
                                className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                                ยกเลิก</Link></button>
                        <>
                            {isOpen && (
                                <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModal}  >
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
                                                            ยืนยันการเพิ่มส่วนลด
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-[#73664B]">
                                                                คุณต้องการเพิ่มส่่วนลด
                                                            </p>
                                                        </div>
                                                        {/*  choose */}
                                                        <div className="flex justify-end mt-2">
                                                            <div className="inline-flex justify-end">
                                                                <Button
                                                                    type="button"
                                                                    className="text-[#73664B] bg-white inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModal}
                                                                >
                                                                    ยกเลิก
                                                                </Button>

                                                                <Button
                                                                    type="button"
                                                                    className="bg-white text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] hover:text-[#73664B]  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={handleSubmit}
                                                                ><Link href="/ingredients/all">
                                                                        ยืนยัน
                                                                    </Link>
                                                                </Button>
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
                        <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
                    </div >
                </div >
            </div>
        </div >
    )
}

export default add