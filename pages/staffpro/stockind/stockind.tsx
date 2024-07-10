import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function stockind() {

    const allCategories = ['ทั้งหมด', 'ตามล็อต'];

    const [ind, setIngredientall] = useState<any[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
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

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlotdetail`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredientLot(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="h-screen  bg-white">
            <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบทั้งหมด</p>
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

            </div>
            <div className="mx-5 my-2">
                <div className="relative overflow-x-auto ">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                <td scope="col" className="px-3 py-3">
                                    ลำดับ
                                </td>
                                <td scope="col" className="px-12 py-3 ">
                                    รายการ
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    สต็อก
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    หน่วยที่ซื้อ
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    ขั้นต่ำ
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    สถานะ
                                </td>
                                <td scope="col" className="px-6 py-3">
                                    รายละเอียด
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(ind) && ind.map((ingredients, idx) => (
                                <tr key={ingredients.ind_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                    <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
                                        {idx + 1}
                                    </td>
                                    <td className="px-6 py-1 text-left">
                                        {ingredients.ind_name}
                                    </td>
                                    <td className="px-6 py-1">
                                        {ingredients.ind_stock}
                                    </td>
                                    <td className="px-6 py-1">
                                        {ingredients.un_purchased_name}
                                    </td>
                                    <td className="px-6 py-1">
                                        {ingredients.qtyminimum}
                                    </td>
                                    <td className={`px-6 py-1 
                                                    ${ingredients.status === '1' ? 'text-green-500'
                                            : ingredients.status === '0' ? 'text-red-500'
                                                : ingredients.status === '0' ? 'text-red-500' : ''}`}>
                                                                 {ingredients.status === '1' ? 'ปกติ' :ingredients.status === '2' ? 'ซื้อเพิ่ม' : ingredients.status}

                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-center  ">
                                        <button type="submit" >
                                            <Link href={`./${ingredients.ind_id}`} className="w-full flex justify-center items-center">
                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
                                            </Link>
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div >
    );
}

export default stockind


