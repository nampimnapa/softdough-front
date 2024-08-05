import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Spinner, useDisclosure, Image } from "@nextui-org/react";
import AddSell from "../../components/forms/addSell";
import EditSalesFixOne from "../../components/forms/editSalesFixOne";
import EditSalesFixTwo from "../../components/forms/editSalesFixTwo";
import Head from 'next/head'
// import Image from "next/image";
import ReadSaleMenu from "../../components/modal/readSaleMenu";

function sell_all() {
    const router = useRouter();
    const { id } = router.query;
    const [Sale, setSale] = useState([]);
    const [typesellmenufix, setTypesellmenufix] = useState([]);
    const [typesellmenumix, setTypesellmenumix] = useState([]);
    const [statusLoading, setStatusLoading] = useState(false);

    interface Sale {
        sm_id: number,
        sm_name: String,
        sm_price: number,
    }
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data2 => {
                setTypesellmenufix(data2);
                setTypesellmenumix(data2);
                console.log(data2);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id, setSale]);

    const { isOpen: isOpenModalAdd, onOpen: onOpenModalAdd, onOpenChange: onOpenChangeModalAdd, onClose: onCloseModelAdd } = useDisclosure();
    const { isOpen: isOpenModalEditOne, onOpen: onOpenModalEditOne, onOpenChange: onOpenChangeModalEditOne, onClose: onCloseModelEditOne } = useDisclosure();
    const { isOpen: isOpenModalEditTwo, onOpen: onOpenModalEditTwo, onOpenChange: onOpenChangeModalEditTwo, onClose: onCloseModelEditTwo } = useDisclosure();
    const { isOpen: isOpenModalRead, onOpen: onOpenModalRead, onOpenChange: onOpenChangeModalRead, onClose: onCloseModelRead } = useDisclosure();
    const [editFix, setEditFix] = useState("");

    const changeFix = (idfix: any, smid: any) => {
        setEditFix(smid);
        // console.log(idfix);
        if (idfix == "1") {
            onOpenModalEditOne();
        } else {
            onOpenModalEditTwo();
        }
    }

    const openRead = (smid: any) => {
        setEditFix(smid);
        onOpenModalRead();
    }

    const updateSaleData = () => {
        setStatusLoading(false);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/small`)
            .then(response => response.json())
            .then(data => {
                setSale(data);
                setStatusLoading(true);
            })
            .catch(error => {
                console.error('Error fetching sale data:', error);
            });
    };

    // console.log(Sale);


    return (
        <div className="flex flex-col ">
            <Head>
                <title>เมนูสำหรับขาย - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>เมนูสำหรับขาย</p>
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

                    <button onClick={onOpenModalAdd} className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                        เพิ่ม
                    </button>
                </div>
            </div>
            <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182] ">เมนูสำหรับขาย</p>
                {/* card */}
                {statusLoading ? (
                    <div className="flex flex-wrap">
                        {Sale && Sale.length > 0 ? (
                            Sale.map((sale, index) => (
                                <div key={index} className="card w-60 bg-base-100 shadow-md mx-2 h-60 ml-5 mb-4 ">
                                    <figure className="w-full h-3/4">
                                        <Image src={sale.picture} alt="Recipe Image" className="object-cover" />
                                    </figure>
                                    <div className="card-body">
                                        <div className="flex justity-between">
                                            <p className="text-mediem text-[#73664B]">
                                                {sale.sm_name}
                                            </p>


                                            <button type="button" onClick={() => changeFix(sale.fix, sale.sm_id)} >
                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                            </button>

                                            <button type="submit" onClick={() => openRead(sale.sm_id)}>
                                                <MagnifyingGlassIcon className="h-4 w-4 text-[#73664B] " />
                                            </button>

                                        </div>
                                        <div className="flex justify-center">
                                            {/* <div className="flex justify-start">
                                        <p className="text-sm text-[#73664B]">ราคา : </p>
                                    </div> */}
                                            <div className="flex ">
                                                <p className=" text-[#73664B] text-lg">{sale.sm_price} บาท</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <p className="text-sm text-gray-400">ไม่มีข้อมูลสูตรอาหาร</p>
                            </div>
                        )}

                    </div>
                ) : (
                    <Spinner label="Loading..." color="warning" className="flex justify-center m-60" />
                )}
            {/* Show Model Add Sell */}
            <AddSell
                isOpen={isOpenModalAdd}
                onOpenChange={onOpenChangeModalAdd}
                onClose={onCloseModelAdd}
                typesellmenufix={typesellmenufix}
                typesellmenumix={typesellmenumix}
                updateSaleData={updateSaleData}
            />

            <EditSalesFixOne
                isOpen={isOpenModalEditOne}
                onOpenChange={onOpenChangeModalEditOne}
                onClose={onCloseModelEditOne}
                typesellmenufix={typesellmenufix}
                typesellmenumix={typesellmenumix}
                idFix={editFix}
                updateSaleData={updateSaleData}
            />

            <EditSalesFixTwo
                isOpen={isOpenModalEditTwo}
                onOpenChange={onOpenChangeModalEditTwo}
                onClose={onCloseModelEditTwo}
                typesellmenufix={typesellmenufix}
                typesellmenumix={typesellmenumix}
                idFix={editFix}
                updateSaleData={updateSaleData}

            />

            <ReadSaleMenu
                isOpen={isOpenModalRead}
                onOpenChange={onOpenChangeModalRead}
                onClose={onCloseModelRead}
                typesellmenufix={typesellmenufix}
                typesellmenumix={typesellmenumix}
                idFix={editFix}
                updateSaleData={updateSaleData}


            />
        </div>
    )
}

export default sell_all