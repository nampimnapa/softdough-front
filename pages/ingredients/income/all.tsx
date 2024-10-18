import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Head from 'next/head'
import { Spinner } from "@nextui-org/react";

function Ingreincome() {
    const [ind, setIngredientLot] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlot`)
            .then((response) => response.json())
            .then((data) => {
                setIngredientLot(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [ind]);

    const getStatusText = (status) => {
        return status === 2 ? 'ยืนยัน' : 'ไม่ยืนยัน';
    };

    // ฟิลเตอร์ข้อมูลตามคำค้นหา
    const filteredInd = ind.filter((lot) =>
        lot.indl_id_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
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
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา"
                            value={searchTerm} // เชื่อมต่อกับ state
                            onChange={(e) => setSearchTerm(e.target.value)} // อัปเดต searchTerm เมื่อผู้ใช้พิมพ์
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
            <div className="relative max-h-[calc(100vh-190px)] overflow-y-auto mx-5 mt-5">
                <table className="w-full text-sm text-center text-gray-500 overflow-x-auto">
                    <thead className="sticky top-0 bg-[#908362]">
                        <tr className="text-white font-normal bg-[#908362]">
                            <td scope="col" className="px-1 py-3">วัน/เดือน/ปี</td>
                            <td scope="col" className="px-6 py-3">เลขล็อตวัตถุดิบ</td>
                            <td scope="col" className="px-1 py-3">สถานะ</td>
                            <td scope="col" className="px-1 py-3"></td>
                            <td scope="col" className="px-1 py-3"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        loading ? (
                            <tr>
                            <td colSpan={5} className="text-center py-4 text-[#73664B]">
                            <Spinner label="Loading..." color="warning" className="" />
                            </td>
                        </tr>
                        ) : (
                            filteredInd.length > 0 ? (
                                filteredInd.map((lot, idx) => (
                                    <tr key={lot.indl_id} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10 items-center">
                                        <td className="px-1 py-1 text-[#73664B]">{lot.created_at}</td>
                                        <td className="px-6 py-1 text-[#73664B] text-center">{lot.indl_id_name}</td>
                                        <td className={`px-6 py-1 ${lot.status === '2' ? 'text-green-500' : lot.status === '1' ? 'text-red-500' : ''}`}>
                                            {lot.status === '2' ? 'ใช้งาน' : lot.status === '1' ? 'ไม่ถูกใช้งาน' : lot.status}
                                        </td>
                                        <td className="px-1 py-3 items-center justify-center">
                                            {lot.status === '1' && (
                                                <Link href={`./edit/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                                    <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                </Link>
                                            )}
                                        </td>
                                        <td className="px-1 py-3 items-center justify-center">
                                            <Link href={`./detail/${lot.indl_id}`} className="w-full flex justify-center items-center">
                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B]" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-[#73664B]">
                                        ไม่มีข้อมูล
                                    </td>
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Ingreincome;
