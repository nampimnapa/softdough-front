// import React, { useState } from "react";
// import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { Tab } from '@headlessui/react';
// import Link from "next/link";


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// function all() {
//     const ingredients = {
//         ทั้งหมด: [
//             {
//                 id: 1,
//                 name: 'ไข่ไก่',
//                 stock: 5,
//                 unit: 'แผง',
//                 min: 5,
//                 status: 'ปกติ'
//             },
//             {
//                 id: 2,
//                 name: 'แป้ง',
//                 stock: 5,
//                 unit: 'ถุง',
//                 min: 10,
//                 status: 'ซื้อเพิ่ม'
//             },
//             {
//                 id: 3,
//                 name: 'น้ำตาล',
//                 stock: 0,
//                 unit: 'ถุง',
//                 min: 5,
//                 status: 'ไม่มี'
//             },
//         ],
//         ตามล็อต: [
//             {
//                 lot:"LOT01",
//                 lotname:"ไข่ไก้",
//                 lotstock:6,
//                 exp:"20/11/2555",

//             },

//         ]

//     };
//     const [categories, setCategories] = useState(ingredients);

//     return (
//         <div className="h-screen  bg-white">
//             <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบทั้งหมด</p>
//             <div className="flex justify-between">
//                 <form className="flex items-center w-full transform scale-75  ">
//                     <div className="relative w-1/2 ">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
//                             <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
//                         </div>
//                         <input type="text"
//                             id="simple-search"
//                             className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
//                             placeholder="ค้นหา" required ></input>
//                     </div>
//                     <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border  hover:bg-[#5E523C]">
//                         ค้นหา
//                     </button>
//                 </form>
//                 <div className="mr-4 scale-90 flex items-center">
//                     <Link href="/ingredients/add">
//                         <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
//                             <PlusIcon className="h-5 w-5 text-white mr-2" />
//                             เพิ่ม
//                         </button></Link>
//                 </div>
//             </div>
//             <div className="">
//                 <Tab.Group>
//                     <Tab.List className="flex space-x-5  bg-white border-b border-b-1 border-b-[#E3D8BF] mx-5">
//                         {Object.keys(categories).map((category) => (
//                             <Tab
//                                 key={category}
//                                 className={({ selected }) =>
//                                     classNames(
//                                         'w-sreen py-2.5 text-sm focus:outline-none',
//                                         selected
//                                             ? 'bg-white  text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
//                                             : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
//                                     )
//                                 }
//                             >
//                                 {category}
//                             </Tab>
//                         ))}
//                     </Tab.List>
//                     <Tab.Panels className="mt-2">
//                         {Object.values(categories).map((ingredients, idx) => (
//                             <Tab.Panel
//                                 key={idx}
//                                 className={classNames(
//                                     ' bg-white p-3',

//                                 )}
//                             >
//                                 {idx === 0 ? (
//                                     <div className="relative overflow-x-auto ">
//                                         <table className="w-full text-sm text-center text-gray-500">
//                                             <thead >
//                                                 <tr className="text-white  font-normal  bg-[#908362]  ">
//                                                     <td scope="col" className="px-3 py-3">
//                                                         ลำดับ
//                                                     </td>
//                                                     <td scope="col" className="px-12 py-3 ">
//                                                         รายการ
//                                                     </td>
//                                                     <td scope="col" className="px-6 py-3">
//                                                         สต็อก
//                                                     </td>
//                                                     <td scope="col" className="px-6 py-3">
//                                                         หน่วยที่ซื้อ
//                                                     </td>
//                                                     <td scope="col" className="px-6 py-3">
//                                                         ขั้นต่ำ
//                                                     </td>
//                                                     <td scope="col" className="px-6 py-3">
//                                                         สถานะ
//                                                     </td>
//                                                     <td scope="col" className="px-6 py-3">
//                                                         รายละเอียด
//                                                     </td>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {ingredients.map((ingredients) => (
//                                                     <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
//                                                         <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
//                                                             {ingredients.id}
//                                                         </td>
//                                                         <td className="px-6 py-1 text-left">
//                                                             {ingredients.name}
//                                                         </td>
//                                                         <td className="px-6 py-1">
//                                                             {ingredients.stock}
//                                                         </td>
//                                                         <td className="px-6 py-1">
//                                                             {ingredients.unit}
//                                                         </td>
//                                                         <td className="px-6 py-1">
//                                                             {ingredients.min}
//                                                         </td>
//                                                         <td className={`px-6 py-1 
//                                                     ${ingredients.status === 'ปกติ' ? 'text-green-500'
//                                                                 : ingredients.status === 'ซื้อเพิ่ม' ? 'text-red-500'
//                                                                     : ingredients.status === 'ไม่มี' ? 'text-red-500' : ''}`}>
//                                                             {ingredients.status}

