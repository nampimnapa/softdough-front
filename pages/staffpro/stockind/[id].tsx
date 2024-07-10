// import React, { Fragment, useState } from "react";
// import Link from "next/link";
// import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import Datepicker from "react-tailwindcss-datepicker";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function detailall() {
//     const [isOpen, setIsOpen] = useState(false);

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const openModal = () => {
//         setIsOpen(true);
//     };
//     const ingredients =
//         [
//             {
//                 id: 1,
//                 name: 'ไข่ไก่',
//                 stock: 5,
//                 unit: 'แผง',
//                 min: 5,
//                 status: 'ปกติ',
//                 gramperunit: '650',
//                 unitgram: 'กรัม'
//             },

//         ]
//     const [categories, setCategories] = useState(ingredients);





//     return (
//         <div className='h-screen'>
//             <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบทั้งหมด
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดวัตถุดิบ</p>
//             {ingredients.map((ingredients) => (<div>
//                 <p className="text-sm px-6 py-2 text-[#73664B]">รายการ : {ingredients.name}</p>
//                 <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนการซื้อขั้นต่ำ : {ingredients.min}</p>
//                 <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยของวัตถุดิบ : {ingredients.unit}</p>
//                 <p className="text-sm px-6 py-2 text-[#73664B]">ปริมาณต่อหน่วย : {ingredients.gramperunit}</p>
//                 <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยปริมาณต่อหน่วย : {ingredients.unitgram}</p>
//             </div>
//             ))}

//             <div className="flex justify-start mt-3 " >
//                 <button>
//                     <Link href="/ingredients/edit"
//                         type="button"
//                         className="text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
//                         แก้ไขวัตถุดิบ</Link></button>
//                 <button type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
//                     <Link href="/ingredients/all">
//                     เสร็จสิ้น</Link></button>
//             </div>
//         </div>
//     )
// }


// export default detailall

import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function detailall() {
    const [isOpen, setIsOpen] = useState(false);

    const [ind, setIngredientall] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read/${id}`);
                const data = await response.json();
                setIngredientall(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    // const ingredients =
    //     [
    //         {
    //             id: 1,
    //             name: 'ไข่ไก่',
    //             stock: 5,
    //             unit: 'แผง',
    //             min: 5,
    //             status: 'ปกติ',
    //             gramperunit: '650',
    //             unitgram: 'กรัม'
    //         },

    //     ]
    // const [categories, setCategories] = useState(ingredients);





    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบทั้งหมด
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>รายละเอียดวัตถุดิบ</p>
            {ind !== null ? (
                <div>
                    <div>
                        <p className="text-sm px-6 py-2 text-[#73664B]">รายการ : {ind.ind_name}</p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">จำนวนการซื้อขั้นต่ำ : {ind.qtyminimum}</p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยของวัตถุดิบ : {ind.un_purchased_name}</p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">ปริมาณต่อหน่วย : {ind.qty_per_unit}</p>
                        <p className="text-sm px-6 py-2 text-[#73664B]">หน่วยปริมาณต่อหน่วย : {ind.un_ind_name}</p>
                    </div>


                    <div className="mt-5 mr-2" >
                        {/* <button className="mr-2 ">
                            <Link href={`./edit/${ind.ind_id}`}
                                type="button"
                                className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                                แก้ไขวัตถุดิบ</Link></button> */}

                        <button className="  ml-5 text-white bg-[#73664B] focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                            <Link href="./stockind">
                                เสร็จสิ้น</Link></button>
                    </div></div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}


export default detailall