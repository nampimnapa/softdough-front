import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Button } from "@nextui-org/react";

function Approve() {
    const [message, setMessage] = useState('Loading');
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);
    const [production, setproduction] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    interface Production {
        pdo_id: string;
        pdo_id_name: string;
        updated_at: string;
        pdo_status: string;

    }
    useEffect(() => {
        // Fetch staff data on component mount
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readall`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setproduction(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);
    const handleStatusChange = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/updatestatus/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.status === 200) {
            setMessage('Data update successfully');
            // router.push('/product/all');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
    };
    const handle = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/updatestatus3/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.status === 200) {
            setMessage('Data update successfully');
            // router.push('/product/all');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
    };



    const filteredProduction = production.filter((data) => data.pdo_status === "5");
    const filtered1 = production.filter((data) => data.pdo_status === "1");

    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รอดำเนินการผลิต</p>
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
            <div className="w-full">
                <div className="flex w-full flex-col">


                    <div className="second-tab-layout mx-4">

                        <div className="relative overflow-x-auto ">
                            <table className="w-full text-sm text-center text-gray-500">
                                <thead className="">
                                    <tr className="text-white  font-normal  bg-[#908362]  ">
                                        <td scope="col" className="px-6 py-3 ">
                                            วันที่ผลิต
                                        </td>
                                        <td scope="col" className="px-12 py-3 ">
                                            ใบสั่งผลิต
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            รายละเอียด
                                        </td>
                                        <td scope="col" className="px-6 py-3">
                                            อนุมัติดำเนินการผลิต
                                        </td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered1.map((data) => (
                                        <tr key={data.pdo_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                            <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap dark:text-white">
                                                {data.updated_at}

                                            </td>
                                            <td className="px-6 py-1 text-center text-[#73664B]">
                                                {data.pdo_id_name}

                                            </td>
                                            <td className="px-6 py-1 text-[#73664B]">

                                            </td>
                                            <td className="px-6 py-1 text-[#73664B]">
                                                <Button size="sm"
                                                    onClick={() => handleStatusChange(data.pdo_id)}
                                                    className="bg-green-500 text-white">รับทราบ</Button>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Approve