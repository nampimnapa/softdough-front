import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function test() {
    // const handleSubmit = (e) => {
    //     e.preventDefault();


    //     // ตรวจสอบว่า e.target และ e.target.price มีค่าหรือไม่
    //     // const priceValue = e.target.price ? e.target.price.value : null;

    //     // ตัวอย่าง: นำข้อมูลที่กรอกใน form ไปเก็บไว้ใน state
    //     // const ingredientData = {
    //     //     name: e.target.ingredients.value,
    //     //     quantity: e.target.count.value,
    //     //     exp: value.startDate,  // ใช้ค่าจาก datepicker
    //     //     price: priceValue,  // ใช้ค่าจากตรวจสอบ e.target.price
    //     // };

    //     // setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientData]);
    // };
    const [currentPage, setCurrentPage] = useState("item1");

    const handleItemClick = (itemId) => {
        setCurrentPage(itemId); // อัพเดท state เมื่อมีการคลิกที่ลิงก์
    };

    const handleNextClick = () => {
        handleItemClick("item2"); // เมื่อกดปุ่ม "ถัดไป" ให้ตั้ง currentPage เป็น "item2"
    };
    const handleBackClick = () => {
        handleItemClick("item1"); // เมื่อกดปุ่ม "ถัดไป" ให้ตั้ง currentPage เป็น "item1"
    };

    return (

        <div>
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    สูตรอาหาร
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>เพิ่มสินค้า</p>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">

                    <div className="w-full">
                        <div className="flex justify-between w-full my-2">
                            <div className="w-1/4 flex h-min items-center ">
                                <p className="text-sm pl-6 text-[#73664B] mr-4 w-full">ประเภทสินค้า :</p>
                                <select
                                    id="product"
                                    className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                    name="unit"
                                >
                                    <option disabled selected value="">
                                        เลือกประเภทสินค้า
                                    </option>
                                    <option>โดนัท</option>
                                    <option>ดิป</option>
                                </select>
                            </div>
                            <div className="flex w-1/2 ">
                                <label className="text-sm mr-4 text-[#73664B]">รูปภาพ :</label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs text-[#73664B]"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 w-1/3 my-2 h-min">
                            <p className="text-sm px-6 py-2 text-[#73664B] w-full">ชื่อสินค้า :</p>
                            <input
                                placeholder="ชื่อสินค้า"
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="off"
                                className="col-span-2 px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 w-1/3 my-2">
                            <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนสินค้าชั้นต่ำ :</p>
                            <input
                                placeholder="จำนวนสินค้าขั้นต่ำ"
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="off"
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center w-1/4">
                            <p className="text-sm pl-6 text-[#73664B]">หน่วยสินค้า :</p>
                            <select
                                id="product"
                                className="bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2 ml-7"
                                name="unit"
                            >
                                <option disabled selected value="">
                                    เลือกหน่วย
                                </option>
                                <option>กล่อง</option>
                                <option>ถ้วย</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div id="item2" className="carousel-item w-full " >
                    <div>
                        <p className="text-[#73664B] mx-6 my-2">สูตรอาหาร</p>
                        <form >
                            <div className="grid grid-cols-4">
                                <div className="flex items-center justify-center">
                                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:</p>
                                    <select id="ingredients"
                                        className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">

                                    </select>

                                </div>
                                <div className=" flex items-center justify-center">
                                    <p className="text-sm px-5 py-2 text-[#73664B] flex justify-center ">ปริมาณ:</p>
                                    <input
                                        min="0"

                                        type="number"
                                        name="count"
                                        id="count"
                                        className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                </div>
                                <div className=" flex items-center justify-center">
                                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center ">หน่วย:</p>
                                    <select id="ingredients"
                                        className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6 h-min">

                                    </select>
                                </div>
                                <div className="scale-75 w-1/2 h-auto flex justify-center">
                                    <button
                                        type="submit"
                                        value="เพิ่มวัตถุดิบ"
                                        className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มวัตถุดิบ</button></div>
                            </div >

                        </form>
                    </div>

                </div >
            </div>

            <div className="flex justify-center mt-10 ">
                <a
                    href="#item1"
                    className={`scale-50 h-6 w-6 btn btn-xs rounded-full ${currentPage === "item1" ? "bg-[#73664B]" : "bg-[#C5B182]"} hover:bg-[#73664B]`}
                    onClick={() => handleItemClick("item1")}
                ></a>
                <a
                    href="#item2"
                    className={`scale-50 h-6 w-6 btn btn-xs rounded-full ${currentPage === "item2" ? "bg-[#73664B]" : "bg-[#C5B182]"} hover:bg-[#73664B]`}
                    onClick={() => handleItemClick("item2")}
                ></a>
            </div>
            
            <div className="flex justify-start">
                <div className="mt-10 flex justify-start">
                    <button onClick={handleBackClick}>
                        <Link
                            href={currentPage === "item2" ? "#item1" : "/product/all"}
                            type="button"
                            className="text-white bg-[#C5B182] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-6"
                        >
                            {currentPage === "item2" ? "ย้อนกลับ" : "ยกเลิก"}
                        </Link>
                    </button>
                </div>
                <div className="mt-10 flex justify-start">
                    <button onClick={handleNextClick}>
                        <Link
                            href="#item2"
                            type="button"
                            className={`ml-2 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ${currentPage === "item2" ? "bg-[#73664B]" : "bg-[#73664B]"
                                }`}
                        >
                            {currentPage === "item2" ? "บันทึก" : "ถัดไป"}
                        </Link>
                    </button>
                </div>
            </div>

        </div >

    )
}

export default test