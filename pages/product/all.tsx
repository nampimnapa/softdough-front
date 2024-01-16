import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { Kanit } from "next/font/google";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function all() {
    const ingredients = {
        สินค้า: [
            {
                id: 1,
                name: 'โดนัท',

            },
            {
                id: 2,
                name: 'ดิป',

            },
        ],
        เมนูสำหรับขาย: [
            {
                lot: "LOT01",
                lotname: "ไข่ไก้",
                lotstock: 6,
                exp: "20/11/2555",

            },

        ]

    };
    const [categories, setCategories] = useState(ingredients);
    const [toggle, setToggle] = useState(false);
    const EditCategory = () => {
        setToggle(true);
    }
    // บันทึก
    const SaveEditCategory = () => {

    }
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = (ingredientToEdit, position) => {
    setSelectedIngredient(ingredientToEdit);
    // setDialogPosition(position);
    setIsOpen(true);
};
    const [selectedIngredient, setSelectedIngredient] = useState(null);




    return (
        <div className="h-screen">
            <p className='text-[#F2B461] font-medium m-4'>ประเภทสินค้า/สำหรับขาย</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required ></input>
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border  hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    <Link href="/ingredients/add">
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>
            <div>
                <Tab.Group>
                    <Tab.List className="flex space-x-5  bg-white border-b border-b-1 border-b-[#E3D8BF] mx-5">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-sreen py-2.5 text-sm focus:outline-none',
                                        selected
                                            ? 'bg-white  text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
                                            : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(categories).map((ingredients, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    ' bg-white p-3',

                                )}
                            >
                                {idx === 0 ? (
                                    <div className="relative overflow-x-auto ">
                                        <table className="w-full text-sm text-center text-gray-500">
                                            <thead >
                                                <tr className="text-white  font-normal  bg-[#908362]  ">
                                                    <td scope="col" className="px-3 py-3">
                                                        ลำดับ
                                                    </td>
                                                    <td scope="col" className="px-12 py-3 ">
                                                        ชื่อประเภทสินค้า
                                                    </td>
                                                    <td scope="col" className="px-12 py-3 ">

                                                    </td>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ingredients.map((ingredients) => (
                                                    <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                        <td scope="row" className="px-6 py-1  text-[#73664B] whitespace-nowrap dark:text-white">
                                                            {ingredients.id}
                                                        </td>
                                                        <td className="px-6 py-1 text-left text-[#73664B]">
                                                            {/* <Transition.Root show={isOpen} as={Fragment}>
                                                                <Dialog
                                                                    as="div"
                                                                    className="fixed inset-0 z-40 overflow-y-auto"
                                                                    onClose={closeDialog}
                                                                >
                                                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                                        <input type="text"
                                                                            placeholder="แก้ไข">
                                                                        </input>
                                                                    </div>
                                                                </Dialog>
                                                            </Transition.Root> */}
                                                            {ingredients.name}

                                                        </td>
                                                        <td className="px-6 py-4 flex items-center justify-end ">
                                                            <button type="submit" onClick={(e) => e.stopPropagation()}>
                                                                <Link href="" className="w-full flex justify-center items-center">
                                                                    <PencilSquareIcon className="h-4 w-4 text-[#73664B] " />
                                                                </Link>
                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    // เลย์เอาท์สำหรับ Tab ที่ 2
                                    <div className="second-tab-layout">
                                        <div className="relative overflow-x-auto ">
                                            <table className="w-full text-sm text-center text-gray-500">
                                                <thead>
                                                    <tr className="text-white  font-normal  bg-[#908362]  ">
                                                        <td scope="col" className="px-6 py-3">
                                                            ล็อตวัตถุดิบ
                                                        </td>
                                                        <td scope="col" className="px-12 py-3 ">
                                                            รายการ
                                                        </td>
                                                        <td scope="col" className="px-6 py-3">
                                                            สต็อก
                                                        </td>
                                                        <td scope="col" className="px-6 py-3">
                                                            วันหมดอายุ
                                                        </td>

                                                        <td scope="col" className="px-6 py-3">
                                                            รายละเอียด
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ingredients.map((ingredients) => (
                                                        <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                            <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
                                                                {ingredients.lot}
                                                            </td>
                                                            <td className="px-6 py-1 text-left">
                                                                {ingredients.lotname}
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                {ingredients.lotstock}
                                                            </td>

                                                            <td className="px-6 py-1">
                                                                {ingredients.exp}
                                                            </td>

                                                            <td className="px-6 py-4 flex items-center justify-center  ">
                                                                <button type="submit" >
                                                                    <Link href="/ingredients/detailall" className="w-full flex justify-center items-center">
                                                                        <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
                                                                    </Link>
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>


        </div>
    )
}

export default all