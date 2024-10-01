import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { Dialog, Transition } from '@headlessui/react';
import Head from 'next/head';

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

interface IngredientData {
    id: string;
    checkk: string;
    created_at: string;
    note?: string;
    name?: string;
    status: string;
    indU_id: string;
}

function Approve() {
    const [ind, setIngredientAll] = useState<IngredientData[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [message, setMessage] = useState('Loading');

    const router = useRouter();
    const { id } = router.query;

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (id: string) => {
        setSelectedId(id);
        setIsOpen(true);
    };

    const openModal2 = () => {
        setIsOpen2(true);
    };

    const closeModal2 = () => {
        setIsOpen2(false);
    };

    const handleCancel = () => {
        closeModal();
    };

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/usedIngredients`)
            .then((response) => response.json())
            .then((data: IngredientData[]) => {
                console.log(data);
                setIngredientAll(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const filteredProduction = ind.filter((data) => data.status === "1");

    const handleStatusChange = async () => {
        if (!selectedId) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/updateStatus/${selectedId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const responseData = await response.json();
        console.log(selectedId);

        if (responseData.status === 200) {
            setMessage('Data update successfully');
            setIngredientAll((prevInd) =>
                prevInd.map((item) => (item.indU_id === selectedId ? { ...item, status: "2" } : item))
            );
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
        closeModal();
    };

    return (
        <div>
            <Head>
                <title>รออนุมัติ - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>รออนุมัติ</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required />
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border  hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
            </div>
            <div className="w-full">
                <div className="flex w-full flex-col">
                    <div className="relative overflow-x-auto mx-4">
                        <table className="w-full text-sm text-center table-fixed">
                            <thead>
                                <tr className="text-white  font-normal  bg-[#908362]  ">
                                    <td scope="col" className="px-3 py-3 w-64">
                                        ล็อตสินค้า
                                    </td>
                                    <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                        วันที่ทำรายการ
                                    </td>
                                    <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                        รายการที่ใช้
                                    </td>
                                    <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                        รายละเอียด
                                    </td>
                                    <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                        อนุมัติวัตถุดิบที่ใช้
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProduction.map((data, idx) => (
                                    <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                        <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                            {data.checkk === "production" ? data.id : null}
                                        </td>
                                        <td className=" py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                            {data.created_at}
                                        </td>
                                        <td className="ms-7 py-1  text-center text-[#73664B] whitespace-nowrap overflow-hidden">
                                            {data.checkk === "other" ? data.note : data.name}
                                        </td>
                                        <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                            <button type="submit" className="w-full flex justify-center items-center" >
                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
                                            </button>
                                        </td>
                                        <td className="px-12 py-1 whitespace-nowrap overflow-hidden flex justify-center ">
                                            <Button className="mr-2 bg-red-500 text-white" size="sm">ยกเลิก</Button>
                                            <Button size="sm" className="bg-green-500 text-white"
                                                onClick={() => openModal(data.id)}
                                            >ยืนยัน</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-start">
                <div className="w-1/2 mt-10 flex justify-start">
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
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B]"
                                                    >
                                                        ยืนยันวัตถุดิบที่ใช้
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการยืนยันวัตถุดิบที่ใช้ใช่หรือไม่?
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
                                                                onClick={handleStatusChange}
                                                                type="button"
                                                                className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            >
                                                                <Link href={`/ingredients/approve`}>
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
        </div>
    );
}

export default Approve;