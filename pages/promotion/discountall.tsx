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


    return (
        <div className="h-screen  bg-white">
            <p className='text-[#F2B461] font-medium m-4'>โปรโมชันส่วนลด</p>
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
                <div className="mr-4 scale-90 flex items-center">
                    <Link href="/promotion/adddis">
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>
            <div>
                <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182] ">โปรโมชันที่มี</p>
            </div>
            <div className="m-4 grid grid-cols-3 gap-3">
                {Array.isArray(ind) && ind.map((ingredients, idx) => (

                    <div key={ingredients.dc_id} className="card bg-base-100 shadow-[0px_0px_7px_0px_#EEE8DA] ">
                        <div className="card-body p-4">
                            <div className="flex flex-row items-center justify-between">
                                <div className="card-title text-[#F2B461]">{ingredients.dc_name}</div>
                                <Link href={`/promotion/editdis/${ingredients.dc_id}`} className="flex justify-end">
                                    <PencilSquareIcon className="h-5 w-5 text-[#73664B] ml-auto" />
                                </Link>
                            </div>
                            <p className="text-[#73664B] text-sm">รายละเอียด : {ingredients.dc_detail}</p>
                            <p className="text-[#73664B] text-sm">ราคาล่วนลด : {ingredients.dc_diccountprice} บาท</p>
                            <p className="text-[#73664B] text-sm">ยอดซื้อขั้นต่ำ : {ingredients.minimum} บาท</p>
                            <p className="text-[#73664B] text-sm">เริ่มโปรโมชั่น : {ingredients.datestart} </p>
                            <p className="text-[#73664B] text-sm">สิ้นสุดโปรโมชั่น : {ingredients.dateend}</p>

                            {/* <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
            </div> */}
                        </div>
                    </div>
                ))}
                
            </div>
        </div >
    );
}

export default all



