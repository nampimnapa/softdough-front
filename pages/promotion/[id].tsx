
// import { useState, useEffect, ChangeEvent, Fragment } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
// import Datepicker from "react-tailwindcss-datepicker";

// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// // interface Category {
// //     smt_id: number;
// //     smt_name: string;
// // }

// // interface Product {
// //     sm_id: number;
// //     sm_name: string;
// //     smt_name: string;
// //     smt_id: number;
// // }

// // interface FormData {
// //     pm_name: string;
// //     pm_datestart: string;
// //     pm_dateend: string;
// //     promotiondetail: { smbuy_id: number; smfree_id: number }[];
// // }

// const AddPromotion: React.FC = () => {

//     const [staff, setStaff] = useState<any>(null);
//     const router = useRouter();
//     const { id } = router.query;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfreedetail/${id}`, {
//                     credentials: 'include' // Ensure cookies are sent with the request
//                 });
//                 const data = await response.json();
//                 setStaff(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
//                 console.log('data:', data);

//                 // setLoading(false);
//             } catch (error) {
//                 console.error('Error:', error);
//                 // setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id]);






//     return (
//         <div className='h-screen'>
//             <button className='my-3 mx-5'>
//                 <Link href="/promotion/discountall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     โปรโมชันส่วนลด
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>เพิ่มโปรโมชั่นส่วนลด</p>
//             {staff !== null ? (
//                 <div className="mt-5">
//                     <div className="w-1/2">
//                         <div className="grid grid-cols-3 items-center">
//                             <p className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
//                                 วันที่เริ่มโปรโมชัน : {staff.pm_datestart}
//                             </p>

//                             <p className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
//                                 วันที่สิ้นสุดโปรโมชัน : {staff.pm_dateend}
//                             </p>

//                         </div>
//                         <div className="grid grid-cols-3 items-center">
//                             <p className="block text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
//                                 ชื่อโปรโมชัน : {staff.pm_name}
//                             </p>
//                         </div>
//                     </div>

//                     <p className="mx-6 my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">เงื่อนไข</p>


//                     {/* ของแถม       */}
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}

//         </div>
//     );
// };

// export default AddPromotion;

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from '@nextui-org/react';

const AddPromotion: React.FC = () => {
    const [staff, setStaff] = useState<any>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfreedetail/${id}`, {
                    credentials: 'include' // Ensure cookies are sent with the request
                });
                const data = await response.json();
                if (data.length > 0) {
                    setStaff(data[0]);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
                    console.log('data:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    // Function to filter out duplicate entries
    const getUniqueItems = (items: any[], key: string) => {
        const unique = new Map();
        items.forEach(item => {
            unique.set(item[key], item);
        });
        return Array.from(unique.values());
    };
console.log("id",id)
        // console.log('staff',staff)
    return (
        <div className='h-screen'>
            <button className='my-3 mx-5'>
                <Link href="/promotion/freeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    โปรโมชันของแถม
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดโปรโมชั่นของแถม</p>
            {staff ? (
                <div className="mt-5">
                    <div className="w-1/2">
                        <div className="grid grid-cols-3 items-center">
                            <div className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
                                วันที่เริ่มโปรโมชัน : </div>
                            <div className="col-span-2 text-sm font-medium leading-6 text-[#73664B] mt-3 mr-5 items-center">
                                {staff.pm_datestart}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                            <div className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
                                วันที่สิ้นสุดโปรโมชัน :                            </div>

                            <div className="col-span-2 text-sm font-medium leading-6 text-[#73664B] mt-3 mr-5 items-center">
                                {staff.pm_dateend}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center">

                            <div className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
                                ชื่อโปรโมชัน :
                            </div>

                            <div className="col-span-2 text-sm font-medium leading-6 text-[#73664B] mt-3 mr-5 items-center">
                                {staff.pm_name}
                            </div>
                        </div>
                        <div className="grid grid-cols-3">

                            <div className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
                                สินค้าที่ซื้อ :
                            </div>

                            <div className="col-span-2 text-sm font-medium leading-6 text-[#73664B] mt-3 mr-5">
                                {Array.isArray(staff.detail) && getUniqueItems(staff.detail, 'smbuy_id').map((detail, idx) => (
                                    <div className="flex flex-col text-[#73664B] text-sm " key={idx}>
                                        <p>- {detail.smbuy_idnamet}, {detail.smbuytype}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3">

                            <div className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
                                สินค้าที่แถม :
                            </div>

                            <div className="col-span-2 text-sm font-medium leading-6 text-[#73664B] mt-3 mr-5">
                                {Array.isArray(staff.detail) && getUniqueItems(staff.detail, 'smfree_id').map((detail, idx) => (
                                    <div className="flex flex-col text-[#73664B] text-sm " key={idx}>
                                        <p>- {detail.smfree_idnamet}, {detail.smfreetype}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <p className="mx-6 my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">เงื่อนไข</p>

                    <div className="flex flex-row ml-6 mt-3 mr-6">
                        <div className="flex basis-2/5">
                            <p className="text-sm font-medium leading-6 text-[#73664B]">สินค้าที่ซื้อ :</p>
                            <div className="flex flex-col">
                                {Array.isArray(staff.detail) && getUniqueItems(staff.detail, 'smbuy_id').map((detail, idx) => (
                                    <div className="flex flex-col text-[#73664B] text-sm ml-2" key={idx}>
                                        <p>{detail.smbuy_idnamet}, {detail.smbuytype}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex basis-3/5">
                            <p className="text-sm font-medium leading-6 text-[#73664B]">สินค้าที่แถม :</p>
                            <div className="flex flex-col">
                                {Array.isArray(staff.detail) && getUniqueItems(staff.detail, 'smfree_id').map((detail, idx) => (
                                    <div className="flex flex-col text-[#73664B] text-sm ml-2" key={idx}>
                                        <p>{detail.smfree_idnamet}, {detail.smfreetype}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                </div>
            ) : (
                <p>Loading...</p>
            )}


            <div className="flex justify-start">
                <div className="w-full mt-10 flex justify-start">
                    <Link href={`/promotion/freeall`}>
                        <Button
                            // onClick={sendPdoStatus} // Proceed with status update
                            type="button"
                            className="text-white bg-[#73664B] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-5">
                            เสร็จสิ้น
                        </Button>
                    </Link>

                    <div className="w-full flex justify-start">

                    <Link href={`/promotion/editfree/${id}`}>
                            <Button type="button" className="ml-2 text-white bg-[#F2B461] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                                แก้ไขโปรโมชันของแถม
                            </Button>
                        </Link>

                    </div>
                                    

                </div>
            </div>
        </div >

    );
};

export default AddPromotion;