// import React, { useState, useEffect } from "react";
// import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
// import { Tab } from '@headlessui/react';
// import Link from "next/link";
// import Head from 'next/head'
// import { Spinner } from "@nextui-org/react";

// function List() {

//     const [ind, setIngredientall] = useState<any[]>([]);
//     const [indlot, setIngredientLot] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         // Fetch staff data on component mount
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/usedIngredients`)
//             .then((response) => response.json())
//             .then((data) => {
//                 // console.log(data);
//                 setIngredientall(data); // Assuming the response is an array of staff objects
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 setLoading(false);
//             });



//     }, []);

//     // ค้นหา
//     const filteredInd = ind.filter((lot) =>
//         lot.id?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div>
//             <Head>
//                 <title>วัตถุดิบที่ใช้ - Softdough</title>
//             </Head>
//             <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบที่ใช้</p>
//             {/* <div className="flex justify-between">
//                 <form className="flex items-center w-full transform scale-75  ">
//                     <div className="relative w-1/2 ">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
//                             <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
//                         </div>
//                         <input
//                             type="text"
//                             id="simple-search"
//                             className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
//                             placeholder="ค้นหา"
//                             value={searchTerm} // เชื่อมต่อกับ state
//                             onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต searchTerm เมื่อผู้ใช้พิมพ์
//                         />
//                     </div>

//                 </form>
                // <div className="mr-4 scale-90 flex items-center">
                //     <Link href={`./add`}>
                //         <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                //             <PlusIcon className="h-5 w-5 text-white mr-2" />
                //             เพิ่ม
                //         </button></Link>
                // </div>
//             </div> */}
//             <div className="relative overflow-x-auto mx-5 mt-5">
//                 <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
//                     <thead >
//                         <tr className="text-white  font-normal  bg-[#908362]  ">
//                             <td scope="col" className="px-1 py-3 ">
//                                 ใบสั่งผลิต
//                             </td>
//                             <td scope="col" className="px-6 py-3 ">
//                                 วันที่ทำรายการ
//                             </td>
//                             <td scope="col" className="px-1 py-3 ">
//                                 รายการที่ใช้
//                             </td>
//                             <td scope="col" className="px-1 py-3 ">
//                                 สถานะ
//                             </td>
//                             <td scope="col" className="px-1 py-3 ">
//                                 รายละเอียด
//                             </td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             ind.length > 0 ? (
//                                 ind.map((ingredients, idx) => (
//                                     <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10 items-center">
//                                         <td scope="row" className="px-1 py-1 text-[#73664B] whitespace-nowrap dark:text-white">
//                                             {ingredients.checkk === "production" ? ingredients.id : null}
//                                         </td>
//                                         <td className="px-6 py-1 text-[#73664B] text-center">
//                                             {new Date(ingredients.created_at).toLocaleString('th-TH', {
//                                                 year: 'numeric',
//                                                 month: '2-digit',
//                                                 day: '2-digit',
//                                                 hour: '2-digit',
//                                                 minute: '2-digit',
//                                                 hour12: false  // 24-hour format
//                                             }).replace(/\//g, '-')}  {/* Replace all "/" with "-" */}
//                                         </td>


//                                         <td className="">
//                                             {ingredients.checkk === "other" ? ingredients.note : ingredients.name}
//                                         </td>

//                                         <td className={`h-10 
//                                                     ${ingredients.status === '2' ? ' text-green-500' :
//                                                 ingredients.status === '1' ? 'text-yellow-500' :
//                                                     ''
//                                             }`}>
//                                             {/* 3 เสร็จสิ้นแล้วแบบยังไม่เพิ่มวัตถุดิบที่ใช้   4 เสร็จสิ้นแล้วเพิ่มแล้ว */}
//                                             {ingredients.status === '2' ? 'ยืนยันแล้ว' : ingredients.status === '1' ? 'รอดำเนินการ' : ingredients.status}
//                                         </td>
//                                         <td className="px-1 py-3  items-center justify-center  ">
// <button >
//     <Link href="#" className="w-full flex justify-center items-center">
//         <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
//     </Link>
// </button>
//                                         </td>

//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan={5} className="text-center py-4 text-[#73664B]">
//                                         ไม่มีข้อมูล
//                                     </td>
//                                 </tr>
//                             )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default List
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon ,PlusIcon} from "@heroicons/react/24/outline";
import { Tabs, Tab, Button } from "@nextui-org/react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from "next/link";


