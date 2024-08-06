// import React, { Fragment, useState } from "react";
// import Link from "next/link";
// import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function detail() {
//     const [ingrelot, setIngrelot] = useState([
//         {
//             lotno: "LOT01",
//             date: '10/10/2555',
//             ingre: [
//                 {
//                     name: 'แป้ง',
//                     count: "2",
//                     unit: "ถุง",
//                     exp: "10/10/2556",
//                     price: '500'
//                 },
//                 {
//                     name: 'น้ำตาล',
//                     count: "2",
//                     unit: "ถุง",
//                     exp: "10/10/2556",
//                     price: '100'
//                 }
//             ],
//         },
//     ]);

//     return (
//         <div className='h-screen'>
//             <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบเข้าร้าน
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดวัตถุดิบเข้าร้าน</p>
//             {ingrelot.map((lot, idx) => (
//                 <div key={idx}>
//                     <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {lot.lotno}</p>
//                     <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {lot.date}</p>
//                     {lot.ingre.map((ingredient, Idx) => (
//                         <Fragment key={Idx}>
//                             <div className="grid grid-cols-8">
//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ : {ingredient.name}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B]">จำนวน : {ingredient.count} {ingredient.unit}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.exp}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p></div>
//                         </Fragment>
//                     ))}
//                 </div>
//             ))}
//             <div className="flex justify-end  mt-5" >
//                 <button type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
//                     <Link href="/ingredients/income/all">
//                         เสร็จสิ้น</Link></button>
//             </div>
//         </div>
//     );
// }

// export default detail

import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import ingreincome from "../all";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Detail() {
   
    const [ind, setIngredientLot] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [indde, setIngredientsde] = useState<any[]>([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlot/${id}`);
                const data = await response.json();
                setIngredientLot(data); 
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/ingredientLotDetails/${id}`)
                .then(response => response.json())
                .then(data => {
                    setIngredientsde(data.data);
                })
                .catch(error => {
                    console.error('Error fetching ingredient details:', error);
                });
        }
        fetchData();
    }, [id]);

    console.log(indde);

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>รายละเอียดวัตถุดิบเข้าร้าน</p>
            {ind !== null ? (
                <div>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {ind.indl_id_name}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {ind.created_at}</p>
                    {indde.map((ingredient, Idx) => (
                        <Fragment key={Idx}>
                            <div className="grid grid-cols-8">
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ : {ingredient.ind_name}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">จำนวน : {ingredient.qtypurchased}
                                    {/* {ingredient.unit} หน่วยยังไม่ทำ  */}
                                </p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.date_exp}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p></div>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="mx-5 justify-start  mt-5" >
                <button type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    <Link href="/ingredients/income/all">
                        เสร็จสิ้น</Link></button>
            </div>
        </div>
    );
}

export default Detail