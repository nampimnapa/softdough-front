import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { Dialog, Transition } from '@headlessui/react';
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Recipe_edit() {
    const ind =
        [{ ind_id: 1, ind_name: "แป้ง" },
        { ind_id: 2, ind_name: "นม" },
        { ind_id: 3, ind_name: "น้ำตาล" }
        ];
    const unit =
        [{ un_id: 1, un_name: "กรัม" },
        { un_id: 2, un_name: "ลิตร" },
        { un_id: 3, un_name: "สอบปุ๋ย" }
        ];
    

    const [currentPage, setCurrentPage] = useState("item1");

    const handleItemClick = (itemId) => {
        setCurrentPage(itemId); // อัพเดท state เมื่อมีการคลิกที่ลิงก์
    };

    const handleNextClick = () => {
        if (currentPage !== "item2") {
            handleItemClick("item2");
        }
        console.log(addedIngredients);

    };
    const handleBackClick = () => {
        handleItemClick("item1"); // เมื่อกดปุ่ม "ถัดไป" ให้ตั้ง currentPage เป็น "item1"
    };

    const [addedIngredients, setAddedIngredients] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const ingredientId = (document.getElementById("ingredients") as HTMLSelectElement).value;
        const ingredientName = ind.find((ingredient) => ingredient.ind_id === parseInt(ingredientId)).ind_name;
        const ingredientQty = parseInt((document.getElementById("count") as HTMLSelectElement).value);
        const unitId = (document.getElementById("unit") as HTMLSelectElement).value;  // Change here to get unit ID
        const unitName = unit.find((unit) => unit.un_id === parseInt(unitId)).un_name;

        // Check if the ingredient already exists in the addedIngredients array
        const existingIngredientIndex = addedIngredients.findIndex((ingredient) => ingredient.name === ingredientName && ingredient.unit === unitId);

        if (existingIngredientIndex !== -1) {
            // If the ingredient exists, update its quantity
            const updatedIngredients = addedIngredients.map((ingredient, index) => {
                if (index === existingIngredientIndex) {
                    return {
                        ...ingredient,
                        quantity: ingredient.quantity + ingredientQty,
                    };
                }
                return ingredient;
            });

            setAddedIngredients(updatedIngredients);
        } else {
            // If the ingredient does not exist, add it to the addedIngredients array
            const newIngredient = {
                id: addedIngredients.length + 1,
                name: ingredientName,
                quantity: ingredientQty,
                unit: unitName,  
            };

            setAddedIngredients([...addedIngredients, newIngredient]);
        }

        // Clear input fields after adding ingredient
        (document.getElementById("count") as HTMLInputElement).value = "";
    };
    const handleDeleteIngredient = (index) => {
        setAddedIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };


    return (

        <div className="h-screen">
            <button className='my-3 mx-5 '>
                <Link href="/product/recipe_detail" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายละเอียดสินค้า
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขสินค้า</p>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <div className="w-full">
                        <div className="flex justify-between w-full my-2">
                            <div className="w-1/4 flex h-min items-center ">
                                <p className="text-sm pl-6 text-[#73664B] mr-4 w-full ">ประเภทสินค้า :</p>
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
                {/* หน้า 2 */}
                <div id="item2" className="carousel-item w-full " >
                    <div>
                        <p className="text-[#73664B] mx-6 my-2">สูตรอาหาร</p>
                        <form >
                            <div className="grid grid-cols-4">
                                <div className="flex items-center justify-center">
                                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:</p>
                                    <select id="ingredients"
                                        className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                                        {ind.map((ind) => (
                                            <option key={ind.ind_id} value={ind.ind_id}>
                                                {ind.ind_name}
                                            </option>
                                        ))}
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
                                    <select id="unit"
                                        className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                                        {unit.map((unit) => (
                                            <option key={unit.un_id} value={unit.un_id}>
                                                {unit.un_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="scale-75 w-1/2 h-auto flex justify-center">
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        value="เพิ่มวัตถุดิบ"
                                        className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มวัตถุดิบ</button></div>
                            </div >
                        </form>
                        <div className="mx-6 mt-3">
                            <div className="flex flex-col">
                                <div className="bg-[#908362] text-white text-sm flex">
                                    <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                                    <div className="flex-1 py-3 text-center">ปริมาณ</div>
                                    <div className="flex-1 py-3 text-center">หน่วย</div>
                                    <div className="flex-1 py-3 text-center"></div>
                                </div>
                                <div className="max-h-40 overflow-y-auto mb-5">
                                    <table className="w-full">
                                        <tbody className="w-full">
                                            {addedIngredients.slice().reverse().map((ingredient, index) => (
                                                <tr key={ingredient.id} className=" even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                                    <td scope="col" className="flex-1 text-center ">{ingredient.name}</td>
                                                    <td scope="col" className="flex-1 text-center">{ingredient.quantity}</td>
                                                    <td scope="col" className="flex-1 text-center">{ingredient.unit}</td>
                                                    <td scope="col" className="flex-1 text-center">
                                                        <div className="flex items-center justify-center" >
                                                            <button onClick={() => handleDeleteIngredient(index)}>
                                                                <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex mx-6 items-center">
                                <p className="text-sm pr-3">สูตรอาหารผลิตได้ :</p>
                                <input
                                    placeholder="จำนวน"
                                    min="0"
                                    type="number"
                                    name="count"
                                    id="count"
                                    className="px-3 bg-[#FFFFDD] w-1/12 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                                <p className="text-sm pl-3">ชิ้น</p>
                            </div>
                            <div className="flex mx-6 my-2 items-center">
                                <p className="text-sm pr-3">จำนวนวันที่อยู่ได้ของสินค้า :</p>
                                <input
                                    placeholder="จำนวน"

                                    min="0"
                                    type="number"
                                    name="count"
                                    id="count"
                                    className="px-3 bg-[#FFFFDD] w-1/12 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                                <p className="text-sm pl-3">วัน</p>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            <div className="flex justify-center mt-5 ">
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
                <div className="flex justify-start">
                    <button onClick={handleBackClick}>
                        <Link
                            href={currentPage === "item2" ? "#item1" : "/product/recipe_detail"}
                            type="button"
                            className="text-white bg-[#C5B182] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-6"
                        >
                            {currentPage === "item2" ? "ย้อนกลับ" : "ยกเลิก"}
                        </Link>
                    </button>
                </div>
                <div className="flex justify-start">
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

export default Recipe_edit