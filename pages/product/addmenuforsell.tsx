import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


function addmenuforsell() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };
    // เก็บจำนวน
    const [formData, setFormData] = useState({
        smt_name: '',
        un_id: '',
        qty_per_unit: 1
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
            qty_per_unit: formData.qty_per_unit + 1
        });
    };

    const handleDecrement = () => {
        if (formData.qty_per_unit > 1) {
            setFormData({
                ...formData,
                qty_per_unit: formData.qty_per_unit - 1
            });
        }
    };

    const handleConfirm = async () => {
        console.log("Name: ", formData.smt_name, " Unit : ", formData.un_id, " Count : ", formData.qty_per_unit);
        closeModal();
        try {
            const response = await fetch('http://localhost:8080/salesmenu/addtype', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเพิ่ม');
            }

            console.log('success');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error.message);
            // จัดการข้อผิดพลาด (เช่น แสดงข้อความผิดพลาดให้ผู้ใช้เห็น)
        }
    };
    const { id } = router.query;
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
            <button className='my-3 mx-5 '>
                <Link href="/product/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    ประเภทสินค้า/สำหรับขาย
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>เพิ่มประเภทเมนูสำหรับขาย</p>
            <div className="w-1/2">
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อประเภทเมนูสำหรับขาย :</p>
                    <input
                        onChange={handleChange}
                        placeholder="ชื่อประเภทเมนูสำหรับขาย"
                        type="text"
                        name="smt_name"
                        id="smt_name"
                        autoComplete="off"
                        className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-2 mt-2">
                    <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยสินค้า :</p>
                    <select id="un_id"
                        onChange={handleChange}
                        className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                        name="un_id">
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
                        <span className="w-1/6 text-center"> {formData.qty_per_unit} </span>
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
                                                            ยืนยันการเพิ่มประเภทเมนูสำหรับขาย
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-[#73664B]">
                                                                คุณต้องการเพิ่มประเภทเมนูสำหรับขายหรือไม่
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


export default addmenuforsell