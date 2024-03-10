import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { CheckboxGroup, Checkbox, Input, colors, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { Dialog, Transition } from '@headlessui/react';

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: []
});

function sell_add() {

    const [selectedOption, setSelectedOption] = useState("");

    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };
    const typesellmenu = [
        {
            id: 1,
            name: "กล่อง M",
            num: 4,
        },
        {
            id: 2,
            name: "กล่อง L",
            num: 6,
        },
        {
            id: 3,
            name: "ดิป",
            num: 1,
        },
        {
            id: 4,
            name: "เดี่ยว",
            num: 1,
        },
    ]
    const [count, setCount] = useState(1);
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => ({
            value: option.value,
            count: 1,
        }));
        setSelectedProducts(selectedOptions);
    };

    const handleIncrement = () => {
        setSelectedCount((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (selectedCount > 1) {
            setSelectedCount((prevCount) => prevCount - 1);
        }
    };
    const product = [
        { value: 'เรดเวลเวด', label: 'Red Velvet' },
        { value: 'ออริจินอล', label: 'Original' },
        { value: 'ใบเตย', label: 'Pandan' },
    ];

    const [values, setValues] = React.useState(new Set([]));
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const handleConfirm = () => {
        closeModal();
    };
    // cancel
    const handleCancel = () => {

        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };

    const [additionalProducts, setAdditionalProducts] = useState([]); // เก็บรายการสินค้าเพิ่มเติม
    const [countLimit, setCountLimit] = useState(0); // Set the initial count limit to 1
    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (event) => {
        const selectedTypeName = event.target.value;
        setSelectedType(selectedTypeName);

        // ค้นหาประเภทเมนูที่ถูกเลือกในอาร์เรย์ typesellmenu
        const selectedMenu = typesellmenu.find(menu => menu.name === selectedTypeName);

        // อัปเดตขีดจำกัดของ count ขึ้นอยู่กับประเภทเมนูที่ถูกเลือก
        if (selectedMenu) {
            setCountLimit(selectedMenu.num);
        } else {
            console.error('ประเภทเมนูที่เลือกไม่ถูกต้อง');
        }
    };

    // if (selectedCount <= countLimit) {
    //     // เพิ่มข้อมูล count แยกตามแต่ละรายการใน selectedProducts
    //     const newProducts = selectedProducts.map(product => ({ ...product, count: selectedCount }));

    //     // เพิ่มสินค้าใหม่เข้าไปในรายการ additionalProducts
    //     setAdditionalProducts([...additionalProducts, ...newProducts]);

    //     // รีเซ็ตสินค้าที่เลือก เพื่อให้ผู้ใช้สามารถเลือกสินค้าใหม่
    //     setSelectedProducts([]);
    //     // รีเซ็ต count ที่ระดับ global ให้กลับไปที่ 1
    //     setSelectedCount(1);
    // } else {
    //     console.error('เกินขีดจำกัดสำหรับรายการเมนูนี้หรือ count ไม่ถูกต้อง');
    // }
    const handleAddProduct = () => {
        let canAddProducts = true;

        // Validate count for each selected product
        selectedProducts.forEach(product => {
            if (count > countLimit) {
                console.error(`Exceeded the limit for ${product.value}`);
                canAddProducts = false;
            }
        });

        if (canAddProducts) {
            // Calculate total count for each product
            const newProducts = selectedProducts.map(product => ({
                ...product,
                count: product.count * selectedCount,
            }));

            // Add products to additionalProducts
            setAdditionalProducts(prevProducts => [...prevProducts, ...newProducts]);

            // Reset selected products and count
            setSelectedProducts([]);
            setSelectedCount(1);
        }
    };

    console.log(additionalProducts);



    return (
        <div className=''>
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    เมนูสำหรับขาย
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>เพิ่มเมนูสำหรับขาย</p>

            <div className="grid grid-cols-3 w-1/3 my-2 h-min">
                <p className="text-sm px-6 py-2 text-[#73664B] w-full">ชื่อเมนู :</p>
                <input
                    placeholder="ชื่อเมนูสำหรับขาย"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="col-span-2 px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
            </div>
            <div className="w-full flex h-min items-center">
                <p className="text-sm pl-6 text-[#73664B] mr-4 ">ประเภทเมนูสำหรับขาย :</p>
                <select
                    id="product"
                    className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2  w-1/4"
                    name="unit"
                    onChange={handleTypeChange}
                    defaultValue="ประเภทเมนูสำหรับขาย"
                >
                    <option disabled >
                        ประเภทเมนูสำหรับขาย
                    </option>
                    {typesellmenu.map((menu) => (
                        <option key={menu.id}>{menu.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-3 w-1/3 my-2 h-min">
                <p className="text-sm px-6 py-2 text-[#73664B] w-full">ราคา :</p>
                <input
                    placeholder="ราคา"
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    className="w-1/2 col-span-2 px-3 bg-[#FFFFDD] block rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                />
            </div>
            <div className="ml-2 mt-2 text-[#73664B]">
                <div className="mt-2 col-span-3 flex ml-3">
                    <div className="form-control">
                        <label className="label cursor-pointer ">
                            <input type="radio" name="depart" className="radio checked:bg-[#C5B182]"
                                checked={selectedOption === "fix"}
                                onChange={() => handleRadioChange("fix")}
                            />
                            <span className="text-sm text-[#73664B] px-3 ">เมนูกำหนดไว้</span>
                        </label>
                    </div>
                    <div className="form-control ml-4">
                        <label className="label cursor-pointer">
                            <input type="radio" name="depart" className="radio checked:bg-[#C5B182]"
                                checked={selectedOption === "mix"}
                                onChange={() => handleRadioChange("mix")} />
                            <span className="text-sm text-[#73664B] px-3">เมนูคละหน้าร้าน</span>
                        </label>
                    </div>
                </div>
                {/* fix */}
                {selectedOption === "fix" && (
                    <div>
                        <div className="flex items-center w-full">
                            <div className="flex h-min items-center w-full">
                                <p className="text-sm pl-4 text-[#73664B] mr-4 w-1/4">เลือกสินค้า :</p>
                                <select
                                    id="product"
                                    className="bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2 w-1/2"
                                    name="unit"
                                    onChange={handleProductChange}
                                    defaultValue = "เลือกสินค้า"
                                >
                                    <option disabled>
                                        เลือกสินค้า
                                    </option>
                                    <option value="เรดเวลเวด">เรดเวลเวด</option>
                                    <option value="ออริจินอล">ออริจินอล</option>
                                    <option value="ใบเตย">ใบเตย</option>
                                </select>
                            </div>
                            <div className="flex mt-2 w-full">
                                <p className="text-sm px-4 py-2 text-[#73664B] ">จำนวนชิ้น :</p>
                                <div className="flex items-center w-1/4">
                                    <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleDecrement} >
                                        <svg className="text-[#73664B]"
                                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12" /></svg>
                                    </button>
                                    <span className="w-1/2 text-center">{selectedCount}</span>
                                    <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleIncrement}>
                                        <svg className="text-[#73664B]"
                                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                        {additionalProducts.length > 0 && (
                            <div className="flex items-center w-full">
                                <div className="flex h-min items-center w-full">
                                    <p className="text-sm pl-4 text-[#73664B] mr-4 w-1/4">เลือกสินค้า :</p>
                                    <select
                                        id="product"
                                        className="bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2 w-1/2"
                                        name="unit"
                                        onChange={handleProductChange}
                                    >
                                        <option disabled selected>
                                            เลือกสินค้า
                                        </option>
                                        <option value="เรดเวลเวด">เรดเวลเวด</option>
                                        <option value="ออริจินอล">ออริจินอล</option>
                                        <option value="ใบเตย">ใบเตย</option>
                                    </select>
                                </div>
                                <div className="flex mt-2 w-full">
                                    <p className="text-sm px-4 py-2 text-[#73664B] ">จำนวนชิ้น :</p>
                                    <div className="flex items-center w-1/4">
                                        <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleDecrement} >
                                            <svg className="text-[#73664B]"
                                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12" /></svg>
                                        </button>
                                        <span className="w-1/2 text-center">{selectedCount}</span>
                                        <button className="btn btn-square bg-[#D9CAA7] btn-sm" onClick={handleIncrement}>
                                            <svg className="text-[#73664B]"
                                                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12" /></svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                        <div className="gap-2 mx-4">
                            <Button radius="full" size="sm" className="text-white bg-[#73664B]" onClick={handleAddProduct}>
                                เลือกสินค้าเพิ่มเติม
                            </Button>
                        </div>
                    </div>
                )}
                {/* mix */}
                {selectedOption === "mix" && (
                    <div>
                        <div className="flex ">
                            <div className="flex  mx-4 my-2 w-full">
                                <p className="mr-4 text-sm">ประเภทสินค้า :</p>
                                <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                                    <input
                                        className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[1px] border-solid border-[#C8C8C8] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-['']  checked:bg-[#D9CAA7] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right  "
                                        type="checkbox"
                                        value=""
                                        id="checkboxDefault" />
                                    <label
                                        className="inline-block ps-[0.15rem] hover:cursor-pointer text-sm"
                                        htmlFor="checkboxDefault">
                                        โดนัท
                                    </label>
                                </div>
                                <div className="ml-4 mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] ">
                                    <input
                                        className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[1px] border-solid border-[#C8C8C8] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-['']  checked:bg-[#D9CAA7] checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right  "
                                        type="checkbox"
                                        value=""
                                        id="checkboxChecked"
                                    />
                                    <label
                                        className="inline-block ps-[0.15rem] hover:cursor-pointer text-sm"
                                        htmlFor="checkboxChecked">
                                        ดิป
                                    </label>
                                </div>
                            </div>
                            <div className="w-full flex h-min items-center">
                                <p className="text-sm pl-6 text-[#73664B] mr-4 w-1/2">เลือกสินค้า :</p>
                                <Select
                                    placeholder="เลือกสินค้า"
                                    selectionMode="multiple"
                                    className="max-w-xs placeholder-[#73664B] text-base w-full"
                                    selectedKeys={values}
                                    onSelectionChange={setValues}
                                    style={{
                                        backgroundColor: '#E3D9C0',
                                        color: '#73664B',
                                        height: '2.5em',
                                        borderRadius: '0.25em', // ปรับขนาดขอบมุม
                                        filter: 'brightness(100%)'
                                    }}
                                >
                                    {product.map((animal) => (
                                        <SelectItem key={animal.value} value={animal.value} className={`max-w-xs placeholder-[#73664B] text-base ${kanit.className}`}
                                            style={{
                                                color: '#73664B',
                                                backgroundColor: '#E3D9C0',
                                                margin: '0',
                                                fontSize: 'smaller'
                                            }}>
                                            {animal.value}
                                        </SelectItem>
                                    ))}
                                </Select>

                            </div>
                            <div className="w-full flex ">
                                <div className="ml-10 items-center">
                                    <p className="text-sm">สินค้าที่เลือก :</p>
                                </div>
                                <ul className="text-sm list-disc">
                                    {Array.from(values).map((item, index) => (
                                        <li key={index} className="ml-5">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                )}
                <div>
                    <p className="text-sm mt-10 ml-4">สถานะสินค้า :</p>
                    <div className="mt-2 col-span-3 flex ml-3">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="status" className="radio checked:bg-[#C5B182]" defaultChecked />
                                <span className="text-sm text-[#73664B] px-3 ">ใช้งานอยู่</span>
                            </label>
                        </div>
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="status" className="radio checked:bg-[#C5B182]" />
                                <span className="text-sm text-[#73664B] px-3">ยกเลิกรายการ</span>
                            </label>
                        </div>
                    </div>
                </div>
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
                                                        ยืนยันการเพิ่มเมนูสำหรับขาย
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเพิ่มเมนูสำหรับขาย
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
                                                            ><Link href="/product/sell_all">
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




        </div >
    )
}

export default sell_add