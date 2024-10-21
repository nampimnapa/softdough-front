import React, { ChangeEvent, Fragment, useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import router from "next/router";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { Checkbox, Button } from "@nextui-org/react";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Add() {
    const [message, setMessage] = useState('Loading');
    const [isSalesRoundOpen, setIsSalesRoundOpen] = useState(false);

    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    interface Ingredients {
        change: number;
        date: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/todaychange`)
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

    // modalเปิดรอบการขาย
    const [isOpensell, setIsOpensell] = useState(false);

    const closeModalsell = () => {
        setIsOpensell(false);
    };

    const openModalsell = () => {
        setIsOpensell(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // ดึงวันที่ปัจจุบัน
        const today = new Date();
        const formattedDate = today.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    const handleOpenSalesRound = () => {
        setIsSalesRoundOpen(true);
    };
    interface ChangeData {
        change: number;
        date: string;

    }
    const [changeData, setChangeData] = useState<ChangeData | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/todaychange`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setChangeData(data);
            })
            .catch(error => {
                console.error('Error fetching change data:', error);
            });
    }, []); // Run only once on component mount
    const [closeData, setCloseData] = useState({
        deposit: '',
        scrap: '',
        note: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCloseData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const saveData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/close`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // ใส่ option นี้เพื่อส่ง cookies ไปด้วย
                body: JSON.stringify(closeData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Network response was not ok: ${errorData}`);
            }

            const data = await response.json();
            if (data.message === 'success') {
                console.log('บันทึกข้อมูลสำเร็จ');
                setIsSalesRoundOpen(false);
                setCloseData({ deposit: '', scrap: '', note: '' });
                closeModal();
            }
        } catch (error) {
            console.error('Error closing sales round:', error);
            // แสดงข้อความผิดพลาดให้ผู้ใช้ทราบ
        }
    };
    return (
        <div className='h-screen'>
            <p className='text-[#F2B461] font-medium m-4'>รอบการขาย</p>
            {!isSalesRoundOpen && (
                <div className="ml-4 flex items-center">
                    <Button
                        onClick={handleOpenSalesRound}
                        className=" text-sm rounded-full text-white bg-[#F2B461] border hover:bg-[#5E523C] flex">
                        เปิดรอบการขาย
                    </Button>
                </div>
            )}
            {isSalesRoundOpen && (
                <div>
                    <div className="flex justify-center">
                        <div className="mt-5 w-1/2 ">
                            <div className="grid grid-cols-4 items-center ">
                                <label className="text-sm font-medium leading-6 text-[#73664B] text-left flex items-center ">
                                    วันที่ :</label>
                                <div className="col-span-2" >
                                    <span className="text-sm text-[#73664B]">{currentDate}</span>

                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center mt-4">
                                <label className="text-sm font-medium leading-6 text-[#73664B] text-left flex items-center ">
                                    เงินทอนตั้งต้น :</label>
                                <div className="col-span-2" >
                                    <span className="text-sm text-[#73664B]">

                                        {changeData ? `${changeData.change.toLocaleString()} บาท` : 'กำลังโหลด...'}
                                    </span>

                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center ">
                                <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                                    ยอดเงินเข้าธนาคาร :</label>
                                <div className="mt-2 col-span-3">
                                    <input
                                        type="number"
                                        name="deposit"
                                        id="deposit"
                                        placeholder='กรอกจำนวนเงิน'
                                        value={closeData.deposit}
                                        onChange={handleInputChange}
                                        className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center ">
                                <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                                    เงินสดที่ไม่เข้าธนาคาร :</label>
                                <div className="mt-2 col-span-3">
                                    <input
                                        type="number"
                                        name="scrap"
                                        id="scrap"
                                        placeholder='กรอกจำนวนเงิน'
                                        onChange={handleInputChange}
                                        value={closeData.scrap}

                                        className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center ">
                                <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                                    หมายเหตุ :</label>
                                <div className="mt-2 col-span-3">
                                    <input
                                        type="tel"
                                        name="note"
                                        id="note"
                                        placeholder=''
                                        onChange={handleInputChange}
                                        value={closeData.note}

                                        className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-1/2  mt-10  flex justify-start ml-5" >
                            {/* <button
                                // onClick={handleCancelClick}
                                type="button"
                                className="text-white bg-[#C5B182] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">
                                ยกเลิก
                            </button> */}
                            <button onClick={openModal} type="button" className="ml-3 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mb-2">บันทึก</button>

                        </div>
                    </div>
                </div>
            )}


            <div className="flex justify-center">

                <>
                    {isOpen && (
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog as="div" className={`relative z-10 ${kanit.className}`} onClose={closeModal}>
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
                                                    ยืนยันการปิดรอบการขาย
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการปิดรอบการขายหรือไม่
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

                {isOpensell && (
                    <Transition appear show={isOpensell} as={Fragment}>
                        <Dialog as="div" className={`relative z-10 ${kanit.className}`} onClose={closeModalsell}>
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
                                                กรอกเงินทอนตั้งต้น
                                            </Dialog.Title>
                                            <div className="mt-2 mb-2">
                                                <p className="text-sm text-[#73664B]">
                                                    กรุณาตรวจสอบเงินทอนตั้งต้น
                                                </p>
                                            </div>
                                            {/* <input
                                                    type="number"
                                                    name="ep_note"
                                                    id="note"
                                                    placeholder='กรอกจำนวนเงิน'
                                                    // value={valueForm.ep_note}
                                                    // onChange={handleInputChange}
                                                    className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                                /> */}
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModalsell}
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


            </div>
        </div>
    )
}

export default Add;