import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import {
    TrashIcon
} from "@heroicons/react/24/outline";
import { CheckboxGroup, Checkbox, Input, colors, Button } from "@nextui-org/react";
import { Dialog, Transition } from '@headlessui/react';

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


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
    const [selectedProductType, setSelectedProductType] = useState(1); // ประเภทสินค้าที่ถูกเลือก

    // กรองสินค้าตามประเภทที่ถูกเลือก
    const filteredProducts = pd.filter(product => product.type === selectedProductType);

    const [addedDetail, setAddedDetail] = useState([]);

    // รายละเอียดใบสั่งผลิต
    const [detail, setDetail] = useState({
        type: '',
        pd: '',
        num: 1,
    });
    const handleAddDetail = () => {
        event.preventDefault();
        const selectedProductType = parseInt((document.getElementById("productType") as HTMLSelectElement).value);
        const selectedProductId = parseInt((document.getElementById("product") as HTMLSelectElement).value);
        const selectedProduct = filteredProducts.find(product => product.id === selectedProductId);
        const typepd = product_type.find(type => type.id === selectedProductType)?.name;
        const existingDetailIndex = addedDetail.findIndex(detail => detail.pd === selectedProduct?.name);
        if (!selectedProduct) {
            alert("กรุณาเลือกสินค้า");
            return;
        }

        // Validate that a quantity is entered
        const enteredQuantity = parseInt((document.getElementById("num") as HTMLInputElement).value);
        if (isNaN(enteredQuantity) || enteredQuantity <= 0) {
            alert("กรุณากรอกจำนวนที่ถูกต้อง");
            return;
        }
        if (existingDetailIndex !== -1) {
            const updatedAddedDetail = [...addedDetail];
            updatedAddedDetail[existingDetailIndex].num += parseInt((document.getElementById("num") as HTMLInputElement).value);
            setAddedDetail(updatedAddedDetail);
        } else {
            const newDetail = {
                type: selectedProductType || '', // Use typepd here
                pd: selectedProduct?.name || '',
                num: parseInt((document.getElementById("num") as HTMLInputElement).value),
            };

            setAddedDetail(prevDetail => [...prevDetail, newDetail]);
        }

        setSelectedProductType(1);
        (document.getElementById("product") as HTMLSelectElement).value = "";
        (document.getElementById("num") as HTMLInputElement).value = "";
    };
    const handleDeleteDetail = (index) => {
        const updatedAddedDetail = [...addedDetail];
        updatedAddedDetail.splice(index, 1);
        setAddedDetail(updatedAddedDetail);
    };
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const handleConfirm = () => {
        console.log("รายละเอียดสินค้าทั้งหมด:", addedDetail);
        closeModal();
    };
    const handleCancel = () => {
        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };



    return (
        <div>
            <div>
                <p className='text-[#F2B461] font-medium m-6'>เพิ่มใบสั่งผลิต</p>
                <form >
                    <div className="grid grid-cols-4">
                        <div className="flex items-center justify-center">
                            <p className="text-sm px-6 py-2 text-[#73664B] flex items-center w-full">ประเภทสินค้า :</p>
                            <select
                                id="productType"
                                value={selectedProductType}
                                onChange={(e) => setSelectedProductType(parseInt(e.target.value))}
                                className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6"
                            >
                                {product_type.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=" flex items-center justify-center">
                            <p className="text-sm px-5 py-2 text-[#73664B] flex justify-center w-full">สินค้า :</p>
                            <select
                                id="product"
                                className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6"
                            >
                                {filteredProducts.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=" flex items-center justify-center">
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center w-full">จำนวน :</p>
                            <input
                                value={detail.num} // Use the value from the state variable
                                id="num"
                                placeholder="จำนวน"
                                type="number"
                                min={1}
                                autoComplete="off"
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                                onChange={(e) => setDetail({ ...detail, num: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="scale-75 w-1/2 h-auto flex justify-center items-center">
                            <Button
                                onClick={handleAddDetail}
                                type="submit"
                                value="เพิ่มวัตถุดิบ"
                                className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มวัตถุดิบ</Button>
                        </div>
                    </div>
                </form>
                <p className="mx-6 my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดใบสั่งผลิต</p>
                <div className="mx-6 mt-3 h-1/2">
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
                                    {addedDetail.map((detail, index) => (
                                        <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                            <td scope="col" className="flex-1 text-center">{detail.type}</td>
                                            <td scope="col" className="flex-1 text-center">{detail.pd}</td>
                                            <td scope="col" className="flex-1 text-center">{detail.num}</td>
                                            <td scope="col" className="flex-1 text-center">
                                                <div className="flex items-center justify-center">
                                                    <button onClick={() => handleDeleteDetail(index)}>
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
            </div>
            <div className="ml-6 ">
                <Checkbox radius="sm" color="warning">
                    ยืนยันการดำเนินการผลิต
                </Checkbox>
            </div>
            <div className="flex justify-start">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <Link href="/product/sell_all">
                        <Button href="/product/sell_all"
                            onClick={handleCancel}
                            type="button"
                            className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                            ยกเลิก</Button>
                    </Link>
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
                                                        ยืนยันการเพิ่มใบสั่งผลิต
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเพิ่มใบสั่งผลิตหรือไม่
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
                                                            ><Link href="#">
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
                    <Button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</Button>
                </div >
            </div>


        </div>
    )
}

export default add