// import React, { Fragment, useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";




// function ingreincome() {

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
//         {
//             lotno: "LOT02",
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
//             <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบเข้าร้าน</p>
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
//                     <Link href="/ingredients/income/add">
//                         <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
//                             <PlusIcon className="h-5 w-5 text-white mr-2" />
//                             เพิ่ม
//                         </button></Link>
//                 </div>
//             </div>
//             <div className="relative overflow-x-auto mx-5 mt-5">
//                 <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
//                     <thead >
//                         <tr className="text-white  font-normal  bg-[#908362]  ">
//                             <td scope="col" className="px-1 py-3 ">
//                                 วัน/เดือน/ปี
//                             </td>
//                             <td scope="col" className="px-6 py-3 ">
//                                 เลขล็อตวัตถุดิบ
//                             </td>

//                             <td scope="col" className="px-1 py-3 ">

//                             </td>
//                             <td scope="col" className="px-1 py-3 ">

//                             </td>


//                         </tr>
//                     </thead>
//                     <tbody>
//                         {ingrelot.map((lot, idx) => (
//                             <tr className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
//                                 <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
//                                     {lot.date}                            </td>
//                                 <td className="px-6 py-1  text-[#73664B] text-center">
//                                     {lot.lotno}

//                                 </td>
//                                 <td className="px-1 py-3  items-center justify-center  ">
//                                     <button type="submit" >
//                                         <Link href="/ingredients/income/detail" className="w-full flex justify-center items-center">
//                                             <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
//                                         </Link>
//                                     </button>
//                                 </td>
//                                 <td className="px-1 py-3  items-center justify-center  ">
//                                     <button type="submit" >
//                                         <Link href={`/ingredients/income/edit/${lot.lotno}`} className="w-full flex justify-center items-center">
//                                             <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />

//                                         </Link>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}

//                     </tbody>
//                 </table>
//             </div>




//         </div>

//     )
// }

// export default ingreincome
// import React, { Fragment, useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// import Head from 'next/head'



// function Ingreincome() {

//     // const [ingrelot, setIngrelot] = useState([
//     //     {
//     //         lotno: "LOT01",
//     //         date: '10/10/2555',
//     //         ingre: [
//     //             {
//     //                 name: 'แป้ง',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '500'
//     //             },
//     //             {
//     //                 name: 'น้ำตาล',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '100'
//     //             }
//     //         ],

//     //     },
//     //     {
//     //         lotno: "LOT02",
//     //         date: '10/10/2555',
//     //         ingre: [
//     //             {
//     //                 name: 'แป้ง',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '500'
//     //             },
//     //             {
//     //                 name: 'น้ำตาล',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '100'
//     //             }
//     //         ],

//     //     },

//     // ]);
//     const [indid, setIngredientlotID] = useState({ /* ตัวแปรที่คุณต้องการใช้ เช่น indl_id, ind_id และอื่นๆ */ });
//     const [loading, setLoading] = useState(false);
//     const [ind, setIngredientLot] = useState<any[]>([]);
//     const [pendingIngredientLot, setPendingIngredientLot] = useState<any[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };
//     const filterind = ind.filter(indItem =>
//         indItem.created_at.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     useEffect(() => {
//         // Fetch staff data on component mount
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlot`)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 setIngredientLot(data); // Assuming the response is an array of staff objects
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 setLoading(false);
//             });
//     }, []);
//     const getStatusText = (status) => {
//         return status === 2 ? 'ยืนยัน' : 'ไม่ยืนยัน';
//     };

//     return (
//         <div className='h-screen'>
//             <Head>
//                 <title>วัตถุดิบเข้าร้าน - Softdough</title>
//             </Head>
//             <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบเข้าร้าน</p>
//             <div className="flex justify-between">
//                 <form className="flex items-center w-full transform scale-75  ">
//                     <div className="relative w-1/2 ">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
//                             <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
//                         </div>
//                         <input
//                             type="text"
//                             id="simple-search"
//                             value={searchTerm}
//                             onChange={handleSearch}
//                             className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
//                             placeholder="ค้นหา"
//                             required
//                         />

//                     </div>

//                 </form>
//                 <div className="mr-4 scale-90 flex items-center">
//                     <Link href={`./add`}>
//                         <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
//                             <PlusIcon className="h-5 w-5 text-white mr-2" />
//                             เพิ่ม
//                         </button></Link>
//                 </div>
//             </div>
//             <div className="relative overflow-x-auto mx-5 mt-5">
//                 <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
//                     <thead >
//                         <tr className="text-white  font-normal  bg-[#908362]  ">
//                             <td scope="col" className="px-1 py-3 ">
//                                 วัน/เดือน/ปี
//                             </td>
//                             <td scope="col" className="px-6 py-3 ">
//                                 เลขล็อตวัตถุดิบ
//                             </td>

//                             <td scope="col" className="px-1 py-3 ">
//                                 สถานะ
//                             </td>
//                             <td scope="col" className="px-1 py-3 ">

//                             </td>
//                             <td scope="col" className="px-1 py-3 ">

//                             </td>


//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Array.isArray(ind) && ind.map((lot, idx) => (
//                             <tr key={lot.indl_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10 items-center">
//                                 <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
//                                     {lot.created_at}                            </td>
//                                 <td className="px-6 py-1  text-[#73664B] text-center">
//                                     {lot.indl_id_name}
//                                 </td>
//                                 <td
//                                     className={`px-6 py-1 
//                                 ${lot.status === '2' ? 'text-green-500'
//                                             : lot.status === '1' ? 'text-red-500'
//                                                 : ''}`}

