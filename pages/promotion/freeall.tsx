import React, { useState, useEffect } from "react";
import { Tab } from '@headlessui/react';
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function All() {

    const [ind, setIngredientall] = useState<any[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfree`)
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
            <p className='text-[#F2B461] font-medium m-4'>โปรโมชันของแถม</p>
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
                    <Link href="/promotion/addfree">
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
                {Array.isArray(ind) && ind.map((ingredients, idx) => {
                    // Extract unique smbuytype and smfreetype values
                    // const smbuyTypes = [...new Set(ingredients.detail.map(detail => detail.smbuytype))].join(', ');
                    // const smfreeTypes = [...new Set(ingredients.detail.map(detail => detail.smfreetype))].join(', ');

                    const smbuyTypes = Array.from(new Set(ingredients.detail.map(detail => detail.smbuytype))).join(', ');
                    const smfreeTypes = Array.from(new Set(ingredients.detail.map(detail => detail.smfreetype))).join(', ');

                    return (
                        <Link href={`/promotion/${ingredients.pm_id}`} key={ingredients.pm_id + "linkitem"}>
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
                        </Link>
                    );
                })}
            </div>

        </div >
    );
}

export default All