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
import { CheckboxGroup, Checkbox, Input, colors, Button } from "@nextui-org/react";
import Head from 'next/head'
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


function Add() {

    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox status
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [message, setMessage] = useState('Loading');
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบว่า e.target และ e.target.price มีค่าหรือไม่
        const priceValue = e.target.price ? e.target.price.value : null;

        // ตัวอย่าง: นำข้อมูลที่กรอกใน form ไปเก็บไว้ใน state
        const ingredientData = {
            name: e.target.ingredients.value,
            quantity: e.target.count.value,
            exp: value.startDate,  // ใช้ค่าจาก datepicker
            price: priceValue,  // ใช้ค่าจากตรวจสอบ e.target.price
        };
        setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientData]);

    };
    const handleDeleteIngredient = (index) => {
        setAddedIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    interface Ingredients {
        ind_id: string;
        ind_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []); // Run only once on component mount

    const handleSubmit2 = async () => {
        const ingredientLotDetail = addedIngredients.map((ingredient) => ({

            ind_id: ingredientsOptions.findIndex(option => option.ind_name === ingredient.name) + 1,
            qtypurchased: parseInt(ingredient.quantity), // แปลงเป็นตัวเลข
            date_exp: value.startDate, // ใช้ค่าจาก datepicker
            price: parseInt(ingredient.price) // แปลงเป็นตัวเลข
        }));

        const requestData = {
            ingredient_lot: { status: isChecked ? 2 : 1, }, // ข้อมูล ingredient_lot ว่างไว้เนื่องจากไม่ได้ระบุข้อมูลในคำถาม
            ingredient_lot_detail: ingredientLotDetail
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addLotIngrediantnew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        const responseData = await response.json();
        if (responseData.message === 'success') {
            setMessage('Data added successfully');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }

    };



    return (
        <div className="">
            <Head>
                <title>เพิ่มวัตถุดิบเข้าร้าน - Softdough</title>
            </Head>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>เพิ่มวัตถุดิบเข้าร้าน</p>
            <p className="text-m px-6 py-2 text-[#73664B]">รายละเอียดวัตถุดิบที่เพิ่ม</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6">
                    <div className="flex items-center justify-center">
                        <p className="text-sm ml-6 mr-3 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ: </p>
                        <select id="ingredients"
                            className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                            {Array.isArray(ingredientsOptions) && ingredientsOptions
                                .sort((a, b) => a.ind_name.localeCompare(b.ind_name, 'th')) // Sorting by Thai alphabet

                                .map((ind: Ingredients) => (
                                    <option key={ind.ind_id} value={ind.ind_name}>
                                        {ind.ind_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center mr-5">
                        <p className="text-sm  text-[#73664B] flex justify-center items-center w-full">จำนวน : </p>
                        <input
                            min="1"
                            // onChange={handleCancelClick}
                            type="number"
                            name="count"
                            id="count"
                            className="px-3 bg-[#FFFFDD] w-full block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                    <div className="text-sm  py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                        <p className="w-1/3">วันหมดอายุ: </p>
                        <Datepicker
                            useRange={false}
                            asSingle={true}
                            value={value}
                            onChange={handleValueChange}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">ราคา : </p>
                        <input
                            min="1"
                            // onChange={handleCancelClick}
                            type="number"
                            pattern="[0-9]+([.,][0-9]+)?"
                            name="price"
                            id="price"
                            className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                    <div className="scale-75 w-full my-2 flex justify-end">
                        <Button
                            type="submit"
                            value="เพิ่มวัตถุดิบ"
                            className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 py-2 px-2">เพิ่มวัตถุดิบ</Button>
                    </div>
                </div >
            </form>

            <div className="mx-6 mt-3 h-1/2">
                <div className="flex flex-col">
                    <div className="bg-[#908362] text-white text-sm flex">
                        <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                        <div className="flex-1 py-3 text-center">จำนวน</div>
                        <div className="flex-1 py-3 text-center">วันหมดอายุ</div>
                        <div className="flex-1 py-3 text-center">ราคา</div>
                        <div className="flex-1 py-3 text-center"></div>
                    </div>
                    <div className="max-h-40 overflow-y-auto mb-5">
                        <table className="w-full">
                            <tbody className="w-full">
                                {addedIngredients.map((addedIngredient, index) => (
                                    <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                        <td scope="col" className="flex-1 text-center">{addedIngredient.name}</td>
                                        <td scope="col" className="flex-1 text-center">{addedIngredient.quantity}</td>
                                        <td scope="col" className="flex-1 text-center">{addedIngredient.exp}</td>
                                        <td scope="col" className="flex-1 text-center">{addedIngredient.price}</td>
                                        <td scope="col" className="flex-1 text-center">
                                            <div className="flex items-center justify-center">
                                                <button onClick={() => handleDeleteIngredient(index)}>
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            <div className="ml-6 ">
                {/* เช็คคือยืนยันการใช้งาน */}
                <Checkbox radius="sm" color="warning" checked={isChecked} onChange={handleCheckboxChange} className="text-sm text-[#73664B]">
                    ยืนยันการใช้งาน
                </Checkbox>
            </div>

            < div className="mt-8 " >
                <button>
                    <Link href="/ingredients/income/all"
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        ย้อนกลับ</Link></button>
                <>
                    {isOpen && (
                        <Transition appear show={isOpen} as={Fragment} >
                            <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
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
                                                    ยืนยันการเพิ่มวัตถุดิบเข้าร้าน
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการเพิ่มวัตถุดิบเข้าร้านหรือไม่
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
                                                            onClick={handleSubmit2}
                                                        ><Link href="/ingredients/income/all">
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
                <button onClick={openModal} type="button" className="ml-2 mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
            </div >

        </div>

    )
}

export default Add