//                                                         </td>
//                                                         <td className="px-6 py-4 flex items-center justify-center  ">
//                                                             <button type="submit" >
//                                                                 <Link href="/ingredients/detailall" className="w-full flex justify-center items-center">
//                                                                     <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
//                                                                 </Link>
//                                                             </button>

//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 ) : (
//                                     // เลย์เอาท์สำหรับ Tab ที่ 2
//                                     <div className="second-tab-layout">
//                                         <div className="relative overflow-x-auto ">
//                                             <table className="w-full text-sm text-center text-gray-500">
//                                                 <thead>
//                                                     <tr className="text-white  font-normal  bg-[#908362]  ">
//                                                         <td scope="col" className="px-6 py-3">
//                                                             ล็อตวัตถุดิบ
//                                                         </td>
//                                                         <td scope="col" className="px-12 py-3 ">
//                                                             รายการ
//                                                         </td>
//                                                         <td scope="col" className="px-6 py-3">
//                                                             สต็อก
//                                                         </td>
//                                                         <td scope="col" className="px-6 py-3">
//                                                             วันหมดอายุ
//                                                         </td>

//                                                         <td scope="col" className="px-6 py-3">
//                                                             รายละเอียด
//                                                         </td>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {ingredients.map((ingredients) => (
//                                                         <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
//                                                             <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
//                                                                 {ingredients.lot}
//                                                             </td>
//                                                             <td className="px-6 py-1 text-left">
//                                                                 {ingredients.lotname}
//                                                             </td>
//                                                             <td className="px-6 py-1">
//                                                                 {ingredients.lotstock}
//                                                             </td>

//                                                             <td className="px-6 py-1">
//                                                                 {ingredients.exp}
//                                                             </td>

//                                                             <td className="px-6 py-4 flex items-center justify-center  ">
//                                                                 <button type="submit" >
//                                                                     <Link href="/ingredients/detailall" className="w-full flex justify-center items-center">
//                                                                         <MagnifyingGlassIcon className="h-4 w-4 text-[#C5B182] " />
//                                                                     </Link>
//                                                                 </button>

//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 )}
//                             </Tab.Panel>
//                         ))}
//                     </Tab.Panels>
//                 </Tab.Group>
//             </div>
//         </div>
//     );
// }

// export default all

