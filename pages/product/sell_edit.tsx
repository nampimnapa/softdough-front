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

function sell_edit() {
    return (
        <div>
            <button className='my-3 mx-5 '>
            <Link href="/product/sell_all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                เมนูสำหรับขาย
            </Link>
        </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>รายละเอียดเมนูสำหรับขาย</p></div>
    )
}

export default sell_edit