import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function editmenuforsell() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const data = [
        { name: 'กล่อง XS', unit: 2, count: 30 },
    ];
    // เก็บจำนวน
    const [formData, setFormData] = useState({
        name: data[0].name,
        unit: data[0].unit.toString(), // แปลงเป็น string เนื่องจาก value ของ select เป็น string
        count: data[0].count
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    const handleIncrement = () => {
        setFormData({
            ...formData,
            count: formData.count + 1
        });
    };

    const handleDecrement = () => {
        if (formData.count > 1) {
            setFormData({
                ...formData,
                count: formData.count - 1
            });
        }
    };
    const handleConfirm = () => {
        console.log("Name:", formData.name, "Unit:", formData.unit, "Count:", formData.count);
        closeModal();
    };
    // cancel
    const handleCancel = () => {
        setFormData({
            name: data[0].name,
            unit: data[0].unit.toString(),
            count: data[0].count
        });
        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };
    const router = useRouter();
    const { id } = router.query;
    const [SaleMenu, setSaleMenu] = useState([]);
    interface SaleMenu {
        smt_id: string;
        smt_name: string;
        un_id: string;
        qty_per_unit: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        fetch(`http://localhost:8080/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => {
                setSaleMenu(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);

    const [unitOptions, setUnitOptions] = useState([]);
    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {

        fetch(`http://localhost:8080/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);


    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 ' onClick={handleCancel}>
                <Link href="/product/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    ประเภทสินค้า/สำหรับขาย
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขประเภทเมนูสำหรับขาย</p>
            <div className="w-1/2">
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อประเภทเมนูสำหรับขาย :</p>
                    <input
                        // ต้องเป็น defult สำหรับแก้ไข
                        value={SaleMenu.length > 0 ? SaleMenu[0].smt_name : ''} // ใช้ smt_name จาก SaleMenu ที่ index 0
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="off"
                        className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยสินค้า :</p>
                    <select id="countries"
                        className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                        name="unit"
                        value={SaleMenu.length > 0 ? SaleMenu[0].un_id : ''} // Set the value to un_id
                        onChange={handleChange}>
                        {unitOptions.map((unit: UnitType) => (
                            <option key={unit.un_id} value={unit.un_id}>
                                {unit.un_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนชิ้น :</p>
                    <div className="flex items-center">
                        <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleDecrement} >
                            <svg className="text-[#73664B]"
                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12" /></svg>
                        </button>
                        <span className="w-1/6 text-center">{SaleMenu.length > 0 ? SaleMenu[0].un_id : ''}</span>
                        <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleIncrement}>
                            <svg className="text-[#73664B]"
                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                        </button>
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="w-1/2  mt-10  flex justify-start " >
                        <button>
                            <Link href="/product/all"
                                onClick={handleCancel}
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
                                                            ยืนยันการแก้ไขประเภทเมนูสำหรับขาย
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-[#73664B]">
                                                                คุณต้องการแก้ไขประเภทเมนูสำหรับขายหรือไม่
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
                                                                    onClick={handleConfirm}
                                                                ><Link href="/product/all">
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
                        <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default editmenuforsell