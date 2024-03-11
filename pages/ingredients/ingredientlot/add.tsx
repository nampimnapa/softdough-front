import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
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
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/router";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


function add() {
    const router = useRouter();
    const { id } = router.query;
    const [message, setMessage] = useState('Loading');
    const [pendingData, setPendingData] = useState<FormData[]>([]);
    // const [addedIngredients, setAddedIngredients] = useState<FormData[]>([]);
    const [ingredientOptions, setUnitOptions] = useState([]);
    const [formData, setFormData] = useState<FormData>({
        indlde_id: '',
        ind_id: '',
        indl_id: id ? id as string : '', // Only set if id exists
        qtypurchased: 0,
        date_exp: '',
        price: 0,
        ind_name: ''
    });


    interface IngredientType {

        ind_id: string,
        ind_name: string,
        un_purchased: string,
        qtyminimum: number,
        un_ind: string,
        qty_per_unit: number,
        status: string
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    interface FormData {
        indlde_id: string,
        ind_id: string,
        indl_id: string,
        qtypurchased: number,
        date_exp: string,
        price: number
        ind_name: string
    }

    useEffect(() => {
        fetch('http://localhost:8080/ingredient/read')
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const [ind_id, ind_name] = value.split(':');

        setFormData(prevData => ({
            ...prevData,
            ind_id,
            ind_name
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // เพิ่มข้อมูลลงใน pendingData
        setPendingData(prevData => [...prevData, formData]);

        // รีเซ็ตฟอร์มหลังจากเพิ่มข้อมูล
        setFormData({
            indlde_id: '',
            ind_id: '',
            indl_id: id ? id as string : '',
            qtypurchased: 0,
            date_exp: '',
            price: 0,
            ind_name: ''
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    // const ingredients = {
    //     name: [
    //         "แป้ง",
    //         "น้ำตาล",
    //         "นม",
    //         "เนย"]
    // }
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    const [addedIngredients, setAddedIngredients] = useState([]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // ตรวจสอบว่า e.target และ e.target.price มีค่าหรือไม่
    //     const priceValue = e.target.price ? e.target.price.value : null;

    //     // ตัวอย่าง: นำข้อมูลที่กรอกใน form ไปเก็บไว้ใน state
    //     const ingredientData = {
    //         name: e.target.ingredients.value,
    //         quantity: e.target.count.value,
    //         exp: value.startDate,  // ใช้ค่าจาก datepicker
    //         price: priceValue,  // ใช้ค่าจากตรวจสอบ e.target.price
    //     };

    //     setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientData]);
    // };
    const handleDeleteIngredient = (index) => {
        setAddedIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };
    const handleDeletePendingData = (indexToDelete: number) => {
        setPendingData(prevData => prevData.filter((_, index) => index !== indexToDelete));
    };

    const handleSaveToDatabase = async () => {
        try {
            const response = await fetch(`http://localhost:8080/ingredient/addLotIngrediantnew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pendingData),
            });

            const responseData = await response.json();

            if (responseData.message === 'success') {
                setMessage('Data added successfully');
                setPendingData([]);  // รีเซ็ต pendingData หลังจากเพิ่มข้อมูลสำเร็จ
            } else {
                setMessage(responseData.message || 'Error occurred');
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error occurred');
        }
    };


    return (
        <div className="h-screen">
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>เพิ่มวัตถุดิบเข้าร้าน</p>
            <p className="text-m px-6 py-2 text-[#73664B]">รายละเอียดวัตถุดิบที่เพิ่ม</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6">

                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
                        <select id="ingredients"
                            className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6"

                            name="ind_id"
                            value={`${formData.ind_id}:${formData.ind_name}`}  // ใช้ `:` เป็นตัวแยกระหว่าง ind_id และ ind_name
                            onChange={handleSelectChange}
                        >
                            <option value="">เลือกวัตถุดิบ  </option>
                            {ingredientOptions.map((ind: IngredientType) => (
                                <option key={ind.ind_id} value={`${ind.ind_id}:${ind.ind_name}`}>
                                    {ind.ind_name}
                                </option>
                            ))}
                        </select>
                    </p>
                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">จำนวน :
                        <input
                            min="0"
                            // onChange={handleCancelClick}
                            type="number"
                            name="qtypurchased"
                            value={formData.qtypurchased}
                            onChange={handleInputChange}
                            id="count"
                            className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                        /></p>
                    <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                        <p>วันหมดอายุ: </p>
                        <input
                            type="date"
                            name="date_exp"
                            value={formData.date_exp}
                            onChange={handleInputChange}
                        />

                        {/* <Datepicker
                            useRange={false}
                            asSingle={true}
                            name="date_exp"
                            value={formData.date_exp}
                            onChange={handleInputChange}
                        /> */}
                    </div>
                    <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
                        min="0"
                        // onChange={handleCancelClick}
                        type="number"
                        pattern="[0-9]+([.,][0-9]+)?"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        id="price"
                        className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                    /></p>
                    <input
                        type="submit"
                        value="เพิ่มวัตถุดิบ"
                        className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 scale-75 w-1/2" />
                </div >
            </form>

            {pendingData.map((data, index) => (
                <div key={index} className="grid grid-cols-6 text-sm px-6 py-2 text-[#73664B]">
                    <p className="">วัตถุดิบ:  {data.ind_name}</p>
                    <p className="px-2 ">จำนวน:  {data.qtypurchased}</p>
                    <p className="col-span-2 px-2 ">วันหมดอายุ:  {data.date_exp}</p>
                    <p className="px-2 " >ราคา:  {data.price}</p>
                    <p className="px-2 ">
                        <button onClick={() => handleDeletePendingData(index)}>
                            <TrashIcon className="h-5 w-5 text-red-500" /></button>
                    </p>
                </div>
            ))}

            < div className="flex justify-between  mt-8 " >
                <button>
                    <Link href="./ingredientlot/"
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                        ย้อนกลับ</Link></button>
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
                                                    ยืนยันการเพิ่มวัตถุดิบ
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการเพิ่มวัตถุดิบหรือไม่
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
                                                            onClick={handleSaveToDatabase}
                                                        ><Link href="/ingredients/ingredientlot">
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
                <button onClick={openModal} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
            </div >

        </div>

    )
}

export default add