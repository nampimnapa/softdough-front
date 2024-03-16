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


function add() {

    const [isOpen, setIsOpen] = useState(false);

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
        fetch('http://localhost:8080/ingredient/read')
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
            ingredient_lot: {}, // ข้อมูล ingredient_lot ว่างไว้เนื่องจากไม่ได้ระบุข้อมูลในคำถาม
            ingredient_lot_detail: ingredientLotDetail
        };

        const response = await fetch('http://localhost:8080/ingredient/addLotIngrediantnew', {
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
        <div className="h-screen">
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
                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
                        <select id="ingredients"
                            className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                            {Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind: Ingredients) => (
                                <option key={ind.ind_id} value={ind.ind_name}>
                                    {ind.ind_name}
                                </option>
                            ))}
                        </select>
                    </p>
                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">จำนวน :
                        <input
                            min="1"
                            // onChange={handleCancelClick}
                            type="number"
                            name="count"
                            id="count"
                            className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                        /></p>
                    <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                        <p>วันหมดอายุ: </p>

                        <Datepicker
                            useRange={false}
                            asSingle={true}
                            value={value}
                            onChange={handleValueChange}
                        /></div>
                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
                        min="1"
                        // onChange={handleCancelClick}
                        type="number"
                        pattern="[0-9]+([.,][0-9]+)?"
                        name="price"
                        id="price"
                        className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                    /></p>
                    <div className="scale-75 w-full my-2">
                        <button
                            type="submit"
                            value="เพิ่มวัตถุดิบ"
                            className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 py-2 px-2">เพิ่มวัตถุดิบ</button>
                    </div>
                </div >
            </form>

            {addedIngredients.map((addedIngredient, index) => (
                <div key={index} className="grid grid-cols-6 text-sm px-6 py-2 text-[#73664B]">
                    <p className="">วัตถุดิบ:  {addedIngredient.name}</p>
                    <p className="px-2 ">จำนวน:  {addedIngredient.quantity}</p>
                    <p className="col-span-2 px-2 ">วันหมดอายุ:  {addedIngredient.exp}</p>
                    <p className="px-2 " >ราคา:  {addedIngredient.price}</p>
                    <p className="px-2 ">
                        <button onClick={() => handleDeleteIngredient(index)}>
                            <TrashIcon className="h-5 w-5 text-red-500" /></button>
                    </p>
                </div>
            ))}

            < div className="flex justify-between  mt-8 " >
                <button>
                    <Link href="/ingredients/income/all"
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        ย้อนกลับ</Link></button>
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
                <button onClick={openModal} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
            </div >

        </div>

    )
}

export default add