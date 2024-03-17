import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, image } from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";
import { FaTrash } from 'react-icons/fa';
import { useRouter } from "next/router";

import menusell from '../../data/menusell';
import AddSell from '../../components/addSell';



function sell_all() {


    const [menuSellData, setMenuSellData] = useState(menusell);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onOpenChange: onOpenChangeModalAdd, onClose: onCloseModelAdd } = useDisclosure();
    const { isOpen: isOpenModalEditDough, onOpen: onOpenModalEditDough, onOpenChange: onOpenChangeModalEditDough } = useDisclosure();
    const { isOpen: isOpenModalEditDiff, onOpen: onOpenModalEditDiff, onOpenChange: onOpenChangeModalEditDiff } = useDisclosure();

    // const menusell = [
    //     {
    //         id: 1,
    //         name: "เรดเวลเวด, กล่อง L",
    //         price: 100,
    //     },
    //     {
    //         id: 2,
    //         name: "ใบเตย, กล่อง L",
    //         price: 100,
    //     },
    // ]

    const typesellmenufix = [
        {
            id: "1",
            name: "กล่อง M",
            num: 4,
        },
        {
            id: "2",
            name: "กล่อง L",
            num: 6,
        }
    ]

    const typesellmenumix = [
        {
            id: "1",
            name: "กล่อง M",
            num: 4,
        },
        {
            id: "2",
            name: "กล่อง L",
            num: 6,
        },
        {
            id: "3",
            name: "เดี่ยว",
            num: 1,
        },
        {
            id: "4",
            name: "ดิป",
            num: 1,
        },
    ]

    const doughAllData = [
        {
            id: "1",
            name: "เรดเวลเวด",
            image: "/images/d_redvelvet.jpeg"
        },
        {
            id: "2",
            name: "ใบเตย",
            image: "/images/d_pandan.jpeg"
        },
        {
            id: "3",
            name: "ออริจินอล",
            image: "/images/d_original.jpeg"
        }
    ]

    const diffAllData = [
        {
            id: "1",
            name: "นมฮอกไกโด",
            image: "/images/diff.jpeg"
        },
        {
            id: "2",
            name: "ชาไทย",
            image: "/images/diff.jpeg"
        },
        {
            id: "3",
            name: "ช็อกโกแลต",
            image: "/images/diff.jpeg"
        },
        {
            id: "4",
            name: "ชาเขียว",
            image: "/images/diff.jpeg"
        },
        {
            id: "5",
            name: "สตอเบอรี่",
            image: "/images/diff.jpeg"
        }
    ]


    const router = useRouter();
    const { id } = router.query;
    const [sm, setSm] = useState([]);
    const [smt, setSmt] = useState([]);
    interface smt {
        smt_id: Number,
        smt_name: String
    }

    interface sm {
        sm_id: Number,
        sm_name: String
        smt_name: String,
        sm_price: Number
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSm(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => {
                setSmt(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });


    }, [id]);

    // Function to find smt_name by smt_id
    const findSmtNameById = (smt_id) => {
        const foundSmt = smt.find(item => item.smt_id === smt_id);
        return foundSmt ? foundSmt.smt_name : "";
    };


    return (
        <div className="overflow-x-auto h-[calc(100vh-58px)]">
            <p className='text-[#F2B461] font-medium m-4'>เมนูสำหรับขาย</p>
            <div className="flex justify-between">
                <form className="flex items-center w-full transform scale-75  ">
                    <div className="relative w-1/2 ">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
                            <MagnifyingGlassIcon className="h-6 w-6  text-[#C5B182]" />
                        </div>
                        <input type="text"
                            id="simple-search"
                            className="bg-[#FFFFF8] border border-[#C5B182] block w-full ps-10 p-2.5 rounded-full placeholder:text-[#C5B182] focus:outline-none"
                            placeholder="ค้นหา" required>
                        </input>
                    </div>
                    <button type="submit" className="p-2 ms-2 text-sm  rounded-full text-white bg-[#C5B182] border hover:bg-[#5E523C]">
                        ค้นหา
                    </button>
                </form>
                <div className="mr-4 scale-90 flex items-center">
                    {/* <Link href="/product/sell_add"> */}
                    <button onClick={onOpenModalAdd} className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                        เพิ่ม
                    </button>
                    {/* </Link> */}
                </div>
            </div>
            <div className="w-1/4 flex h-min items-center m-3">
                <select
                    id="sellmenu"
                    className=" bg-[#E3D9C0] block rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                    name="unit"

                    defaultValue="เลือกเมนูสำหรับขาย"
                >
                    <option disabled>
                        เลือกเมนูสำหรับขาย
                    </option>
                    <option>โดนัท</option>
                    <option>ดิป</option>
                </select>
            </div>
            {sm.map((smtItem) => (
                <div key={smtItem.smt_id}>
                    <div>
                        <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182] ">{smtItem.smt_name}</p>
                    </div>
                    <div className="flex flex-wrap">
                        {sm.map((menu) => {
                            const foundSmt = smt.find(item => item.smt_id === smtItem.smt_id);
                            if (foundSmt && menu.smt_name === foundSmt.smt_name) {
                                return (
                                    <div key={menu.id} className="card w-52 h-52 bg-base-100 shadow-sm mx-2 ml-5 mb-5">
                                        <div className="flex justify-end mt-1">
                                            <Link href="/product/sell_edit">
                                                <PencilSquareIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                            </Link>
                                            <Link href="/product/sell_detail">
                                                <InformationCircleIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                            </Link>
                                        </div>
                                        <div className="flex justify-center w-full">
                                            <Image
                                                alt={menu.name}
                                                className="w-36 object-cover h-32 justify-center items-center"
                                                height={200}
                                                sizes={`(max-width: 768px) ${32}px, ${32}px`}
                                                src={menu.image}
                                                width={200}
                                            />
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="text-center">
                                                <p className="text-mediem text-[#73664B]">
                                                    {menu.sm_name}, {findSmtNameById(menu.smt_id)}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[#F2B461]">{menu.sm_price} บาท</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
            ))}



            {/* Show Model Add Sell */}
            <AddSell
                isOpen={isOpenModalAdd}
                onOpenChange={onOpenChangeModalAdd}
                onClose={onCloseModelAdd}
                typesellmenufix={typesellmenufix}
                typesellmenumix={typesellmenumix}
                doughAllData={doughAllData}
                diffAllData={diffAllData}
            />



        </div>
    )
}

export default sell_all