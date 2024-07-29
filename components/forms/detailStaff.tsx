import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import Datepicker from "react-tailwindcss-datepicker";
import { Kanit } from "next/font/google";
import {Spinner} from "@nextui-org/react";

interface detailStaffProps {
    ids: any;
}

const DetailStaff: React.FC<detailStaffProps> = ({ids}) => {
    const [staff, setStaff] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (ids) {
          fetchData(ids);
        }
      }, [ids]);

    const fetchData = async (idstaff) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/staff/read/${idstaff}`);
            const data = await response.json();
            setStaff(data);
        } catch (error) {
            console.error('Error:', error);
        }finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner label="กำลังโหลด..." color="warning" />
            </div>
        );
    }

    if (!staff) {
        return <p>ไม่พบข้อมูล</p>;
    }

  return (
   <>
   <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>รายละเอียดพนักงาน</p>
                <div>
                    <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อพนักงาน : {staff.st_name}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">ชื่อผู้ใช้งาน : {staff.st_username}</p>
                    {/* <p className="text-sm px-6 py-2 text-[#73664B]">รหัสผ่าน : {staff.st_password}</p>  */}
                    <p className="text-sm px-6 py-2 text-[#73664B]">เบอร์โทร : {staff.st_tel}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">แผนก : {staff.st_type === '1' ? 'ผลิต' : 'ขาย'}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่เข้าทำงาน : {staff.date_start}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">สถานะ : {staff.st_status === '1' ? 'ทำงาน' : 'ลาออก'}</p>
                    {staff.st_status === 2 && (
                        <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ลาออก: {staff.date_end}</p>
                    )}

                </div>

            <div className="flex justify-between mt-3">
                {/* Check if staffId is not null before creating the link */}
                {staff && (
                    <button>
                        <Link href={`/staff/editstaff/${staff.st_id}`} 
                        type="button"
                        className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                                แก้ไขพนักงาน
                        </Link>
                    </button>
                )}

                <button type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
                    <Link href="/staff/allstaff">
                        เสร็จสิ้น
                    </Link>
                </button>
            </div>
   </>
  )
}

export default DetailStaff;