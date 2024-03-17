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
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});
function recipe_detail() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const handleConfirm = () => {
        closeModal();
    };
    // cancel
    const handleCancel = () => {

        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;
    const [recipe, setRecipe] = useState({
        "product": {
            "pd_id": 0,
            "pd_name": "",
            "pd_qtyminimum": 0,
            "picture": null,
            "pdc_id": 0,
            "status": "",
            "created_at": "",
            "updated_at": ""
        }

    });
    const [recipeDetail, setRecipeDetail] = useState({
        "pd_id": 0,
        "pd_name": "",
        "pd_qtyminimum": 0,
        "pdc_name": "",
        "status": "",
        "picture": null,
        "created_at": "",
        "updated_at": "",
        "rc_id": 0,
        "un_name": "",
        "qtylifetime": 0,
        "produced_qty": 0,
        "recipedetail": [

        ]
    });

    // interface Recipe {
    //     pd_name: String,
    //     pd_qtyminimum: number,
    //     status: String,
    //     picture: String,
    //     pdc_id: number,
    //     qtylifetime: number,
    //     produced_qty: number,
    //     un_id: number,
    //     ind_id: number,
    //     ingredients_qty: number,
    // }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/product/products/${id}`);
    //             const data = await response.json();
    //             console.log("data:", data);
    //             setRecipe(data);
    //             setLoading(false);
    //             console.log("data:", recipe);
    //         } catch (error) {
    //             console.error('Error:', error);
    //             setLoading(false);
    //         }
    //     };
    //     if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
    //         fetch(`http://localhost:8080/product/pdset/${id}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 setRecipeDetail(data.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching ingredient details:', error);
    //             });
    //     }
    //     fetchData();

    // }, [id]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/products/${id}`);
                const data = await response.json();
                console.log("data  fatch:", data);
                setRecipe(data);
                console.log("data ลงstate:", recipe);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/pdset/${id}`);
                const data = await response.json();
                setRecipeDetail(data);
            } catch (error) {
                console.error('Error fetching ingredient details:', error);
            }
        };

        if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
            fetchData();
            fetchRecipeDetail();
        }
    }, [id]);

    console.log("data ลงstate:", recipe);
    console.log('recipeDetail:', recipeDetail);

    return (
        <div>
            <button className='my-3 mx-5 '>
                <Link href="/product/recipeall" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    สูตรอาหาร
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดสินค้า</p>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สินค้า</p>
                    <button>
                        <Link href="/product/recipe_edit#item1">
                            <PencilSquareIcon className="ml-3 h-4 w-4 text-[#73664B]" /></Link>
                    </button>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B] ">
                    {recipe !== null ? (
                        <div className="flex">
                            <div className="w-full">
                                <p className="ml-3 w-full">ประเภทสินค้า : {recipe.product.pdc_id}</p>
                                <p className="ml-3">ชื่อสินค้า : {recipe.product.pd_name}</p>
                                <p className="ml-3">จำนวนขั้นต่ำ : {recipe.product.pd_qtyminimum}</p>
                                <p className="ml-3">หน่วยสินค้า : {recipeDetail.un_name}</p>
                            </div>
                            <div className="w-full flex">
                                <p className="ml-3">รูปภาพ :</p>
                                <img src={recipe.product.picture} alt="Product Image" className="w-24 h-24" />
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}



                </div>

            </div>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สูตรอาหาร</p>
                    <button>
                        <Link href="/product/recipe_edit#item2">
                            <PencilSquareIcon className="ml-3 h-4 w-4 text-[#73664B]" /></Link>
                    </button>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B]">


                    {recipeDetail && recipeDetail.recipedetail.map((item) => (
                        <div className="flex" key={item.ind_id}>
                            <p className="ml-3">วัตถุดิบ : {item.ind_name}</p>
                            <p className="ml-5">ปริมาณ : {item.ingredients_qty}</p>
                            <p className="ml-5">หน่วย : {item.un_id}</p>
                        </div>
                    ))}



                    <p className="ml-3 mt-3">สูตรอาหารที่ผลิตได้ : {recipeDetail && (recipeDetail.qtylifetime)}</p>
                </div>
            </div>
            <div>
                <div className="flex items-center  mx-6 mt-3 ">
                    <p className="font-medium text-[#73664B]">สถานะสินค้า</p>
                </div>
                <div className="border-l border-[#E3D8BF] ml-8 mt-2 text-[#73664B]">
                    <div className="mt-2 col-span-3 flex ml-3">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="depart" {...(recipeDetail && recipeDetail.status === "A" ? { checked: true } : {})} className="radio checked:bg-[#C5B182] " />
                                <span className=" text-[#73664B] px-3 ">ใช้งานอยู่</span>
                            </label>
                        </div>
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="depart" {...(recipeDetail && recipeDetail.status === "N" ? { checked: true } : {})} className="radio checked:bg-[#C5B182]" />
                                <span className="text-[#73664B] px-3">ยกเลิกรายการ</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-start">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <button>
                        <Link href="/product/recipeall"
                            onClick={handleCancel}
                            type="button"
                            className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                            ยกเลิก</Link></button>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}  >
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B]"
                                                    >
                                                        ยืนยันการเปลี่ยนสถานะสินค้า
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการเปลี่ยนสถานะสินค้าหรือไม่
                                                        </p>
                                                    </div>
                                                    {/*  choose */}
                                                    <div className="flex justify-end">
                                                        <div className="inline-flex justify-end">
                                                            <button
                                                                type="button"
                                                                className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModal}
                                                            >
                                                                ยกเลิก
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={handleConfirm}
                                                            ><Link href="/product/all">
                                                                    ยืนยัน
                                                                </Link></button>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )
                        }
                    </>
                    <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
                </div >
            </div>
        </div >
    )
}

export default recipe_detail