import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import Link from "next/link";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function all() {
    const [ind, setIngredientall] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch('http://localhost:8080/ingredient/read')
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

    // const ingredients = {
    //     ทั้งหมด: [
    //         {
    //             id: 1,
    //             name: 'ไข่ไก่',
    //             stock: 5,
    //             unit: 'แผง',
    //             min: 5,
    //             status: 'ปกติ'
    //         },
    //         {
    //             id: 2,
    //             name: 'แป้ง',
    //             stock: 5,
    //             unit: 'ถุง',
    //             min: 10,
    //             status: 'ซื้อเพิ่ม'
    //         },
    //         {
    //             id: 3,
    //             name: 'น้ำตาล',
    //             stock: 0,
    //             unit: 'ถุง',
    //             min: 5,
    //             status: 'ไม่มี'
    //         },
    //     ],
    //     ตามล็อต: [
    //         {
    //             lot:"LOT01",
    //             lotname:"ไข่ไก้",
    //             lotstock:6,
    //             exp:"20/11/2555",

    //         },

    //     ]

    // };
    // const [categories, setCategories] = useState(ingredients);

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
                <div className="mr-4 scale-90 flex items-center">
                    <Link href="./add">
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>
            <div className="">
                <Tab.Group>
                    <Tab.List className="flex space-x-5  bg-white border-b border-b-1 border-b-[#E3D8BF] mx-5">
                        <Tab
                            // key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-sreen py-2.5 text-sm focus:outline-none',
                                    selected
                                        ? 'bg-white  text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
                                        : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
                                )
                            }
                        >
                            ทั้งหมด
                        </Tab>
                        <Tab
                            // key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-sreen py-2.5 text-sm focus:outline-none',
                                    selected
                                        ? 'bg-white  text-[#73664B] border-b border-b-3 border-b-[#73664B] font-medium '
                                        : 'text-[#73664B] hover:bg-white/[0.12] hover:text-[#D9CAA7]'
                                )
                            }
                        >
                            ตามล็อต
                        </Tab>

                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {Object.values(ind).map((ingredients, idx) => (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    ' bg-white p-3',

                                )}
                            >
                                {idx === 0 ? (
                                    <div className="relative overflow-x-auto ">
                                        <table className="w-full text-sm text-center text-gray-500">
                                            <thead >
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
                                                {ind.map((ingredients, index) => (
                                                    <tr key={ingredients.ind_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                        <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
                                                            {index + 1}
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
                                                    ${ingredients.status === '2' ? 'text-green-500'
                                                                : ingredients.status === '1' ? 'text-red-500'
                                                                    : ingredients.status === '0' ? 'text-red-500' : ''}`}>
                                                            {ingredients.status === '1' ? 'ซื้อเพิ่ม' : ingredients.status === '2' ? 'ปกติ' : ingredients.status === '0' ? 'ไม่มี' : ''}

                                                        </td>
                                                        {/* <td className={`px-6 py-1 
                                                                ${staffItem.st_status === '1' ? 'text-green-500'
                                                                    : staffItem.st_status === '2' ? 'text-red-500'
                                                                        : ''}`}>
                                                                {staffItem.st_status === '1' ? 'ทำงาน' : staffItem.st_status === '2' ? 'ลาออก' : ''}
                                                            </td> */}
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
                                ) : (
                                    // เลย์เอาท์สำหรับ Tab ที่ 2
                                    <div className="second-tab-layout">
                                        <div className="relative overflow-x-auto ">
                                            <table className="w-full text-sm text-center text-gray-500">
                                                <thead>
                                                    <tr className="text-white  font-normal  bg-[#908362]  ">
                                                        <td scope="col" className="px-6 py-3">
                                                            ล็อตวัตถุดิบ
                                                        </td>
                                                        <td scope="col" className="px-12 py-3 ">
                                                            รายการ
                                                        </td>
                                                        <td scope="col" className="px-6 py-3">
                                                            สต็อก
                                                        </td>
                                                        <td scope="col" className="px-6 py-3">
                                                            วันหมดอายุ
                                                        </td>

                                                        <td scope="col" className="px-6 py-3">
                                                            รายละเอียด
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ind.map((ingredients) => (
                                                        <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                            <td scope="row" className="px-6 py-1  text-gray-900 whitespace-nowrap dark:text-white">
                                                                {ingredients.lot}
                                                            </td>
                                                            <td className="px-6 py-1 text-left">
                                                                {ingredients.lotname}
                                                            </td>
                                                            <td className="px-6 py-1">
                                                                {ingredients.lotstock}
                                                            </td>

                                                            <td className="px-6 py-1">
                                                                {ingredients.exp}
                                                            </td>

                                                            <td className="px-6 py-4 flex items-center justify-center  ">
                                                                <button >
                                                                    <Link href={`./detailall/${ingredients.ind_id}`} className="w-full flex justify-center items-center">
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
                                )}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}

export default all
