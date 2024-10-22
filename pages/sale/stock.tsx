import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import Head from 'next/head'
import { Button, Image, Spinner } from "@nextui-org/react";
import { Icon } from '@iconify/react';

function Stock() {
    const [stockData, setStockData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/countstock`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStockData(data); // Assuming the response is an array of staff objects
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);



    // Filter function for search
    const filteredStock = stockData.filter((item) =>
        item.pd_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Head>
                <title>สต็อกสินค้า - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>สต็อกสินค้า</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75">
                    <div className="relative w-1/2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <MagnifyingGlassIcon className="h-6 w-6 text-[#C5B182]" />
                        </div>
                        <input
                            type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    {/* <Button className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex">
                        <PlusIcon className="h-5 w-5 text-white " />
                        เพิ่มสินค้าที่ขายไม่ได้
                    </Button> */}
                </div>
            </div>

            <div className="max-h-[calc(100vh-160px)] overflow-y-auto mt-3">
                {isLoading ? (
                    <Spinner label="Loading..." color="warning" className="flex justify-center m-60" />
                ) : (
                    <div className="flex flex-wrap">
                        {filteredStock.length > 0 ? (
                            filteredStock.flatMap((item) =>
                                item.detailstock.map((detail, detailIndex) => (
                                    <div key={`${item.pd_id}-${detail.pdod_id}`} className="card z-1 w-60 bg-base-100 shadow-xl mx-2 h-auto ml-5 mb-4">
                                        <figure className="w-full h-40 z-0">
                                            <Image
                                                src={item.picture == null ? "/images/logo.svg" : item.picture}
                                                alt="Product Image"
                                                className="object-cover z-0"
                                            />

                                        </figure>
                                        <div className="card-body">
                                            <div className="flex justify-between">
                                                <p className="text-medium text-[#73664B]">{item.pd_name}</p>
                                                <p className="text-medium text-[#F2B461] text-right">ทั้งหมด {item.total_stock} ชิ้น</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-[#73664B] ">เลขล็อตผลิตสินค้า :</p>
                                                <p className="text-sm text-[#73664B] text-right">{detail.pdod_id}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-[#73664B] ">จำนวน :</p>
                                                <p className="text-sm text-[#73664B] text-right">{detail.pdod_stock} ชิ้น</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-[#73664B] ">วันหมดอายุ :</p>
                                                <p className="text-sm text-[#73664B] text-right">{new Date(detail.exp_date).toLocaleDateString()}</p>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <p className="text-sm text-gray-400">ไม่มีข้อมูลสต๊อกสินค้า</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Stock;