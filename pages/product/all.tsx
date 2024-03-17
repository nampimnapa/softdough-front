import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { HiOutlineTrash } from "react-icons/hi";
import { FiSave } from "react-icons/fi";
import { Tabs, Tab, Chip } from "@nextui-org/react";

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
    useEffect(() => {
        fetch(`http://localhost:8080/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => {
                setSaleMenu(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);

    const [unitOptions, setUnitOptions] = useState([]);
    interface UnitType {
        un_id: string;
        un_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {

        fetch(`http://localhost:8080/ingredient/unit`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);

    const [TypeProduct, setTypeProduct] = useState([]);
    interface TypeProduct {
        pdc_id: string;
        pdc_name: string;

    }
    useEffect(() => {
        fetch(`http://localhost:8080/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setTypeProduct(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });

    }, [id]);

    // เอาจากตัวแปรที่ได้จาก API มาทำเป็น State
    const [dataProduct, setDataProduct] = useState(TypeProduct);
    const [dataMenu, setDataMenu] = useState(SaleMenu);
    const [isEditing, setIsEditing] = useState(false);
    const [openInput, setOpenInput] = useState(0);

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

    console.log(TypeProduct);

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

        const response = await fetch(`http://localhost:8080/product/updatecat/${idData}`, {
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

        const response = await fetch('http://localhost:8080/product/addcat', {
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






    return (
        <div className="h-screen">
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
                                        {TypeProduct.map((type, index) => (
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
                                        ))}
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
                                    <Link href="/product/addmenuforsell" >
                                        <button className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border  hover:bg-[#5E523C] flex" >
                                            <PlusIcon className="h-5 w-5 text-white mr-2" />
                                            เพิ่ม
                                        </button></Link>
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
                                                        <button type="button">
                                                            <Link href={`./editsmt/${menu.smt_id}`} className="w-full flex justify-center items-center">
                                                                <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
                                                            </Link>
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
        </div>
    )
}


export default all