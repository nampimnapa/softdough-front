import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Edit() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        setIsOpenCencel(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    // // สมมุติ อฟ ส่งข้อมูลมา
    // const ingredientsData =
    // {
    //     id: 1,
    //     name: 'ไข่ไก่',
    //     stock: 5,
    //     unit: 'แผง',
    //     min: 5,
    //     status: 'ปกติ',
    //     gramperunit: '650',
    //     unitgram: 'กรัม'
    // }

    // const [formIn, setformIn] = useState({
    //     name: '',
    //     stock: '',
    //     min: '',
    //     pw: '',
    //     depart: '',
    // });

    // const formInsave = {
    //     nameIn,
    //     stockIn,
    //     unitIn,
    //     minIn,
    //     statusIn,
    //     gramperunitIn,
    //     unitgramIn
    // }



    // const handleCancelClick = (index) => {
    //     const updatedIngredientsData = [...ingredientsData];
    //     updatedIngredientsData[index] = { ...formIn };
    //     console.log("Updated Ingredients Data =>", updatedIngredientsData);

    //     setformIn({
    //         name: '',
    //         username: '',
    //         tel: '',
    //         pw: '',
    //         depart: ''
    //     });

    //     setnameIn('');
    //     setstockIn('');
    //     setunitIn('');
    //     setminIn('');
    //     setstatusIn('');
    //     setgramperunitIn('');
    //     setunitgramIn('');
    // };


    // const [ingredients, setIngredient] = useState(ingredientsData);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setIngredient((prevFormIn) => ({
    //         ...prevFormIn,
    //         [name]: value,
    //     }));
    // }

    // console.log(ingredients);
    const router = useRouter();
    const { id } = router.query;
    const [unitOptions, setUnitOptions] = useState([]);
    const [ind, setInd] = useState({
        // ind_id:0,
        ind_name: '',
        un_purchased: '',
        un_purchased_name: '',
        un_ind: 0,
        un_ind_name: 0,
        qtyminimum: 0,
        qty_per_unit: 0,
    });
    const [indOld, setIndOld] = useState({
        ind_name: '',
        un_purchased: '',
        un_purchased_name: '',
        un_ind: 0,
        un_ind_name: 0,
        qtyminimum: 0,
        qty_per_unit: 0,
    })
    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    const [loading, setLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const MySwal = withReactContent(Swal);
    const [isOpenCencel, setIsOpenCencel] = useState(false);

    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        // Fetch ingredient data
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setInd(data);
                setIndOld(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });

        // Fetch unit data
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, [id]);

    // New useEffect for logging
    useEffect(() => {
        if (ind) {
            console.log("Ind state:", ind.ind_name, ind.qty_per_unit, ind.qtyminimum, ind.un_ind, ind.un_ind_name, ind.un_purchased, ind.un_purchased_name);
            console.log('hello');
        }
    }, [ind]);

    function deepEqual(obj1: any, obj2: any) {
        if (obj1 === obj2) return true;

        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }
    useEffect(() => {
        const areEqual = deepEqual(ind, indOld);
        setIsDisabled(areEqual);
    }, [ind, indOld]);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     // const { name, value } = e.target;

    //     // ตรวจสอบว่าเมื่อแปลงค่าจาก input หรือ select ควรจะเป็นตัวเลขหรือไม่
    //     // const newValue = (name === 'qtyminimum' || name === 'qty_per_unit') ? Number(value) : value;

    //     setInd((prevValues) => ({
    //         ...prevValues
    //     }));
    // };
    const handleUpdateClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ind),
            });

            const responseData = await response.json();

            if (responseData.message === "Ingredient updated successfully") {
                console.log(responseData.message);
                Toast.fire({
                    icon: "success",
                    title: <p style={{ fontFamily: 'kanit' }}>แก้ไขข้อมูลวัตถุดิบสำเร็จ</p>
                });
            } else {
                console.error('Update failed:', responseData);
                Toast.fire({
                    icon: "error",
                    title: <p style={{ fontFamily: 'kanit' }}>แก้ไขข้อมูลวัตถุดิบไม่สำเร็จ</p>
                });
            }
        } catch (error) {
            console.error('Error updating staff data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInd((prevFormIn) => ({
            ...prevFormIn,
            [name]: value,
        }));
    }

    // เช็คการกดย้อนกลับ ว่าค่าเหมือนเดิมมั้ย ถ้าไม่จะขึ้นแจ้งว่า จะบันทึกก่อนไปมั้ย
    const checkCencel = () => {
        if (isDisabled || deepEqual(ind, indOld)) { // ถ้าค่าไม่เปลี่ยน จะกลับได้เลย
            router.push('/ingredients/all');
        } else { // ถ้าเปลี่ยน จะขึ้น Modal
            setIsOpenCencel(true);
        }
    };
    const noSave = () => {
        router.push('/ingredients/all');
    }


    return (
        <div className='h-screen' >
            <Head>
                <title>เมนูสำหรับขาย - Softdough</title>
            </Head>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/detailall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายละเอียดวัตถุดิบ
                </Link>
            </button>

            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขวัตถุดิบ</p>
            <form className="mt-5 w-1/2 key={index} ">
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        รายการ :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            type="text"
                            name="ind_name"
                            id="name"
                            autoComplete="off"
                            // placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-1  sm:text-sm sm:leading-6 focus:outline-none"
                            value={ind.ind_name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        จำนวนการซื้อขั้นต่ำ :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            min={1}
                            type="number"
                            name="qtyminimum"
                            id="min"
                            autoComplete="family-name"
                            // placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-1  sm:text-sm sm:leading-6 focus:outline-none"
                            value={ind.qtyminimum}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                // ป้องกันการกดปุ่ม - และ + และ 0 เมื่อไม่มีตัวเลขอื่นนำอยู่
                                if (e.key === '-' || e.key === '+' || e.key === 'e' || (e.key === '0' && !e.currentTarget.value)) {
                                    e.preventDefault();
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        หน่วยของวัตถุดิบ :</label>
                    <div className="mt-2 col-span-2">
                        <select id="countries"
                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                            value={ind.un_ind}
                            name="un_purchased_name"
                            onChange={handleInputChange}
                        >
                            {/* <option value={ind.un_purchased_name} > </option> */}

                            {unitOptions.map((unit: UnitType) => (
                                <option key={unit.un_id} value={unit.un_id}>
                                    {unit.un_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        ปริมาณต่อหน่วย :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            value={ind.qty_per_unit}
                            type="number"
                            name="qty_per_unit"
                            id="min"
                            autoComplete="family-name"
                            // placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-1  sm:text-sm sm:leading-6 focus:outline-none"
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                // ป้องกันการกดปุ่ม - และ + และ 0 เมื่อไม่มีตัวเลขอื่นนำอยู่
                                if (e.key === '-' || e.key === '+' || e.key === 'e' || (e.key === '0' && !e.currentTarget.value)) {
                                    e.preventDefault();
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        หน่วยปริมาณต่อหน่วย :</label>
                    <div className="mt-2 col-span-2">
                        <select id="countries"
                            name="un_ind_name"
                            className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm    sm:text-sm sm:leading-6 pl-2"
                            value={ind.un_ind}
                            onChange={handleInputChange}

                        >
                            <option value="">{ind.un_ind_name}  </option>
                            {unitOptions.map((unit: UnitType) => (
                                <option key={unit.un_id} value={unit.un_id}>
                                    {unit.un_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>

            < div className="  mt-10 " >
                <button
                    type="button"
                    onClick={checkCencel}
                    className="mr-2 mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                    ยกเลิก</button>

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
                                                    ยืนยันการแก้ไขวัตถุดิบ
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการแก้ไขวัตถุดิบหรือไม่
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
                                                            onClick={handleUpdateClick}
                                                        ><Link href={`/ingredients/${id}`}>
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


                    {isOpenCencel && (
                        <Transition appear show={isOpenCencel} as={Fragment}>
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
                                            <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${kanit.className}`}>
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-[73664B]"
                                                >
                                                    คุณต้องการบันทึกการแก้ไขใหม่นี้หรือไม่
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        การแก้ไขของคุณยังไม่ได้รับการบันทึก คุณต้องการออกหรือไม่
                                                    </p>
                                                </div>
                                                {/*  choose */}
                                                <div className="flex justify-between mt-2">
                                                    <button
                                                        type="button"
                                                        className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#fee2e2] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={noSave}
                                                    >
                                                        ไม่บันทึก
                                                    </button>
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
                                                            onClick={handleUpdateClick}>
                                                            บันทึก</button>
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
                <button onClick={openModal} disabled={isDisabled} type="button" className={`ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#73664B]'}`}>บันทึก</button>
            </div >

        </div >
    )
}

export default Edit;