function Approve() {
    const [ind, setIngredientall] = useState<any[]>([]);
    const [indlot, setIngredientLot] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/usedIngredients`)
            .then((response) => response.json())
            .then((data) => {
                setIngredientall(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    // แยกข้อมูลตาม checkk
    const productionData = ind.filter(item => item.checkk === "production");
    const otherData = ind.filter(item => item.checkk === "other");

    // ค้นหา
    const filteredProduction = productionData.filter((item) =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredOther = otherData.filter((item) =>
        item.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>วัตถุดิบที่ใช้</p>
            <div className="flex justify-between">

                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>                        <input
                            type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา"
                            value={searchTerm} // เชื่อมต่อกับ state
                            onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต searchTerm เมื่อผู้ใช้พิมพ์
                        />
                    </div>

                </form>
                <div className="mr-4 scale-90 flex items-center">
                    <Link href={`./add`}>
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex ">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>

            </div>
            

            <div className="w-full">
                <div className="flex w-full flex-col">
                    <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 mx-5 border-b-1 border-b-[#E3D8BF]",
                            cursor: "w-full bg-[#73664B]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#73664B]"
                        }}
                    >
                        {/* Tab 1 */}
                        <Tab
                            key="product"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>ตามใบสั่งผลิต</span>
                                </div>
                            }
                        >

                            <div className="relative overflow-x-auto mx-4">
                                <table className="w-full text-sm text-center table-fixed">
                                    <thead>
                                        <tr className="text-white font-normal bg-[#908362]">
                                            <td className="px-3 py-3 w-64">วันที่ทำรายการ</td>
                                            <td className="px-12 py-3">ใบสั่งผลิต</td>
                                            <td className="px-12 py-3">รายละเอียด</td>
                                            <td className="px-12 py-3">รายละเอียด</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProduction.length > 0 ? (
                                            filteredProduction.map((item) => (
                                                <tr key={item.id} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10">
                                                    <td className="px-6 py-1 text-[#73664B] text-center">
                                                        {new Date(item.created_at).toLocaleString('th-TH', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false
                                                        }).replace(/\//g, '-')}
                                                    </td>
                                                    <td className="py-1 w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        {item.id}
                                                    </td>
                                                    <td className="py-1 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        {item.name}
                                                    </td>
                                                    
                                                    <td className="px-12 py-1 whitespace-nowrap overflow-hidden">
                                                        <button >
                                                            <Link href="#" className="w-full flex justify-center items-center">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                                            </Link>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="flex justify-center items-center w-full py-4">
                                                        <p className="text-sm text-gray-400">ไม่พบข้อมูล</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>

                        <Tab
                            key="menusell"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>อื่นๆ</span>
                                </div>
                            }
                        >                            <div className="relative overflow-x-auto mx-4">
                                <table className="w-full text-sm text-center">
                                    <thead>
                                        <tr className="text-white font-normal bg-[#908362]">
                                            <td className="px-6 py-3">วันที่ผลิต</td>
                                            {/* <td className="px-12 py-3">รหัส</td>
                                            <td className="px-6 py-3">รายละเอียด</td> */}
                                            <td className="px-6 py-3">รายการที่ใช้</td>
                                            <td className="px-6 py-3">รายละเอียด</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOther.length > 0 ? (
                                            filteredOther.map((item) => (
                                                <tr key={item.id} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10">
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {new Date(item.created_at).toLocaleString('th-TH', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false
                                                        }).replace(/\//g, '-')}
                                                    </td>
                                                    <td className="px-6 py-1 text-center text-[#73664B]">
                                                    {item.note || '-'}
                                                    </td>
                                                    {/* <td className="px-6 py-1 text-[#73664B]">
                                                        {item.name}
                                                    </td> */}
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                    <button >
                                                            <Link href="#" className="w-full flex justify-center items-center">
                                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                                            </Link>
                                                        </button>                                                    </td>
                                                    {/* <td className="px-6 py-1 text-[#73664B]">
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            className="bg-green-500 text-white">
                                                            รับทราบ
                                                        </Button>
                                                    </td> */}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="flex justify-center items-center w-full py-4">
                                                        <p className="text-sm text-gray-400">ไม่พบข้อมูล</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Approve