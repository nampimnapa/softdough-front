import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function Detail() {
    const router = useRouter();
    const { id } = router.query;
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchOrderDetails(id);
        }
    }, [id]);

    const fetchOrderDetails = async (orderId) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pos/order/${orderId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-4">กำลังโหลดข้อมูล...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">เกิดข้อผิดพลาด: {error}</div>;
    }

    if (!orderData) {
        return <div className="text-center p-4">ไม่พบข้อมูลออเดอร์</div>;
    }
    // คำนวณภาษีมูลค่าเพิ่มและยอดก่อนภาษี
    // คำนวณภาษีมูลค่าเพิ่มและยอดก่อนภาษี
    const totalWithVat = orderData.od_net;
    const vatRate = 0.07;
    const vatAmount = (totalWithVat * vatRate) / (1 + vatRate);
    const totalBeforeVat = totalWithVat - vatAmount;
    return (
        <div>
            <button className='my-3 mx-5'>
                <Link href="/sale/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายการขายทั้งหมด
                </Link>
            </button>
            <div>
                <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดการขาย</p>
            </div>
            <div>
                <p className="text-sm px-6 py-2 text-[#73664B]">เลขที่ใบเสร็จ : {orderData.od_id}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">วันที่/เวลา : {new Date(orderData.od_date).toLocaleString()}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">คำสั่งซื้อ : {orderData.odt_name}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">พนักงานขาย : {orderData.staff_name}</p>
                <p className="text-sm px-6 py-2 text-[#73664B]">
                    การชำระเงิน : {
                        orderData.od_paytype === 't' ? 'โอนจ่าย' :
                            orderData.od_paytype === 'c' ? 'เงินสด' :
                                orderData.od_paytype // แสดงค่าเดิมถ้าไม่ใช่ 't' หรือ 'c'
                    }
                </p>            </div>
            <div className="mt-2 mx-6 text-normal text-[#73664B] font-medium">
                รายการ
            </div>
            <div className="space-y-2 w-1/2 mx-6">
                {orderData.items && orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <div>
                            <p className="text-sm px-6  text-[#73664B]">{item.odde_qty} {item.sm_name}</p>
                            {item.free_item && <p className="text-sm text-gray-500">x {item.free_item}</p>}
                        </div>
                        <p className="text-sm  text-[#73664B]">{item.odde_sum} บาท</p>
                    </div>
                ))}
            </div>

            <div className="mt-3 space-y-2 mx-6 w-1/2">
                <div className="flex justify-between">
                    <p className="text-sm text-[#73664B]">ยอดรวม</p>
                    <p className="text-sm text-[#73664B]">{totalBeforeVat.toFixed(2)} บาท</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-sm text-[#73664B]">ภาษีมูลค่าเพิ่ม 7%</p>
                    <p className="text-sm text-[#73664B]">{vatAmount.toFixed(2)} บาท</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-sm text-[#73664B]">ส่วนลด</p>
                    <p className="text-sm text-[#73664B]">-{orderData.od_discounttotal} บาท</p>
                </div>
                <div className="flex justify-between font-base font-medium">
                    <p className="text-sm text-[#73664B]">รวมสุทธิ</p>
                    <p className="text-sm text-[#73664B]">{totalWithVat.toFixed(2)}บาท</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;