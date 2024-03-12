import React, { Fragment, useEffect, useState } from "react";
import { ChevronDownIcon, } from '@heroicons/react/20/solid'
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { Icon } from '@iconify/react';
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, image } from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";
import { FaTrash } from 'react-icons/fa';


import menusell from '../../data/menusell';


export const CustomRadio = (props) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex max-w-full w-full bg-content1 m-0",
                    "hover:bg-content2 items-center justify-start",
                    "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};
function sell_all() {

    const [menuSellData, setMenuSellData] = useState(menusell);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
            image: "d_redvelvet.jpeg"
        },
        {
            id: "2",
            name: "ใบเตย",
            image: "d_pandan.jpeg"
        },
        {
            id: "3",
            name: "ออริจินอล",
            image: "d_original.jpeg"
        }
    ]

    const diffAllData = [
        {
            id: "1",
            name: "นมฮอกไกโด",
            image: "diff.jpeg"
        },
        {
            id: "2",
            name: "ชาไทย",
            image: "diff.jpeg"
        },
        {
            id: "3",
            name: "ช็อกโกแลต",
            image: "diff.jpeg"
        },
        {
            id: "4",
            name: "ชาเขียว",
            image: "diff.jpeg"
        },
        {
            id: "5",
            name: "สตอเบอรี่",
            image: "diff.jpeg"
        }
    ]

    const [sellMenuFix, setSellMenuFix] = useState({
        name: "",
        price: 0,
        type: 0,
        image: '',
        status: 'Close',
        product: [

        ]
    });

    const [ sellSelectMix, setSellSelectMix ] = React.useState([]);

    const [switchStatus, setSwitchStatus] = useState(false);

    const changeStatus = () => {
        setSwitchStatus(!switchStatus);
        if (switchStatus) {
            setSellMenuFix((prevProduct) => ({
                ...prevProduct,
                status: "Close"
            }));
        } else {
            setSellMenuFix((prevProduct) => ({
                ...prevProduct,
                status: "Open"
            }));
        }
    }


    const handleAddProduct = () => {
        setSellMenuFix(prevState => ({
            ...prevState,
            product: [...prevState.product, { id: '', quantity: 1 }]
        }));
    };

    const handleSelechTypeTwo = () => {
        setSellMenuFix(prevState => ({
            ...prevState,
            product: [...prevState.product, { id: '0' }]
        }));
    };

    const handleSelechTypeOne = () => {
        setSellMenuFix(prevState => ({
            ...prevState,
            product: []
        }));
    };

    const handleProductChange = (index, value) => {
        setSellMenuFix(prevState => {
            const updatedProducts = [...prevState.product];
            updatedProducts[index].id = value;
            return {
                ...prevState,
                product: updatedProducts
            };
        });
    };


    const handleQuantityChange = (index, delta) => {
        setSellMenuFix(prevState => {
            const updatedProducts = [...prevState.product];
            updatedProducts[index].quantity = Math.max(0, updatedProducts[index].quantity + delta);
            return {
                ...prevState,
                product: updatedProducts
            };
        });
    };

    const handleDelete = (index) => {
        setSellMenuFix(prevState => {
            const updatedProducts = [...prevState.product];
            updatedProducts.splice(index, 1);
            return {
                ...prevState,
                product: updatedProducts
            };
        });
    };

    const handleProductInputChangeFix = (e) => {
        const { name, value } = e.target;
        setSellMenuFix(prevState => ({
            ...prevState,
            [name]: value,
            product: []
        }));
        setSellSelectMix([])
    };

    const handSelectedChange = (e) => {
        const { value } = e.target;
        setSellMenuFix((prevSellMenuFix) => ({
            ...prevSellMenuFix,
            product: [{ id: value }]
        }));
    };





    console.log(sellMenuFix);
    console.log(sellMenuFix.product);

    const [groupSelected, setGroupSelected] = React.useState([]);

    return (
        <div className="h-screen">
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
                    <button onClick={onOpen} className="px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex">
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
            <p className="font-medium m-4 text-[#C5B182]  border-b-1 border-b-[#C5B182] ">โดนัท</p>
            {/* card */}
            <div className="flex flex-wrap ">
                {menuSellData.map((menu) => (
                    menu.id_type !== 3 ? (
                        <div key={menu.id} className="card w-52 h-52 bg-base-100 shadow-sm mx-2 ml-5">
                            <div className="flex justify-end mt-1">
                                <Link href="/product/sell_edit">
                                    <PencilSquareIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                </Link>
                                <Link href="/product/sell_detail">
                                    <InformationCircleIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                </Link>
                            </div>
                            <figure className="">
                                <img src={menu.image} alt={menu.name} className="w-32 h-32" />
                            </figure>
                            <div className="card-body p-0">
                                <div className="text-center">
                                    <p className="text-mediem text-[#73664B]">
                                        {menu.name}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#F2B461]">{menu.price} บาท</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}

            </div>
            <p className="font-medium m-4 text-[#C5B182] border-b-1 border-b-[#C5B182]">ดิป</p>
            <div className="flex flex-wrap ">
                {menuSellData.map((menu) => (
                    menu.id_type === 3 ? (
                        <div key={menu.id} className="card w-52 h-52 bg-base-100 shadow-sm mx-2 ml-5">
                            <div className="flex justify-end mt-1">
                                <Link href="/product/sell_edit">
                                    <PencilSquareIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                </Link>
                                <Link href="/product/sell_detail">
                                    <InformationCircleIcon className="h-5 w-5 text-[#73664B] mr-2" />
                                </Link>
                            </div>
                            <figure className="">
                                <img src={menu.image} alt={menu.name} className="w-32 h-32" />
                            </figure>
                            <div className="card-body p-0">
                                <div className="text-center">
                                    <p className="text-mediem text-[#73664B]">
                                        {menu.name}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#F2B461]">{menu.price} บาท</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                size='xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>เพิ่มเมนูสำหรับขาย</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <Tabs aria-label="Options" className="text-primary" style={{ color: "#73664B" }} onChange={handleSelechTypeOne}>
                                    <Tab key="fix" title="เมนูกำหนดไว้" className="text-primary">
                                        <div className='flex'>
                                            <div className='mr-5 '>

                                                <Card isFooterBlurred radius="lg" className="border-none max-w-[200px] max-h-[200px]">
                                                    <Image
                                                        alt="Woman listing to music"
                                                        className="w-[200px] object-cover h-[200px]"
                                                        height={200}
                                                        sizes={`(max-width: 768px) ${200}px, ${200}px`}
                                                        // src={uploadedImage || "https://scontent.fkkc4-1.fna.fbcdn.net/v/t1.6435-9/74701513_1209067865969558_4843289076142440448_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeGXTFDxoCuaalbrOdudfwVhA4GTiCD_9sgDgZOIIP_2yGilm0g-5vI5iJrMnoeeL32_0z4LE4N82VZIrF6DqCkZ&_nc_ohc=4IxDrQXywuoAX_66UsY&_nc_ht=scontent.fkkc4-1.fna&oh=00_AfC2B1N3mqIFmX-MrKxvljrfz-J0u-cgLrdRvRnLCynECg&oe=6578900B"}
                                                        src="/images/logo.svg"
                                                        width={200}
                                                    />
                                                    <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                                        <Button
                                                            className="text-tiny text-white bg-[#73664B]"
                                                            color="danger"
                                                            radius="lg"
                                                            size="sm"
                                                        // onClick={handleClick}
                                                        >
                                                            เปลี่ยนรูปภาพ
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                                <small className="text-default-400">รองรับไฟล์ .png .jpg</small>

                                                <input
                                                    style={{ display: 'none' }}
                                                    // ref={inputRef}
                                                    type="file"
                                                // onChange={handleFileChange}
                                                />

                                            </div>
                                            <div className='w-2/3'>
                                                {/* {subject_id} */}
                                                <Input
                                                    isRequired
                                                    type="text"
                                                    label="ชื่อเมนู"
                                                    size="sm"
                                                    width="100%"
                                                    className='mb-3 bg-fourth text-primary label-primary'
                                                    color="primary"
                                                    name="name"
                                                    // variant="faded"
                                                    onChange={handleProductInputChangeFix}
                                                />
                                                <Select
                                                    isRequired
                                                    label="ประเภทเมนูสำหรับขาย"
                                                    className="max-w-xs mb-3 bg-fourth text-primary label-primary"
                                                    // variant="faded"
                                                    size="sm"
                                                    color="primary"
                                                    name="type"
                                                    onChange={handleProductInputChangeFix}

                                                >
                                                    {typesellmenufix.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                                <Input
                                                    isRequired
                                                    type="number"
                                                    label="ราคา"
                                                    size="sm"
                                                    width="100%"
                                                    className='mb-3 bg-fourth text-primary label-primary'
                                                    color="primary"
                                                    name="price"
                                                    onChange={handleProductInputChangeFix}

                                                // variant="faded"
                                                // onChange={(e) => setLname(e.target.value)}
                                                />

                                                <Switch
                                                    classNames={{
                                                        base: cn(
                                                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                            "justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent",
                                                            "data-[selected=true]:border-primary",
                                                        ),
                                                        wrapper: "p-0 h-4 overflow-visible",
                                                        thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                            "group-data-[hover=true]:border-primary",
                                                            //selected
                                                            "group-data-[selected=true]:ml-6",
                                                            // pressed
                                                            "group-data-[pressed=true]:w-7",
                                                            "group-data-[selected]:group-data-[pressed]:ml-4",
                                                        ),
                                                    }}
                                                    onChange={changeStatus}
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                                        <p className="text-tiny text-default-400">
                                                            {switchStatus ? "สินค้ากำลังแสดงที่หน้าเมนูขายหน้าร้าน" : "สินค้าปิดแสดงที่หน้าเมนูขายหน้าร้าน"}
                                                        </p>
                                                    </div>
                                                </Switch>


                                            </div>


                                        </div>

                                        <Card {...(sellMenuFix.type === 0 ? { isDisabled: true } : { isDisabled: false })}>
                                            <CardHeader className=" flex justify-between">
                                                <p className="text-xs items-end justify-end text-[#73664B]">จำนวนสินค้าทั้งหมด : 5</p>
                                                <p className="text-xs items-end justify-end text-[#73664B]">จำนวนชิ้นคงเหลือ : 5</p>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody className="h-[150px] overflow-auto">
                                                {sellMenuFix.product.map((product, index) => (
                                                    <div key={index} className="flex items-center w-full mt-3">
                                                        <div className="flex h-min items-center w-3/4">
                                                            <Select
                                                                isRequired
                                                                label="ประเภทเมนูสำหรับขาย"
                                                                className="max-w-xs bg-fourth text-primary label-primary"
                                                                size="sm"
                                                                color="primary"
                                                                name="type"
                                                                onChange={(e) => handleProductChange(index, e.target.value)}
                                                            >
                                                                {doughAllData.map((prod) => (
                                                                    <SelectItem key={prod.id} value={prod.id}>
                                                                        {prod.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex w-full">
                                                            <p className="text-sm px-2 pl-10 w-2/3 items-end justify-end py-2 text-[#73664B]">จำนวนชิ้น :</p>
                                                            <div className="flex items-center w-3/5">
                                                                <button
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm"
                                                                    onClick={() => handleQuantityChange(index, -1)}
                                                                >
                                                                    <svg
                                                                        className="text-[#73664B]"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="1em"
                                                                        height="1em"
                                                                        viewBox="0 0 256 256"
                                                                    >
                                                                        <path
                                                                            fill="currentColor"
                                                                            d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                                <span className="w-4 text-center mx-2">{product.quantity}</span>
                                                                <button
                                                                    className="btn btn-square bg-[#D9CAA7] btn-sm"
                                                                    onClick={() => handleQuantityChange(index, 1)}
                                                                >
                                                                    <svg
                                                                        className="text-[#73664B]"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="1em"
                                                                        height="1em"
                                                                        viewBox="0 0 256 256"
                                                                    >
                                                                        <path
                                                                            fill="currentColor"
                                                                            d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"
                                                                        />
                                                                    </svg>
                                                                </button>

                                                                <CiTrash
                                                                    className="text-red-500 text-3xl ml-5"
                                                                    onClick={() => handleDelete(index)}
                                                                />

                                                            </div>

                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="flex justify-center my-2">
                                                    <Button radius="full" size="sm" {...(sellMenuFix.type === 0 ? { isDisabled: true } : { isDisabled: false })} className="text-white bg-[#73664B]" onClick={handleAddProduct}>
                                                        เลือกสินค้าเพิ่มเติม
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>

                                        <div className="flex justify-end mt-4">
                                            <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} radius="full">
                                                Close
                                            </Button>
                                            <Button className="text-white bg-[#73664B] ml-3" radius="full" {...(sellMenuFix.name === "" ? { isDisabled: true } : { isDisabled: false })}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </Tab>

                                    <Tab key="mix" title="เมนูคละหน้าร้าน" className="text-primary" onChange={handleSelechTypeTwo}>

                                        <div className='flex'>
                                            <div className='mr-5 '>

                                                <Card isFooterBlurred radius="lg" className="border-none max-w-[200px] max-h-[200px]">
                                                    <Image
                                                        alt="Woman listing to music"
                                                        className="w-[200px] object-cover h-[200px]"
                                                        height={200}
                                                        sizes={`(max-width: 768px) ${200}px, ${200}px`}
                                                        // src={uploadedImage || "https://scontent.fkkc4-1.fna.fbcdn.net/v/t1.6435-9/74701513_1209067865969558_4843289076142440448_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeGXTFDxoCuaalbrOdudfwVhA4GTiCD_9sgDgZOIIP_2yGilm0g-5vI5iJrMnoeeL32_0z4LE4N82VZIrF6DqCkZ&_nc_ohc=4IxDrQXywuoAX_66UsY&_nc_ht=scontent.fkkc4-1.fna&oh=00_AfC2B1N3mqIFmX-MrKxvljrfz-J0u-cgLrdRvRnLCynECg&oe=6578900B"}
                                                        src="/images/logo.svg"
                                                        width={200}
                                                    />
                                                    <CardFooter className="flex justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                                        <Button
                                                            className="text-tiny text-white bg-[#73664B]"
                                                            color="danger"
                                                            radius="lg"
                                                            size="sm"
                                                        // onClick={handleClick}
                                                        >
                                                            เปลี่ยนรูปภาพ
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                                <small className="text-default-400">รองรับไฟล์ .png .jpg</small>

                                                <input
                                                    style={{ display: 'none' }}
                                                    // ref={inputRef}
                                                    type="file"
                                                // onChange={handleFileChange}
                                                />

                                            </div>
                                            <div className='w-2/3'>
                                                {/* {subject_id} */}
                                                <Input
                                                    isRequired
                                                    type="text"
                                                    label="ชื่อเมนู"
                                                    size="sm"
                                                    width="100%"
                                                    className='mb-3 bg-fourth text-primary label-primary'
                                                    color="primary"
                                                    name="name"
                                                    // variant="faded"
                                                    onChange={handleProductInputChangeFix}
                                                />
                                                <Select
                                                    isRequired
                                                    label="ประเภทเมนูสำหรับขาย"
                                                    className="max-w-xs mb-3 bg-fourth text-primary label-primary"
                                                    // variant="faded"
                                                    size="sm"
                                                    color="primary"
                                                    name="type"
                                                    onChange={handleProductInputChangeFix}

                                                >
                                                    {typesellmenumix.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                                <Input
                                                    isRequired
                                                    type="number"
                                                    label="ราคา"
                                                    size="sm"
                                                    width="100%"
                                                    className='mb-3 bg-fourth text-primary label-primary'
                                                    color="primary"
                                                    name="price"
                                                    onChange={handleProductInputChangeFix}

                                                // variant="faded"
                                                // onChange={(e) => setLname(e.target.value)}
                                                />

                                                <Switch
                                                    classNames={{
                                                        base: cn(
                                                            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                            "justify-between cursor-pointer rounded-lg gap-2 p-2 mb-3 border-2 border-transparent",
                                                            "data-[selected=true]:border-primary",
                                                        ),
                                                        wrapper: "p-0 h-4 overflow-visible",
                                                        thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                            "group-data-[hover=true]:border-primary",
                                                            //selected
                                                            "group-data-[selected=true]:ml-6",
                                                            // pressed
                                                            "group-data-[pressed=true]:w-7",
                                                            "group-data-[selected]:group-data-[pressed]:ml-4",
                                                        ),
                                                    }}
                                                    onChange={changeStatus}
                                                >
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-small text-primary">สถานะสินค้า: {switchStatus ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
                                                        <p className="text-tiny text-default-400">
                                                            {switchStatus ? "สินค้ากำลังแสดงที่หน้าเมนูขายหน้าร้าน" : "สินค้าปิดแสดงที่หน้าเมนูขายหน้าร้าน"}
                                                        </p>
                                                    </div>
                                                </Switch>


                                            </div>


                                        </div>


                                        {sellMenuFix.type !== 0 && (
                                            <Card>
                                                <CardBody className="h-[190px] overflow-auto">
                                                    {sellMenuFix.type == 4 ? (
                                                        <RadioGroup
                                                            name="prodiff"
                                                            onChange={handSelectedChange}
                                                            value={sellMenuFix.product.length > 0 ? sellMenuFix.product[0].id : "0"}
                                                        >
                                                            {diffAllData.map((diff, index) => (
                                                                <CustomRadio value={diff.id} key={index}>
                                                                    <div className="flex justify-center items-center">
                                                                        <Avatar radius="sm" src={`/images/${diff.image}`} />
                                                                        <p className="justify-center ml-3">{diff.name}</p>
                                                                    </div>
                                                                </CustomRadio>
                                                            ))}
                                                        </RadioGroup>
                                                    ) : sellMenuFix.type == 3 ? (
                                                        <RadioGroup
                                                            name="dough"
                                                            onChange={handSelectedChange}
                                                            value={sellMenuFix.product.length > 0 ? sellMenuFix.product[0].id : "0"}
                                                        >
                                                            {doughAllData.map((dough, index) => (

                                                                <CustomRadio value={dough.id} key={index}>
                                                                    <div className="flex justify-center items-center">
                                                                        <Avatar radius="sm" src={`/images/${dough.image}`} />
                                                                        <p className="justify-center ml-3">{dough.name}</p>
                                                                    </div>
                                                                </CustomRadio>

                                                            ))}
                                                        </RadioGroup>
                                                    ) : (
                                                        <CheckboxGroup
                                                        value={sellSelectMix}
                                                        onChange={setSellSelectMix}
                                                            >
                                                            {doughAllData.map((dough, index) => (
                                                                <Checkbox
                                                                    classNames={{
                                                                        base: cn(
                                                                            "inline-flex max-w-full w-full bg-content1 m-0",
                                                                            "hover:bg-content2 items-center justify-start",
                                                                            "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                                            "data-[selected=true]:border-primary"
                                                                        ),
                                                                        label: "w-full",
                                                                    }}
                                                                    key={dough.id} value={dough.id.toString()}
                                                                >
                                                                    <div className="flex justify-start items-center gap-1">
                                                                        <Avatar radius="sm" src={`/images/${dough.image}`} />
                                                                        <p className="justify-center ml-3">{dough.name}</p>
                                                                    </div>
                                                                </Checkbox>
                                                            ))}
                                                        </CheckboxGroup>
                                                    )}
                                                </CardBody>
                                            </Card>
                                        )}



                                        <div className="flex justify-end mt-4">
                                            <Button className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} radius="full">
                                                Close
                                            </Button>
                                            <Button className="text-white bg-[#73664B] ml-3" radius="full" {...(sellMenuFix.name === "" ? { isDisabled: true } : { isDisabled: false })}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </Tab>
                                </Tabs>



                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default sell_all