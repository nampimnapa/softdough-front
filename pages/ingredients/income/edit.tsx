import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/router";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});
function edit() {
    const ingreunit = {
        "แป้ง": 1,
        "น้ำตาล": 2,
        "นม":  3,
        "เนย": 4
    };

    const [ingrelot, setIngrelot] = useState([
        {
            lotno: "LOT01",
            date: '10/10/2555',
            ingre: [
                {
                    ind_id: 1,
                    count:2,
                    exp: "10/10/2556",
                    price: 500
                }
               
            ],
        },
    ]);
    const handleEditWork = () => {
        setIsOpen(false);
        console.log("handleEditWork", ingrelot);
    };

    const handleAddIngredient = (newIngredient) => {
        setIngrelot((prevIngrelot) => {
            // const updatedIngrelot = [...prevIngrelot];
            // ตรวจสอบว่า lotIndex มีค่าหรือไม่
            const lotIndex = prevIngrelot.findIndex((lot) => lot.lotno === newIngredient.lotno);
            if (lotIndex !== -1) {
                // ตรวจสอบว่า property ingre มีค่าหรือไม่
                if (prevIngrelot[lotIndex].ingre) {
                    prevIngrelot[lotIndex].ingre.push(newIngredient.ingre[0]);
                } else {
                    prevIngrelot[lotIndex].ingre = [newIngredient.ingre[0]];
                }
            }
            console.log(prevIngrelot);
            return prevIngrelot;
            
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const ingredients = {
        name: [
            "แป้ง",
            "น้ำตาล",
            "นม",
            "เนย"]
    }
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const handleSubmit = (e, lotIndex) => {
        e.preventDefault();
        const priceValue = e.target.price ? e.target.price.value : null;
        const ingredientData = {
            name: e.target.ingredients.value,
            count: e.target.count.value,
            exp: value.startDate,
            price: priceValue,
        };

        handleAddIngredient({ lotno: ingrelot[lotIndex].lotno, ingre: [ingredientData] });
    };
    const handleDeleteIngredient = (lotIndex, ingreIndex) => {
        setIngrelot((prevIngrelot) => {
            const updatedIngrelot = [...prevIngrelot];
            updatedIngrelot[lotIndex].ingre.splice(ingreIndex, 1);
            return updatedIngrelot;
        });
    };

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
            {ingrelot.map((lot, index) => (
                <div key={index}>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {lot.lotno}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {lot.date}</p>
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                        <div className="grid grid-cols-6">
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
                                <select id="ingredients"
                                    className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                                    {ingredients.name.map((ingredient, index) => (
                                        <option key={index}>{ingredient}</option>
                                    ))}
                                </select>
                            </p>
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">
                                จำนวน :
                                <input
                                    min="0"
                                    type="number"
                                    name="count"
                                    id="count"
                                    className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                                {/* ใส่หน่วยวัตถุดิบตรง span */}
                            </p>
                            <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                                <p>วันหมดอายุ: </p>
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={value}
                                    onChange={handleValueChange}
                                /></div>
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
                                min="0"
                                type="number"
                                pattern="[0-9]+([.,][0-9]+)?"
                                name="price"
                                id="price"
                                className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                            /></p>
                            <input
                                type="submit"
                                value="เพิ่มวัตถุดิบ"
                                className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 scale-75 w-1/2" />
                        </div >
                    </form>
                    {lot.ingre.map((ingredient, Idx) => (
                        <Fragment key={Idx}>
                            <div className="grid grid-cols-8">
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ : {ingredient.ind_id}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">จำนวน : {ingredient.count} {ingreunit[ingredient.ind_id] || ''}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.exp}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p>
                                <p className="px-6 py-2">
                                    <button onClick={() => handleDeleteIngredient(index, Idx)}>
                                        <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                </p></div>
                        </Fragment>
                    ))}
                </div>
            ))}
            <div className="flex justify-end  mt-5" >
                <button onClick={openModal}
                    type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    เสร็จสิ้น
                    {/* <Link href="/ingredients/income/all">
                        เสร็จสิ้น</Link> */}
                </button>

            </div>
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
                                        <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${kanit.className}`}>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-[73664B]"
                                            >
                                                ยืนยันการแก้ไขวัตถุดิบเข้าร้าน
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-[#73664B]">
                                                    คุณต้องการแก้ไขวัตถุดิบเข้าร้านหรือไม่
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
                                                        onClick={handleEditWork}>
                                                        ยืนยัน</button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>

                        </Dialog>

                    </Transition>
                )}
            </>

        </div>
    )
}

export default edit