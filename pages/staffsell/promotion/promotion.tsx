import React, { useState, useEffect } from "react";
import { Tab } from '@headlessui/react';
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function all() {

    const [ind, setIngredientall] = useState<any[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [ind1, setIngredientall1] = useState<any[]>([]);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readdis`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredientall(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });

    }, []);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfree`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredientall1(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });

    }, []);


    return (
        <div className="h-screen  bg-white">
            <p className='text-[#F2B461] font-medium m-4'>โปรโมชัน</p>
           
            <div>
                <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182] ">โปรโมชันส่วนลด</p>
            </div>
            <div className="m-4 grid grid-cols-3 gap-3">
                {Array.isArray(ind) && ind.map((ingredients, idx) => (

                    <div key={ingredients.dc_id} className="card bg-base-100 shadow-[0px_0px_7px_0px_#EEE8DA] ">
                        <div className="card-body p-4">
                            <div className="flex flex-row items-center justify-between">
                                <div className="card-title text-[#F2B461]">{ingredients.dc_name}</div>
                                {/* <Link href={`/promotion/editdis/${ingredients.dc_id}`} className="flex justify-end">
                                    <PencilSquareIcon className="h-5 w-5 text-[#73664B] ml-auto" />
                                </Link> */}
                            </div>
                            <p className="text-[#73664B] text-sm">รายละเอียด : {ingredients.dc_detail}</p>
                            <p className="text-[#73664B] text-sm">ราคาล่วนลด : {ingredients.dc_diccountprice} บาท</p>
                            <p className="text-[#73664B] text-sm">เริ่มโปรโมชั่น : {ingredients.datestart} </p>
                            <p className="text-[#73664B] text-sm">สิ้นสุดโปรโมชั่น : {ingredients.dateend}</p>

                            {/* <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
            </div> */}
                        </div>
                    </div>
                ))}
                
            </div>

            <div>
                <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182] ">โปรโมชันของแถม</p>
            </div>
            <div className="m-4 grid grid-cols-3 gap-3">
                {Array.isArray(ind1) && ind1.map((ingredients, idx) => {
                    // Extract unique smbuytype and smfreetype values
                    const smbuyTypes = [...new Set(ingredients.detail.map(detail => detail.smbuytype))].join(', ');
                    const smfreeTypes = [...new Set(ingredients.detail.map(detail => detail.smfreetype))].join(', ');

                    return (
                        // <Link href={`/promotion/${ingredients.pm_id}`} >
                        <div key={ingredients.pm_id} className="card bg-base-100 shadow-[0px_0px_7px_0px_#EEE8DA]">
                            <div className="card-body p-4">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="card-title text-[#F2B461]">{ingredients.pm_name}</div>
                                    {/* <Link href={`/promotion/editdis/${ingredients.pm_id}`} className="flex justify-end">
                                        <PencilSquareIcon className="h-5 w-5 text-[#73664B] ml-auto" />
                                    </Link> */}
                                    {/* <Link href={`/promotion/${ingredients.pm_id}`} className="flex justify-end">
                                        <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                    </Link> */}
                                    
                                </div>
                                <p className="text-[#73664B] text-sm">ประเภทสินค้าที่ซื้อ : {smbuyTypes}</p>
                                <p className="text-[#73664B] text-sm">ประเภทสินค้าที่แถม : {smfreeTypes}</p>
                                <p className="text-[#73664B] text-sm">เริ่มโปรโมชั่น : {ingredients.pm_datestart}</p>
                                <p className="text-[#73664B] text-sm">สิ้นสุดโปรโมชั่น : {ingredients.pm_dateend}</p>
                            </div>
                        </div>
                        // </Link>
                    );
                })}
            </div>
        </div >
    );
}

export default all


