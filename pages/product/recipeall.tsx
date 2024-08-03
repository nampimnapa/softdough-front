import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/react";
import Head from 'next/head'


function recipeall() {
    const router = useRouter();
    const { id } = router.query;
    const [Recipe, setRecipe] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);
    interface Recipe {
        pd_name: String,
        pd_qtyminimum: number,
        status: String,
        picture: String,
        pdc_id: number,
        qtylifetime: number,
        produced_qty: number,
        un_id: number,
        ind_id: number,
        ingredients_qty: number,

        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }

    const [TypeProduct, setTypeProduct] = useState([]);
    interface TypeProduct {
        pdc_id: string;
        pdc_name: string;

    }
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setStatusLoading(true)
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setTypeProduct(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);

    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>สูตรอาหาร - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>สูตรอาหาร</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75">
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
                    <Link href="/product/addrecipe">
                        <button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                            เพิ่ม
                        </button></Link>
                </div>
            </div>


            {TypeProduct.map(product =>
                <div key={product.pdc_id}>
                    <p className="font-medium m-4 text-[#C5B182]  border-b-1 border-b-[#C5B182] ">{product.pdc_name}</p>

                    <div className="flex flex-wrap ">
                        {statusLoading ? (
                            Recipe && Recipe.length > 0 ? (
                                Recipe.filter(recipe => recipe.pdc_id === product.pdc_id).map((recipe, index) => (
                                    <div key={index} className="card w-60 bg-base-100 shadow-xl mx-2 h-80 ml-5 mb-4">
                                        <figure className="w-full h-96">
                                            <img src={recipe.picture == null ? "/images/logo.svg" : recipe.picture} alt="Recipe Image" className="object-cover" />
                                        </figure>
                                        <div className="card-body">
                                            <div className="flex justity-between">
                                                <p className="text-mediem text-[#73664B]">
                                                    {recipe.pd_name}
                                                </p>
                                                <button type="button">
                                                    <Link href={`/product/recipeedit/${recipe.pd_id}`} className="w-full flex justify-center items-center">
                                                        <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                    </Link>
                                                </button>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex justify-start">
                                                    <p className="text-sm text-[#73664B]">จำนวนที่ทำได้ : </p>
                                                </div>
                                                <div className="flex justify-end">
                                                    <p className="text-sm text-[#73664B]">{recipe.produced_qty} ชิ้น</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex justify-start">
                                                    <p className="text-sm text-[#73664B]">จำนวนขั้นต่ำ</p>
                                                </div>
                                                <div className="flex justify-end">
                                                    <p className="text-sm text-[#73664B]">{recipe.pd_qtyminimum} ชิ้น</p>
                                                </div>
                                            </div>
                                            <div className="card-actions flex justify-between">
                                                <div className="flex justify-items-center">
                                                    <p className="text-sm text-[#DACB46]">ขั้นต่ำใหม่</p>
                                                    <button>
                                                        <Icon icon="system-uicons:reset" className="my-1 mx-1 text-sm text-[#DACB46] font-bold" />
                                                    </button>
                                                </div>
                                                <button className="flex justify-end">
                                                    <Link href={`./recipedetail/${recipe.pd_id}`}>
                                                        <div className="badge badge-outline">สูตรอาหาร</div>
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center w-full">
                                    <p className="text-sm text-gray-400">ไม่มีข้อมูลสูตรอาหาร</p>
                                </div>
                            )) : (
                            <div className="flex justify-center items-center h-52 w-screen">
                                <Spinner label="Loading..." color="warning" />
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default recipeall