import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import {

    TrashIcon
} from "@heroicons/react/24/outline";

function add() {
    const product_type =
        [{ id: 1, name: "โดนัท" },
        { id: 2, name: "ดิป" },
        { id: 3, name: "เดี่ยว" }
        ];
    const pd =
        [{ id: 1, name: "เรดเวลเวด", type: 1 },
        { id: 2, name: "ใบเตย", type: 1 },
        { id: 3, name: "ออริจินอล", type: 1 },
        { id: 4, name: "นมฮอกไกโด", type: 2 },
        { id: 5, name: "ชาเขียว", type: 2 },
        { id: 6, name: "ช็อค", type: 2 },
        { id: 7, name: "บอมโบโลนี", type: 3 },
        { id: 8, name: "บานอฟฟี่", type: 3 },
        ];

    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>เพิ่มใบสั่งผลิต</p>
            <form>
                <div className="grid grid-cols-4">
                    <div className="flex items-center justify-center">
                        <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ประเภทสินค้า:</p>
                        <select id="ingredients"
                            className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                            {product_type.map((pd) => (
                                <option key={pd.id} value={pd.id}>
                                    {pd.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className=" flex items-center justify-center">
                        <p className="text-sm px-5 py-2 text-[#73664B] flex justify-center ">สินค้า:</p>
                        <select id="ingredients"
                            className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6">
                            {product_type.map((pd) => (
                                <option key={pd.id} value={pd.id}>
                                    {pd.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className=" flex items-center justify-center">
                        <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center ">จำนวน:</p>
                        <input
                            placeholder="จำนวน"
                            type="text"
                            name="qtymin"
                            id="qtymin"
                            autoComplete="off"
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                        />
                    </div>
                    <div className="scale-75 w-1/2 h-auto flex justify-center">
                        <button

                            type="submit"
                            value="เพิ่มวัตถุดิบ"
                            className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มวัตถุดิบ</button></div>
                </div>
            </form>
            <p className="m-4 text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดใบสั่งผลิต</p>
            <div className="mx-6 mt-3">
                <div className="flex flex-col">
                    <div className="bg-[#908362] text-white text-sm flex">
                        <div className="flex-1 py-3 text-center">ประเภทสินค้า</div>
                        <div className="flex-1 py-3 text-center">สินค้า</div>
                        <div className="flex-1 py-3 text-center">จำนวน</div>
                        <div className="flex-1 py-3 text-center"></div>
                    </div>
                    <div className="max-h-40 overflow-y-auto mb-5">
                        <table className="w-full">
                            <tbody className="w-full">
                                {/* {addedIngredients.slice().reverse().map((ingredient) => (
                                    <tr key={ingredient.id} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                        <td scope="col" className="flex-1 text-center">{ind.find((i) => i.ind_id === parseInt(ingredient.id)).ind_name}</td>
                                        <td scope="col" className="flex-1 text-center">{ingredient.quantity}</td>
                                        <td scope="col" className="flex-1 text-center">{unit.find((u) => u.un_id === parseInt(ingredient.unit)).un_name}</td>
                                        <td scope="col" className="flex-1 text-center">
                                            <div className="flex items-center justify-center">
                                                <button onClick={() => handleDeleteIngredient(ingredient.id)}>
                                                    <TrashIcon className="h-5 w-5 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default add