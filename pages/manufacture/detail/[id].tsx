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

function detailproduction() {

    const [ind, setIngredientLot] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState<any[]>([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readone/${id}`);
                const data = await response.json();
                setDetail(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

    }, [id]);

    return (
        <div><button className='my-3 mx-5 '>
            <Link href="/manufacture/listorder" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                รายการสั่งผลิต
            </Link>
        </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดใบสั่งผลิต</p>
            {ind !== null ? (
                <div>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {ind.indl_id_name}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {ind.created_at}</p>
                    {detail.map((ingredient, Idx) => (
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






        </div>
    )
}

export default detailproduction