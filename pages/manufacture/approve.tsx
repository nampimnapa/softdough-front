import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Tabs, Tab, Button } from "@nextui-org/react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Approve() {
    const [message, setMessage] = useState('Loading');
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);
    const [production, setproduction] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // เก็บคำค้นหา

    const MySwal = withReactContent(Swal);
    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            getReadall();
        }
    });

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
                setproduction(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const getReadall = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readall`)
            .then((response) => response.json())
            .then((data) => {
                setproduction(data); // Assuming the response is an array of staff objects
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }


    const handleStatusChange = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/updatestatus/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const responseData = await response.json();
        if (responseData.message == "Update success") {
            setMessage('Data update successfully');
            Toast.fire({
                icon: "success",
                title: <p style={{ fontFamily: 'kanit' }}>อนุมัติสำเร็จ</p>
            });
        } else {
            setMessage(responseData.message || 'Error occurred');
            Toast.fire({
                icon: "error",
                title: <p style={{ fontFamily: 'kanit' }}>อนุมัติไม่สำเร็จ</p>
            });
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

        if (responseData.message == "Update successful") {
            setMessage('Data update successfully');
            Toast.fire({
                icon: "success",
                title: <p style={{ fontFamily: 'kanit' }}>อนุมัติสำเร็จ</p>
            });
        } else {
            setMessage(responseData.message || 'Error occurred');
            Toast.fire({
                icon: "error",
                title: <p style={{ fontFamily: 'kanit' }}>อนุมัติไม่สำเร็จ</p>
            });
        }
    };



    const filteredProduction = production.filter((data) => data.pdo_status === "5");
    const filtered1 = production.filter((data) => data.pdo_status === "1");

    // ค้นหา
    const filteredProd = filteredProduction.filter((lot) =>
        lot.pdo_id_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredRed = filtered1.filter((lot1) =>
        lot1.pdo_id_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <p className='text-[#F2B461] font-medium m-4'>รออนุมัติ</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
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
                                    <span>ยืนยันใบสั่งผลิต</span>
                                </div>
                            }
                        >
                            <div className="relative overflow-x-auto mx-4">
                                <table className="w-full text-sm text-center table-fixed">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362]  ">
                                            <td scope="col" className="px-3 py-3 w-64">
                                                วันที่ผลิต
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                                ใบสั่งผลิต
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">รายละเอียด
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                                อนุมัติใบสั่งผลิต
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredProd.length > 0 ? (
                                                filteredProd.map((data) => (
                                                    <tr key={data.pdo_id} className="odd:bg-white even:bg-[#F5F1E8] border-b h-10">
                                                        <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                                            {data.updated_at}
                                                        </td>
                                                        <td className="py-1  w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                            {data.pdo_id_name}
                                                        </td>
                                                        <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                            {/* Add details here if available */}
                                                        </td>
                                                        <td className="px-12 py-1 whitespace-nowrap overflow-hidden">
                                                            <Button className="mr-2 bg-red-500 text-white" size="sm">ยกเลิก</Button>
                                                            <Button
                                                                onClick={() => handle(data.pdo_id)}
                                                                size="sm"
                                                                className="bg-green-500 text-white">ยืนยัน</Button>
                                                        </td>
                                                    </tr>
                                                ))) : (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <div className="flex justify-center items-center w-full">
                                                            <p className="text-sm text-gray-400">ไม่พบข้อมูล</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                    </tbody>
                                </table>
                            </div>


                        </Tab>
                        {/* tab2 */}
                        {/* Tab Menu */}
                        <Tab
                            key="menusell"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>ยืนยันการดำเนินการ</span>
                                </div>
                            }
                        >
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
                                            {filteredRed.map((data) => (
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
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Approve