//                                 >
//                                     {lot.status === '2' ? 'ใช้งาน' : lot.status === '1' ? 'ไม่ถูกใช้งาน' : lot.status}
//                                 </td>
//                                 <td className="px-1 py-3  items-center justify-center  ">
//                                     {lot.status === '1' && (
//                                         <button >
//                                             <Link href={`./edit/${lot.indl_id}`} className="w-full flex justify-center items-center">
//                                                 <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
//                                             </Link>
//                                         </button>
//                                     )}

//                                 </td>
//                                 <td className="px-1 py-3  items-center justify-center  ">
//                                     <button >
//                                         <Link href={`./detail/${lot.indl_id}`} className="w-full flex justify-center items-center">
//                                             <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
//                                         </Link>
//                                     </button>
//                                 </td>

//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>

//     )
// }

// export default Ingreincome

//เพิ่มค้นหา
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import Head from 'next/head'

function Ingreincome() {
    const [indid, setIngredientlotID] = useState({}); // Add the necessary fields here
    const [loading, setLoading] = useState(false);
    const [ind, setIngredientLot] = useState<any[]>([]);
    const [pendingIngredientLot, setPendingIngredientLot] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter based on created_at
    // const filteredInd = ind.filter(indItem =>
    //     indItem.created_at && indItem.created_at.toLowerCase().includes(searchTerm.toLowerCase()) 
    // );

    //กัน null
    const filteredInd = ind && ind.length > 0
        ? ind.filter(indItem =>
            indItem.created_at && indItem.created_at.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlot`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIngredientLot(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const getStatusText = (status) => {
        return status === '2' ? 'ยืนยัน' : status === '1' ? 'ไม่ยืนยัน' : 'สถานะไม่ทราบ';
    };

    const renderStatusClass = (status) => {
        return status === '2' ? 'text-green-500' : status === '1' ? 'text-red-500' : '';
    };

    return (
        <div className='h-screen'>
            <Head>
                <title>วัตถุดิบเข้าร้าน - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบเข้าร้าน</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75">
                    <div className="relative w-1/2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <MagnifyingGlassIcon className="h-6 w-6 text-[#C5B182]" />
                        </div>
                        <input
                            type="text"
                            id="simple-search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา"
                            required
                        />
                    </div>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    <Link href={`./add`}>
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="relative overflow-x-auto mx-5 mt-5">
                    <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
                        <thead>
                            <tr className="text-white font-normal bg-[#908362]">
                                <td scope="col" className="px-1 py-3">วัน/เดือน/ปี</td>
                                <td scope="col" className="px-6 py-3">เลขล็อตวัตถุดิบ</td>
                                <td scope="col" className="px-1 py-3">สถานะ</td>
                                <td scope="col" className="px-1 py-3"></td>
                                <td scope="col" className="px-1 py-3"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredInd) && filteredInd.map((lot) => (
                                <tr key={lot.indl_id} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10 items-center">
                                    <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
                                        {lot.created_at}
                                    </td>
                                    <td className="px-6 py-1 text-[#73664B] text-center">
                                        {lot.indl_id_name}
                                    </td>
                                    <td className={`px-6 py-1 ${renderStatusClass(lot.status)}`}>
                                        {getStatusText(lot.status)}
                                    </td>
                                    <td className="px-1 py-3 items-center justify-center">
                                        {lot.status === '1' && (
                                            <button>
                                                <Link href={`./edit/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                                    <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                </Link>
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-1 py-3 items-center justify-center">
                                        <button>
                                            <Link href={`./detail/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B]" />
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Ingreincome;