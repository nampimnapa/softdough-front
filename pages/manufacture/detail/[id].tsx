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
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { CheckboxGroup, Checkbox, colors, Button } from "@nextui-org/react";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function detailproduction() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const openModal2 = () => {
        setIsOpen(true);
    };
    const handleCancel = () => {
        closeModal();
    };

    const [detail, setDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;
    const [isChecked, setIsChecked] = useState(true); // State to track checkbox status

    useEffect(() => {
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readone/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        console.error(data.message);
                        setLoading(false);
                    } else {
                        setDetail(data);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching production order:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const [message, setMessage] = useState('Loading');

    // ทำการสร้าง state ใหม่เพื่อเก็บสถานะการเลือกของ Checkbox สำหรับแต่ละรายการใน pdodetail
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox status
        console.log(isChecked)

        // สร้างอาร์เรย์ใหม่เพื่อเก็บสถานะของ Checkbox แต่ละอันในตาราง
        const newCheckedItems = {};
        detail.pdodetail.forEach(pdodetail => {
            newCheckedItems[pdodetail.id] = !isChecked;
        });
        setCheckedItems(newCheckedItems);
    };

    const handleCheckboxChangeDetail = (id) => {
        // เปลี่ยนสถานะของ Checkbox แต่ละอันในตาราง
        const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newCheckedItems);
    };
    const isCheckedForDetail = (id) => {
        return detail.pdo_status === '2' && checkedItems[id];
    };


    const handleStatusChange = async (id) => {

        // Check if pdo_status is '1', then only proceed with updating
        if (!isChecked && detail && detail.pdo_status === '1') {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/updatestatus/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === 200) {
                setMessage('Data update successfully');
                router.push('/product/all');
            } else {
                setMessage(responseData.message || 'Error occurred');
            }
        }

    };


    return (
        <div>
            <button className='my-3 mx-5 '>
                <Link href="/manufacture/listorder" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายการสั่งผลิต
                </Link>
            </button>
            <div>
                <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดใบสั่งผลิต</p>
                {detail !== null ? (
                    <div>
                        <p className={`text-base px-6 py-2 font-bold
                                    ${detail.pdo_status === '2' ? 'text-yellow-500' :
                                detail.pdo_status === '1' ? 'text-[#C5B182]' : ''
                            }`}>
                            {detail.pdo_status === '2' ? 'กำลังดำเนินการ' : detail.pdo_status === '1' ? 'สั่งผลิตแล้ว' : detail.pdo_status}
                        </p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">ใบสั่งผลิต : {detail.pdo_id_name}</p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">วันที่สั่งผลิต : {detail.updated_at}</p>

                        <div className="relative overflow-x-auto mx-6 mt-2">

                            <table className="w-full text-sm text-center text-gray-500 ">
                                <thead >
                                    <tr className="text-white  font-normal  bg-[#908362] ">
                                        <td scope="col" className="px-6 py-3">
                                            ประเภทสินค้า
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            สินค้า
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            จำนวน
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            การผลิต
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detail.pdodetail.map((pdodetail, idx) => (
                                        <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                            <td
                                                scope="row"
                                                className="px-6 py-1 whitespace-nowrap dark:text-white"
                                            >
                                                {pdodetail.pdc_name}
                                            </td>
                                            <td className="px-6 py-1">{pdodetail.pd_name}</td>

                                            <td className="px-6 py-1 h-10 ">
                                                {pdodetail.qty}
                                            </td>

                                            <td className={`text-sm px-6 py-2 
    ${detail.pdo_status === '3' ? 'text-green-500' :
                                                    detail.pdo_status === '1' ? 'text-[#C5B182]' : ''
                                                }`}>
                                                {pdodetail.status === '3' ? 'เสร็จสิ้นแล้ว' : pdodetail.status === '1' ? 'รอยืนยันดำเนินการ' : ''}
                                                {pdodetail.status === '2' && (
                                                    <Checkbox color="success"
                                                        onChange={() => handleCheckboxChangeDetail(pdodetail.id)}
                                                        checked={isCheckedForDetail(pdodetail.id)}
                                                    >
                                                    </Checkbox>
                                                )}
                                            </td>

                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {
                detail !== null ? (
                    <div>
                        {/* Render checkbox based on pdo_status */}
                        {detail.pdo_status === '1' && (
                            <div className="ml-6 mt-5">
                                <Checkbox radius="sm" color="warning" onChange={handleCheckboxChange} checked={isChecked}>
                                    ยืนยันการดำเนินการผลิต
                                </Checkbox>
                            </div>
                        )}
                        {/* {detail.pdo_status === '2' && (
                            <div className="ml-6 mt-5">
                                <Checkbox radius="sm" color="warning" onChange={handleCheckboxChange} checked={isChecked}>
                                    ยืนยันการผลิตสำเร็จ
                                </Checkbox>
                            </div>
                        )} */}
                        {detail.pdo_status === '2' && (
                            <div className="ml-6 mt-5">
                                <Checkbox radius="sm" color="warning" onClick={handleCheckboxChange} checked={isChecked}>
                                    Select All
                                </Checkbox>
                            </div>
                        )}

                        {/* Rest of your component */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }

            {
                detail !== null ? (
                    <div className="flex justify-start">
                        <div className="w-1/2  mt-10  flex justify-start " >

                            <Button
                                // href="/manufacture/listorder"
                                onClick={() => {
                                    if (isChecked) {
                                        // If isChecked is true, navigate without showing modal
                                        router.push('/manufacture/listorder');
                                    } else {
                                        // If isChecked is false, open modal
                                        openModal();
                                    }
                                }}
                                type="button"
                                className=" text-white bg-[#73664B]  focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-5">
                                เสร็จสิ้น</Button>


                            {detail !== null && detail.pdo_status === '1' && (
                                <div className="w-full flex justify-start">
                                    <Button onClick={openModal} type="button" className="ml-2 text-white bg-[#F2B461] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                                        แก้ไขใบสั่งผลิต
                                    </Button>
                                </div>
                            )}


                            {!isChecked && detail && detail.pdo_status === '1' && (
                                // Modal แสดงเมื่อ isChecked เป็น true และ detail.pdo_status เท่ากับ '2'
                                <div className="flex justify-start">
                                    <div className="w-1/2 mt-10 flex justify-start">
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
                                                                            ยืนยันการดำเนินการ
                                                                        </Dialog.Title>
                                                                        <div className="mt-2">
                                                                            <p className="text-sm text-[#73664B]">
                                                                                คุณต้องการยืนยันการดำเนินการใช่หรือไม่?
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex justify-end">
                                                                            <div className="inline-flex justify-end">
                                                                                <button
                                                                                    type="button"
                                                                                    className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                                    onClick={closeModal}
                                                                                >
                                                                                    ยกเลิก
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleStatusChange(id)}
                                                                                    type="button"
                                                                                    className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                                >
                                                                                    <Link href={`/manufacture/listorder`}>
                                                                                        ยืนยัน
                                                                                    </Link>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </Dialog.Panel>
                                                                </Transition.Child>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </Transition>
                                            )}
                                        </>
                                    </div>
                                </div>
                            )}
                            {isChecked && detail && detail.pdo_status === '1' && (
                                // Modal แสดงเมื่อ isChecked เป็น false และ detail.pdo_status เท่ากับ '2'
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
                                                                    ไปที่หน้าแก้ไขใบสั่งผลิต
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-[#73664B]">
                                                                        คุณต้องการไปที่หน้าแก้ไขใบสั่งผลิตหรือไม่
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
                                                                        // onClick={handleConfirm}
                                                                        ><Link href={`../editpdod/${id}`}>
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
                            )}
                        </div >
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div >
    );
}


export default detailproduction