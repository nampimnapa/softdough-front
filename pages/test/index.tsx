import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Chip } from "@nextui-org/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let dataSet = null;

function All() {

    // ตัวแปรแก็บข้อมูลจาก API
    const productsAPI = [
        { id: 1, name: 'โดนัท' },
        { id: 2, name: 'ดิป' },
    ];

    // API สำหรับข้อมูลเมนู
    const menuAPI = [
        {
            lot: "LOT01",
            lotname: "ไข่ไก้",
            lotstock: 6,
            exp: "20/11/2555",
        },
    ]

    // เอาจากตัวแปรที่ได้จาก API มาทำเป็น State
    const [dataProduct, setDataProduct] = useState(productsAPI);
    const [dataMenu, setDataMenu] = useState(menuAPI);
    const [isEditing, setIsEditing] = useState(false);
    const [openInput, setOpenInput] = useState(0);

    const changeInput = (id: any) => {
        setOpenInput(id);
        setIsEditing(true);
    }
    // อันนี้เช็คเผื่อเปลี่ยนไอคอนเมื่อมีการกดแก้ไข
    const handleSaveChanges = () => {
        setOpenInput(0);
        setIsEditing(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newValue = event.target.value;

        // ใช้ setDataProduct เพื่ออัปเดต State
        setDataProduct(prevProducts => {
          return prevProducts.map(product => {
            if (product.id === id) {
              // อัปเดตข้อมูลเฉพาะของสินค้าที่ต้องการ
              return { ...product, name: newValue };
            }
            return product;
          });
        });
    };


    const handleCancelEdit = () => {

        setDataProduct(productsAPI)
        // ยกเลิกการแก้ไข
        setOpenInput(0);
        setIsEditing(false);
    };



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

                    <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                        เพิ่ม
                    </button>
                </div>
            </div>
            <div className="w-full">

                <div className="flex w-full flex-col">
                    <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 mx-5 border-b-1 border-b-[#E3D8BF]",
                            cursor: "w-full bg-[#73664B]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#73664B]"
                        }}
                    >

                        {/* Tab Product */}

                        <Tab
                            key="product"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>สินค้า</span>
                                </div>
                            }
                        >


                            <div className="relative overflow-x-auto mx-4">
                                <table className="w-full text-sm text-center table-fixed">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362]  ">
                                            <td scope="col" className="px-3 py-3 w-64">
                                                ลำดับ
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                                ชื่อประเภทสินค้า
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">

                                            </td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataProduct.map((ingredient) => (
                                            <tr key={ingredient.id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                                    {ingredient.id}
                                                </td>
                                                {openInput === ingredient.id ? (
                                                    <td className=" py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        <input
                                                            className="w-full h-9 focus:outline-none border"
                                                            type="text"
                                                            defaultValue={ingredient.name}
                                                            onChange={(event) => handleInputChange(event, ingredient.id)}

                                                        />
                                                    </td>
                                                ) : (
                                                    <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        {ingredient.name}
                                                    </td>
                                                )}
                                                {isEditing && openInput === ingredient.id ? (
                                                    <>
                                                        <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem]  flex items-center justify-end">
                                                            <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">ยกเลิก
                                                            </button>
                                                            <button type="button" onClick={handleSaveChanges} className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light">บันทึก
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td className="me-2 py-4 flex items-center justify-end whitespace-nowrap overflow-hidden">
                                                        <button type="button" onClick={() => changeInput(ingredient.id)}>
                                                            <a href="#" className="w-full flex justify-center items-center">
                                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                            </a>
                                                        </button>
                                                    </td>
                                                )}

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>


                        </Tab>

                        {/* Tab Menu */}
                        <Tab
                            key="music"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>เมนูสำหรับขาย</span>
                                </div>
                            }
                        >

                            <div className="second-tab-layout mx-4">
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
                                            {dataMenu.map((ingredients) => (
                                                <tr key={ingredients.lot} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
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


                        </Tab>

                    </Tabs>
                </div>

            </div>


        </div>
    )
}

export default All