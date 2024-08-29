import React, { Fragment, useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Button, Input, RadioGroup, Radio } from "@nextui-org/react";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Transition } from '@headlessui/react';
import { Tabs, Tab, } from "@nextui-org/react";
import { Spinner, useDisclosure, Image } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { XMarkIcon } from '@heroicons/react/24/outline'
import {
    PencilSquareIcon,
    ChartPieIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CubeIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    QueueListIcon,
    UserCircleIcon, MagnifyingGlassIcon, TrashIcon

} from "@heroicons/react/24/outline";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function pos() {
    const router = useRouter();
    const { id } = router.query;
    const [Sale, setSale] = useState([]);
    const [Promotion, setPromotion] = useState([]);

    const [typesellmenufix, setTypesellmenufix] = useState([]);
    const [typesellmenumix, setTypesellmenumix] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [selectedPromotionfree, setSelectedPromotionfree] = useState(null);
    const [hasFreeItems, setHasFreeItems] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        setSelectedSale(null);

    };

    const handleCancel = () => {
        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };
    interface Promotion {
        dc_name: string,
        dc_diccountprice: number,

    }
    interface Sale {
        sm_id: number,
        sm_name: String,
        sm_price: number,
        smt_id: number,
    }

    const handleAddToCart = () => {
        if (selectedSale) {
            const newItem = {
                ...selectedSale,
                quantity: quantity    // You can replace '1' with any quantity logic if needed
            };
            setSelectedItems((prevItems) => [...prevItems, newItem]);
            closeModal();
        }
    };


    const handleRemoveItem = (index) => {
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis`)
            .then(response => response.json())
            .then(data2 => {
                setTypesellmenufix(data2);
                setTypesellmenumix(data2);
                // console.log(data2);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis`)
            .then(response => response.json())
            .then(promo => {
                setPromotion(promo);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfree`)
            .then(response => response.json())
            .then(promofree => {
                setSelectedPromotionfree(promofree);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });


    }, [id, setSale]);
    const [open, setOpen] = useState(true)

    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensure quantity doesn't go below 1
    };


    const handleIncreaseQuantity = (id) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item) =>
                item.sm_id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item) =>
                item.sm_id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };
    const calculateTotalPrice = () => {
        const totalPrice = selectedItems.reduce((total, item) => total + item.sm_price * item.quantity, 0);
        const discount = selectedPromotion ? selectedPromotion.dc_diccountprice : 0;
        return totalPrice - discount;
    };
    const calculateTotalPriceBeforeDiscount = (selectedItems) => {
        return selectedItems.reduce((total, item) => total + item.sm_price * item.quantity, 0);
    };

    const filteredSales = Sale.filter((sale) => sale.smt_id === 4);

    // ส่วน promotion ส่วนลด
    const handlePromotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPromoName = event.target.value;
        const selectedPromo = Promotion.find(promo => promo.dc_name === selectedPromoName);
        setSelectedPromotion(selectedPromo || null);
    };

    const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);

    const handleSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSaleId(event.target.value);
    };


    const selectedSaleName = filteredSales.find(sale => sale.sm_id.toString() === selectedSaleId)?.sm_name;

    // Check if selectedPromotion is defined and has details
    // Function to get the free item names for a given saleId
    const getFreeItemNames = (saleId) => {
        if (!selectedPromotionfree || !selectedPromotionfree.length) {
            return [];
        }

        // Flatten the details and filter by the saleId
        const freeItems = selectedPromotionfree.flatMap(promotion =>
            promotion.detail
        ).filter(detail => detail.smbuy_id === saleId);

        // Return an array of free item names
        return freeItems.map(item => item.smfree_id);
    };

    // Check if promotion is available based on free items
    const isPromotionAvailable = (saleId) => {
        const freeItemIds = getFreeItemNames(saleId); // Get free item ids for the given saleId

        // Check if there are any free items available for this saleId
        return freeItemIds.length > 0;
    };
    const getFreeItemIds = () => {
        if (!selectedPromotionfree || !selectedPromotionfree.length) {
            return [];
        }

        // Flatten the details and extract smfree_id
        return selectedPromotionfree.flatMap(promotion =>
            promotion.detail.map(detail => detail.smfree_id)
        );
    };

    const freeItemIds = getFreeItemIds();

    const isRadioDisabled = (sm_id) => {
        // Check if the current sm_id is in the list of free item IDs
        return !freeItemIds.includes(sm_id);
    };



    const openModal = (sale) => {
        setIsOpen(true);
        setSelectedSale(sale);
        setQuantity(1); // Reset quantity to 1 whenever a new item is selected
        console.log('Clicked Sale:', sale);
        const freeItemName = getFreeItemNames(sale.sm_id);
        console.log('Free Item Name:', freeItemName);
    };

    // ฟังก์ชันเปิด modal
    // const openModal = (sale) => {
    //     if (isPromotionAvailable(sale.sm_id)) {
    //         setIsOpen(true);
    //         setSelectedSale(sale);
    //         setQuantity(1); // Reset quantity to 1 whenever a new item is selected
    //     } else {
    //         alert("This item does not have any promotions.");
    //     }
    // };


    return (
        <div className={kanit.className}>
            <div className="flex flex-col  h-screen">
                {/* nav ส่วนบน */}
                <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border border-b-[#C5B182] border-b-1">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <UserCircleIcon className="h-6 w-6 text-[#73664B] justify-end" />
                            <span className="text-[#73664B] pl-2">นายฉันทกร อุดรพันธ์</span>
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-user"
                        >
                            <ul className="flex flex-col font-medium p-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-white rounded md:bg-transparent md:text-[#73664B] md:p-0"
                                        aria-current="page"
                                    >
                                        ซอฟโดว์ แอดมิน
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className="flex flex-grow bg-white w-full overflow-hidden">
                    {/* Left Content */}
                    <div className="flex-grow overflow-y-auto p-4">
                        {/* Content that can scroll independently */}
                        <div>
                            <p className='text-[#F2B461] font-medium m-1'>ทำรายการขาย</p>
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

                            </div>
                            <div className="w-full">
                                <div className="flex w-full flex-col">
                                    <Tabs
                                        aria-label="Options"
                                        color="primary"
                                        variant="underlined"
                                        classNames={{
                                            tabList: "gap-6 w-full relative rounded-none p-0 mx-2 border-b-1 border-b-[#E3D8BF]",
                                            cursor: "w-full bg-[#73664B]",
                                            tab: "max-w-fit px-0 h-12",
                                            tabContent: "group-data-[selected=true]:text-[#73664B]"
                                        }}
                                    >
                                        {/* Tab 1 */}
                                        <Tab
                                            key="product"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>สินค้า</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1">
                                                <div className="relative overflow-x-auto ">
                                                    {statusLoading ? (
                                                        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                                                            {Sale && Sale.length > 0 ? (
                                                                Sale.map((sale, index) => (
                                                                    <Card key={index}
                                                                        onClick={() => openModal(sale)}
                                                                        shadow="sm" isPressable onPress={() => console.log("item pressed")}
                                                                        className="card w-40 max-w-xs  bg-base-100 shadow-md mx-2 h-48 ml-1 mb-4 ">
                                                                        <CardBody className="overflow-visible p-0">
                                                                            <Image
                                                                                // shadow="sm"
                                                                                // radius="lg"
                                                                                width="100%"
                                                                                alt={sale.picture}
                                                                                className="w-full object-cover h-[140px]"
                                                                                src={sale.picture}
                                                                            />
                                                                        </CardBody>
                                                                        <CardFooter className="text-small justify-between">
                                                                            <p className='text-[#73664B]'>{sale.sm_name}</p>
                                                                            <p className=" text-[#F2B461]">{sale.sm_price} บาท</p>

                                                                        </CardFooter>
                                                                    </Card>

                                                                ))
                                                            ) : (
                                                                <div className="flex justify-center items-center w-full">
                                                                    <p className="text-sm text-gray-400">ไม่มีข้อมูล</p>
                                                                </div>
                                                            )}

                                                        </div>
                                                    ) : (
                                                        <Spinner label="Loading..." color="warning" className="flex justify-center m-60" />
                                                    )}
                                                </div>
                                            </div>
                                        </Tab>
                                        {/* tab2 */}
                                        {/* Tab Menu */}
                                        <Tab
                                            key="promotion"
                                            title={
                                                <div className="flex items-center space-x-2">
                                                    <span>โปรโมชัน</span>
                                                </div>
                                            }
                                        >
                                            <div className="second-tab-layout mx-1">
                                                <div className="relative overflow-x-auto ">
                                                    <table className="w-full text-sm text-center text-gray-500">
                                                        <thead className="">
                                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                                <td scope="col" className="px-6 py-3 ">
                                                                    วันที่ผลิต
                                                                </td>
                                                                <td scope="col" className="px-12 py-3 ">
                                                                    ใบสั่งผลิต
                                                                </td>
                                                                <td scope="col" className="px-6 py-3">
                                                                    รายละเอียด
                                                                </td>
                                                                <td scope="col" className="px-6 py-3">
                                                                    อนุมัติดำเนินการผลิต
                                                                </td>
                                                            </tr>
                                                        </thead>

                                                    </table>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            {/* Repeat or add more content to make the left section scrollable */}
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>

                    {/* Right Order Panel */}
                    <div className="relative w-screen max-w-sm h-full overflow-hidden border-l-1">
                        <div className="pointer-events-auto h-full w-full transform transition duration-500 ease-in-out bg-white shadow-xl">
                            <div className="flex h-full flex-col overflow-y-scroll">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <p className="text-lg font-medium text-[#73664B]">คำสั่งซื้อ</p>
                                    </div>
                                    <div className="flex items-start justify-between mt-2">
                                        <p className="font-normal text-[#73664B]">วันที่</p>
                                    </div>
                                    <div className="flex items-start justify-between mt-2 ">
                                        <select
                                            id="countries"
                                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                            name="sell"
                                        >
                                            <option>ขายหน้าร้าน</option>
                                            <option>เดลิเวอรี่</option>
                                        </select>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {selectedItems.map((product, index) => (

                                                    <li key={index} className="flex py-6">
                                                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                alt={product.picture}
                                                                src={product.picture}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <p>
                                                                        <a href={product.href}>{product.sm_name}</a>
                                                                    </p>
                                                                    <p className="ml-4">{product.sm_price * product.quantity} บาท</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500"> {selectedSaleName ? `x ${selectedSaleName}` : 'x ดิป'}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm ">
                                                                <p className="text-gray-500">จำนวน </p>
                                                                <div className="flex items-center w-3/5">
                                                                    <button
                                                                        onClick={() => handleDecreaseQuantity(product.sm_id)}

                                                                        className="btn btn-square bg-[#D9CAA7] btn-xs"
                                                                    >
                                                                        <svg
                                                                            className="text-[#73664B]"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="1em"
                                                                            height="1em"
                                                                            viewBox="0 0 256 256"
                                                                        >
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                    <span className="w-4 text-center mx-2">{product.quantity}</span>
                                                                    <button
                                                                        onClick={() => handleIncreaseQuantity(product.sm_id)}

                                                                        className="btn btn-square bg-[#D9CAA7] btn-xs"

                                                                    >
                                                                        <svg
                                                                            className="text-[#73664B]"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="1em"
                                                                            height="1em"
                                                                            viewBox="0 0 256 256"
                                                                        >
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"
                                                                            />
                                                                        </svg>
                                                                    </button>



                                                                </div>
                                                                <div className="flex">
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium "
                                                                        onClick={() => handleRemoveItem(index)}

                                                                    >
                                                                        <TrashIcon className="h-5 w-5 text-red-500" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 pb-3 sm:px-6">
                                    <div className="flex items-start justify-between my-3">
                                        <select
                                            id="countries"
                                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                            name="sell"
                                            onChange={handlePromotionChange}

                                        >
                                            <option value="">เลือกโปรโมชัน</option>
                                            {Promotion.map((promotion, index) => (
                                                <option key={index} value={promotion.dc_name}>
                                                    {promotion.dc_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-between text-sm   text-[#73664B]">
                                        <p>ยอดรวม</p>
                                        <p>{calculateTotalPriceBeforeDiscount(selectedItems).toFixed(2)} บาท</p>
                                    </div>
                                    <div className="flex justify-between text-sm  text-[#73664B]">
                                        <p>ส่วนลด</p>
                                        <p>- {selectedPromotion ? selectedPromotion.dc_diccountprice.toFixed(2) : '0.00'} บาท</p>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>รวมสุทธิ</p>
                                        <p>{calculateTotalPrice().toFixed(2)} บาท</p>
                                    </div>
                                    <div className="mt-6">
                                        <Button
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-[#73664B] px-6 py-3 text-base font-medium text-white shadow-sm w-full"
                                        >
                                            ยืนยัน
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <div className="flex justify-start"> */}
            <div className="w-1/2  mt-10  flex justify-start " >

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
                                                {/* <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-[73664B]"
                                                >
                                                    {selectedSale.sm_name}
                                                </Dialog.Title> */}
                                                <div className='flex'>
                                                    <Card shadow="sm" >
                                                        <CardBody className="overflow-visible p-0">
                                                            <Image
                                                                shadow="sm"
                                                                radius="lg"
                                                                width={200}

                                                                src={selectedSale.picture}
                                                                className=" object-cover h-[140px]"
                                                            />
                                                        </CardBody>
                                                        <CardFooter className="text-small justify-between">
                                                            <p className='text-[#73664B]'>{selectedSale.sm_name}</p>
                                                            <p className=" text-[#F2B461]">{selectedSale.sm_price}</p>
                                                        </CardFooter>
                                                    </Card>


                                                    <div className="ml-6">
                                                        <p className="text-lg text-[#73664B] font-medium">
                                                            ดิปซอส <span className='text-sm text-[#73664B] font-normal'>เลือกได้ 1 รสชาติ</span>
                                                        </p>
                                                        {/* ต้อง fetch มา เมนูสำหรับขาย ไทป์ดิป 4 */}
                                                        <RadioGroup

                                                            value={selectedSaleId}
                                                            onChange={handleSaleChange}>
                                                            {filteredSales.map((sale) => (

                                                                <Radio
                                                                isDisabled={isRadioDisabled(sale.sm_id)}
                                                                key={sale.sm_id}
                                                                    value={sale.sm_id.toString()}
                                                                >
                                                                    {sale.sm_name}
                                                                </Radio>

                                                            ))}
                                                        </RadioGroup>
                                                        <div>
                                                            <p className="text-lg text-[#73664B] font-medium mt-2">จำนวน</p>

                                                            <button
                                                                onClick={decrementQuantity}

                                                                className="mt-2 btn btn-square bg-[#D9CAA7] btn-xs "
                                                            >
                                                                <svg
                                                                    className="text-[#73664B]"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 256 256"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <span className="w-4 text-center mx-2">{quantity}</span>
                                                            <button
                                                                onClick={incrementQuantity}

                                                                className="btn btn-square bg-[#D9CAA7] btn-xs"

                                                            >
                                                                <svg
                                                                    className="text-[#73664B]"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 256 256"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"
                                                                    />
                                                                </svg>
                                                            </button></div>
                                                    </div>
                                                </div>
                                                {/*  choose */}
                                                <div className="flex justify-end mt-5">
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
                                                            onClick={handleAddToCart}
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
            </div >
        </div>

        // </div>


    )
}

export default pos