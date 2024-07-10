import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";

function list() {

    const [ind, setIngredientall] = useState<any[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Fetch staff data on component mount
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setIngredientall(data); // Assuming the response is an array of staff objects
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             setLoading(false);
    //         });

    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlotdetail`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setIngredientLot(data); // Assuming the response is an array of staff objects
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             setLoading(false);
    //         });
    // }, []);
    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบที่ใช้</p>
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
                    <Link href={`./add`}>
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto mx-5 mt-5">
                <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
                    <thead >
                        <tr className="text-white  font-normal  bg-[#908362]  ">
                            <td scope="col" className="px-1 py-3 ">
                                ล็อตผลิต
                            </td>
                            <td scope="col" className="px-6 py-3 ">
                                วันที่ทำรายการ
                            </td>
                            <td scope="col" className="px-1 py-3 ">
                                รายการที่ใช้
                            </td>
                            <td scope="col" className="px-1 py-3 ">
                                สถานะ
                            </td>
                            <td scope="col" className="px-1 py-3 ">
                                รายละเอียด
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10 items-center">
                            <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
                            </td>
                            <td className="px-6 py-1  text-[#73664B] text-center">
                            </td>
                            <td className=""
                            >
                            </td>
                            <td className="px-1 py-3  items-center justify-center  ">
                            </td>
                            <td className="px-1 py-3  items-center justify-center  ">
                                <button >
                                    <Link href="#" className="w-full flex justify-center items-center">
                                        <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                    </Link>
                                </button>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default list