import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import {Spinner} from "@nextui-org/react";

const DetailStaff = dynamic(() => import('../../components/forms/detailStaff'), {
    loading: () => <Spinner label="Loading..." color="warning" />,
});

function detailstaff() {
    const [staff, setStaff] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="h-screen">
            <button className='my-3 mx-5 '>
                <Link href="/staff/allstaff" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    พนักงานทั้งหมด
                </Link>
            </button>
            <DetailStaff ids={id} />
        </div>
    );
}

export default detailstaff