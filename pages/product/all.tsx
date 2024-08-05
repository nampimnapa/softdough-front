import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Tabs, Tab, Chip, Select, SelectItem, Button, Input, Spinner, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import Head from 'next/head'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let dataSet = null;

function all() {
    const router = useRouter();
    const { id } = router.query;
    const [SaleMenu, setSaleMenu] = useState([]);
    interface SaleMenu {
        smt_id: string;
        smt_name: string;
        un_name: string;
        qty_per_unit: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }


    const [unitOptions, setUnitOptions] = useState([]);
    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        setStatusLoading(false)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setTypeProduct(data);
                setStatusLoading(true);

            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => {
                setSaleMenu(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });


    }, [id]);

    const getSMT = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => {
                setSaleMenu(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }

    const [TypeProduct, setTypeProduct] = useState([]);
    interface TypeProduct {
        pdc_id: string;
        pdc_name: string;

    }

    // เอาจากตัวแปรที่ได้จาก API มาทำเป็น State
    const [dataProduct, setDataProduct] = useState(TypeProduct);
    const [dataMenu, setDataMenu] = useState(SaleMenu);
    const [isEditing, setIsEditing] = useState(false);
    const [openInput, setOpenInput] = useState(0);
    const [statusLoading, setStatusLoading] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit } = useDisclosure();
    const [isLoanding, setIsLoading] = useState(false);
    const changeInput = (id: any) => {
        setOpenInput(id);
        setIsEditing(true);
    }

    const [newValue, setNewValue] = useState('');

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newValueData = event.target.value;
        // ใช้ setDataProduct เพื่ออัปเดต State
        setTypeProduct(prevProducts => {
            return prevProducts.map(product => {
                if (product.pdc_id === id) {
                    // อัปเดตข้อมูลเฉพาะของสินค้าที่ต้องการ
                    return { ...product, pdc_name: newValueData };
                }
                return product;
            });
        });
        console.log("แก้ไขประเภทวัตถุดิบ : ", newValueData);
    };


    const handleCancelEdit = () => {
        setDataProduct(TypeProduct)
        // ยกเลิกการแก้ไข
        setOpenInput(0);
        setAdding(false);
        setIsEditing(false);
    };

    // อันนี้เช็คเผื่อเปลี่ยนไอคอนเมื่อมีการกดแก้ไข
    const handleSaveChanges = async (idData) => {
        setOpenInput(0);
        setIsEditing(false);



        // console.log(dataProduct.find(idData))

        const fountItem = TypeProduct.find(item => item.pdc_id == idData);
        console.log(fountItem);

        const requestData = {
            pdc_name: fountItem.pdc_name, // ข้อมูลที่ต้องการอัปเดต
            // ข้อมูลอื่น ๆ ที่ต้องการส่งไปด้วย request
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/updatecat/${idData}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // ส่งข้อมูลที่ต้องการอัปเดตไปยังเซิร์ฟเวอร์
        });
        const responseData = await response.json();
        if (responseData.message === 'update success') {
            setMessage('Data updated successfully');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }



    };
    // stateข้อมูล ที่ add
    const [newProductName, setNewProductName] = useState('');

    const [isAdding, setAdding] = useState(false);

    // กดปุ่มเพิ่ม
    const handleAddProduct = () => {
        setAdding(true); // ตั้งค่า isAdding เป็น true เมื่อคลิกปุ่ม "เพิ่ม"
        // ต่อไปคุณสามารถทำอย่างที่คุณทำกับ handleAddChanges ต่อไป
    };
    // กำหนด selectedTab ในส่วนที่ใช้ React useState
    const [message, setMessage] = useState('Loading');

    const handleAddChanges = async () => {
        if (newProductName.trim() !== '') {
            setDataProduct((prevDataProduct) => [
                ...prevDataProduct,
                { id: prevDataProduct.length + 1, name: newProductName },
            ]);
            setNewProductName('');
            setOpenInput(0);
            setAdding(false); // ตั้งค่า isAdding เป็น false เมื่อเพิ่มข้อมูลเสร็จสิ้น
        }
        console.log("เพิ่มประเภทวัตถุดิบ : ", newProductName); //ข้อมูลที่เพิ่ม

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/addcat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pdc_name: newProductName }),
        });
        const responseData = await response.json();

        if (responseData.message === 'success') {
            setMessage('Data added successfully');

        } else {
            setMessage(responseData.message || 'Error occurred');
        }
    };

    // Function Add Menu for sales
    const [formData, setFormData] = useState({
        smt_name: '',
        un_id: '',
        qty_per_unit: 0
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/addtype`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเพิ่ม');
            }

            handeClear();
            onClose();
            setIsLoading(false);
            getSMT()
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error.message);
        }
    }

    const handeClear = () => {
        setFormData({
            smt_name: '',
            un_id: '',
            qty_per_unit: 0
        })
    }

    const [idSmtEdit, setIdSmtEdit] = useState("");

    // Function edit Menu for sale
    const getDstaForEdit = (idSmt) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/smt/${idSmt}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) { 
                    setIdSmtEdit(idSmt.toString());
                    setFormData({
                        smt_name: data[0].smt_name,
                        un_id: data[0].un_id,
                        qty_per_unit: data[0].qty_per_unit,
                    });
                    onOpenEdit();
                } else {
                    console.error('No SaleMenu found'); 
                }
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }

    const handleSubmitEdit = async () => {
        // console.log(formData)
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/updatesmt/${idSmtEdit}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                smt_name: formData.smt_name,
                un_id: unitOptions.find(unit => unit.un_name === formData.un_id)?.un_id,
                qty_per_unit: formData.qty_per_unit
            }),

        });
        const responseData = await response.json();
        if (responseData.message === "update success") {
            handeClear();
            onCloseEdit();
            setIsLoading(false);
            getSMT()
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
    }




    return (

        <div className="">
            <Head>
                <title>ประเภทสินค้า/สำหรับขาย - Softdough</title>
            </Head>
            <p className='text-[#F2B461] font-medium m-4'>ประเภทสินค้า/สำหรับขาย</p>
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
                        {/* Tab Product */}
                        <Tab
                            key="product"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>สินค้า</span>
                                </div>
                            }
                        >

                            <div className="relative overflow-x-auto mx-4">
                                <div className="flex items-center justify-end mb-2">
                                    <button className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex" onClick={handleAddProduct}>
                                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                                        เพิ่ม
                                    </button>
                                </div>
                                <table className="w-full text-sm text-center table-fixed">
                                    <thead >
                                        <tr className="text-white  font-normal  bg-[#908362]  ">
                                            <td scope="col" className="px-3 py-3 w-64">
                                                ลำดับ
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
                                                ชื่อประเภทสินค้า
                                            </td>
                                            <td scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden ">
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {TypeProduct.map((type, index) => (
                                            <tr key={type.pdc_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </td>
                                                {openInput === type.pdc_id ? (
                                                    <td className=" py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        <input
                                                            className="w-full h-9 focus:outline-none border"
                                                            type="text"
                                                            defaultValue={type.pdc_name}
                                                            onChange={(event) => handleInputChange(event, type.pdc_id)}

                                                        />
                                                    </td>
                                                ) : (
                                                    <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        {type.pdc_name}
                                                    </td>
                                                )}
                                                {isEditing && openInput === type.pdc_id ? (
                                                    <>
                                                        <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem]  flex items-center justify-end">
                                                            <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">ยกเลิก
                                                            </button>
                                                            <button type="button" onClick={() => handleSaveChanges(type.pdc_id)} className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light">บันทึก
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <td className="me-2 py-4 flex items-center justify-end whitespace-nowrap overflow-hidden">
                                                        <button type="button" onClick={() => changeInput(type.pdc_id)}>
                                                            <a href="#" className="w-full flex justify-center items-center">
                                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                            </a>
                                                        </button>
                                                    </td>
                                                )}

                                            </tr>
                                        ))} */}

                                        {statusLoading ? (
                                            TypeProduct.length > 0 ? (
                                                TypeProduct.map((type, index) => (
                                                    <tr key={type.pdc_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                        <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                                            {index + 1}
                                                        </td>
                                                        {openInput === type.pdc_id ? (
                                                            <td className=" py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                                <input
                                                                    className="w-full h-9 focus:outline-none border"
                                                                    type="text"
                                                                    defaultValue={type.pdc_name}
                                                                    onChange={(event) => handleInputChange(event, type.pdc_id)}
                                                                />
                                                            </td>
                                                        ) : (
                                                            <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">
                                                                {type.pdc_name}
                                                            </td>
                                                        )}
                                                        {isEditing && openInput === type.pdc_id ? (
                                                            <>
                                                                <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem]  flex items-center justify-end">
                                                                    <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">ยกเลิก</button>
                                                                    <button type="button" onClick={() => handleSaveChanges(type.pdc_id)} className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light">บันทึก</button>
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <td className="me-2 py-4 flex items-center justify-end whitespace-nowrap overflow-hidden">
                                                                <button type="button" onClick={() => changeInput(type.pdc_id)}>
                                                                    <a href="#" className="w-full flex justify-center items-center">
                                                                        <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                                    </a>
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3}>
                                                        <div className="flex justify-center items-center w-full">
                                                            <p className="text-sm text-gray-400">ไม่มีข้อมูลประเภทสินค้า</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                            <tr>
                                                <td colSpan={3}>
                                                    <Spinner label="Loading..." color="warning" className="" />
                                                </td>
                                            </tr>
                                        )}

                                        {isAdding && (
                                            <>
                                                <tr key="new" className="odd:bg-white even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
                                                        {dataProduct.length + 1}
                                                    </td>
                                                    <td className="py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
                                                        <input
                                                            className="w-full h-9 focus:outline-none border"
                                                            type="text"
                                                            value={newProductName}
                                                            onChange={(event) => setNewProductName(event.target.value)}
                                                        />
                                                    </td>
                                                    <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem] flex items-center justify-end">
                                                        <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">
                                                            ยกเลิก
                                                        </button>
                                                        <button type="button" onClick={handleAddChanges} className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light">
                                                            บันทึก
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
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
                                    <span>เมนูสำหรับขาย</span>
                                </div>
                            }
                        >
                            <div className="second-tab-layout mx-4">
                                <div className="flex items-center justify-end mb-2">
                                    <button onClick={onOpen} className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex" >
                                        <PlusIcon className="h-5 w-5 text-white mr-2" />
                                        เพิ่ม
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-center text-gray-500">
                                        <thead className="">
                                            <tr className="text-white  font-normal  bg-[#908362]  ">
                                                <td scope="col" className="px-6 py-3 ">
                                                    ลำดับ
                                                </td>
                                                <td scope="col" className="px-12 py-3 ">
                                                    ชื่อประเภทเมนูสำหรับขาย
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    หน่วยสินค้า
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    จำนวน
                                                </td>
                                                <td scope="col" className="px-6 py-3">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {SaleMenu.map((menu, index) => (
                                                <tr key={menu.smt_id} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                                    <td scope="row" className="text-[#73664B] px-6 py-1   whitespace-nowrap dark:text-white">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-1 text-left text-[#73664B]">
                                                        {menu.smt_name}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {unitOptions.find(unit => unit.un_id === menu.un_id)?.un_name || ''}
                                                    </td>
                                                    <td className="px-6 py-1 text-[#73664B]">
                                                        {menu.qty_per_unit}
                                                    </td>
                                                    <td className="me-2 py-4 flex items-center justify-end text-[#73664B]">
                                                        <button onClick={() => getDstaForEdit(menu.smt_id)} type="button" className="w-full flex justify-center items-center">
                                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                        </button>

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


            {/* Modal add addMenuforSell */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                size='sm'
                isDismissable={false} isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>เพิ่มประเภทเมนูสำหรับขาย</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <Input
                                    isRequired
                                    onChange={handleChange}
                                    type="text"
                                    label="ชื่อประเภทเมนูสำหรับขาย"
                                    labelPlacement="outside"
                                    size="md"
                                    name="smt_name"
                                    autoComplete="off"
                                    placeholder="ชื่อประเภทเมนูสำหรับขาย"
                                    className='mb-3 bg-fourth text-primary label-primary'
                                    color="primary"
                                />

                                <Select
                                    isRequired
                                    onChange={handleChange}
                                    name="un_id"
                                    labelPlacement="outside"
                                    label="หน่วยสินค้า"
                                    placeholder="เลือกหน่วยสินค้า"
                                    className="mb-3 bg-fourth text-primary label-primary"
                                    color="primary"
                                >
                                    {unitOptions.map((unit: UnitType) => (
                                        <SelectItem key={unit.un_id} value={unit.un_id}>
                                            {unit.un_name}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    isRequired
                                    onChange={handleChange}
                                    name="qty_per_unit"
                                    type="number"
                                    label="จำนวนชิ้น"
                                    labelPlacement="outside"
                                    size="md"
                                    placeholder="จำนวนชิ้น เช่น 50"
                                    className='mb-3 bg-fourth text-primary label-primary'
                                    color="primary"
                                />

                                <div className="flex justify-end mt-4">
                                    <Button onClick={handeClear} className="bg-[#C5B182] text-white" variant="flat" onPress={onClose} radius="full">
                                        ปิด
                                    </Button>
                                    <Button onClick={() => handleSubmit()} className="text-white bg-[#73664B] ml-3" radius="full" {...(formData.smt_name === "" || formData.un_id === "" || formData.qty_per_unit === 0 || isLoanding ? { isDisabled: true } : { isDisabled: false })}>
                                        {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal add edit MenuforSell */}
            <Modal
                isOpen={isOpenEdit}
                onOpenChange={onOpenChangeEdit}
                placement="center"
                size='sm'
                isDismissable={false} isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#F2B461]" style={{ fontFamily: 'kanit' }}>เพิ่มประเภทเมนูสำหรับขาย</ModalHeader>
                            <ModalBody style={{ fontFamily: 'kanit' }}>
                                <Input
                                    isRequired
                                    onChange={handleChange}
                                    value={formData.smt_name}
                                    type="text"
                                    label="ชื่อประเภทเมนูสำหรับขาย"
                                    labelPlacement="outside"
                                    size="md"
                                    name="smt_name"
                                    autoComplete="off"
                                    placeholder="ชื่อประเภทเมนูสำหรับขาย"
                                    className='mb-3 bg-fourth text-primary label-primary'
                                    color="primary"
                                />

                                <Select
                                    isRequired
                                    onChange={handleChange}
                                    name="un_id"
                                    labelPlacement="outside"
                                    label="หน่วยสินค้า"
                                    placeholder="เลือกหน่วยสินค้า"
                                    defaultSelectedKeys={[unitOptions.find(unit => unit.un_id === formData.un_id)?.un_name]}
                                    className="mb-3 bg-fourth text-primary label-primary"
                                    color="primary"
                                >
                                    {unitOptions.map((unit: UnitType) => (
                                        <SelectItem key={unit.un_name} value={unit.un_id}>
                                            {unit.un_name}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Input
                                    isRequired
                                    onChange={handleChange}
                                    value={formData.qty_per_unit.toString()}
                                    name="qty_per_unit"
                                    type="number"
                                    label="จำนวนชิ้น"
                                    labelPlacement="outside"
                                    size="md"
                                    placeholder="จำนวนชิ้น เช่น 50"
                                    className='mb-3 bg-fourth text-primary label-primary'
                                    color="primary"
                                />

                                <div className="flex justify-end mt-4">
                                    <Button onClick={handeClear} className="bg-[#C5B182] text-white" variant="flat" onPress={onCloseEdit} radius="full">
                                        ปิด
                                    </Button>
                                    <Button onClick={() => handleSubmitEdit()} className="text-white bg-[#73664B] ml-3" radius="full" {...(formData.smt_name === "" || formData.un_id === "" || formData.qty_per_unit === 0 || isLoanding ? { isDisabled: true } : { isDisabled: false })}>
                                        {isLoanding ? (<><Spinner size="sm" className='text-white' color="default" /> กำลังบันทึก</>) : "บันทึก"}
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}


export default all