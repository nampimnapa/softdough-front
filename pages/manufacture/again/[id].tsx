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
import { CheckboxGroup, Checkbox, colors, Button } from "@nextui-org/react";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});
interface Ingredients {
    ind_id: string;
    ind_name: string;
}
interface ProductCat {
    pdc_id: string;
    pdc_name: string;
}
interface Recipe {
    pd_name: String,
    pd_qtyminimum: number,
    status: String,
    picture: String,
    pdc_id: number,
    qtylifetime: number,
    produced_qty: number,
    un_id: number,
    ind_id: number,
    ingredients_qty: number,

}
interface PdodDetail {
    pd_id: number;
    pd_name: string;
    pdc_name: string;
    pdo_id: number;
    pdod_id: number | null;
    qty: number;
    status: string;
}
function Editpdod() {
    const router = useRouter();
    const { id } = router.query;
    // เก็บที่ fetch มา ดีเทลใหญ่ดีเทลเล็ก
    const [detail, setDetail] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [productCat, setProductCat] = useState([]);
    const [Ingredientall, setIngredientall] = useState<any[]>([]);
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    const [Recipe, setRecipe] = useState([]);

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/readcat`)
            .then(response => response.json())
            .then(data => {
                setProductCat(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/productsall`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readone/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        console.error(data.message);
                        setLoading(false);
                    } else {
                        setDetail(data);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Error fetching production order:', error);
                    setLoading(false);
                });
        }

    }, [id]);
    const [selectedProductType, setSelectedProductType] = useState(1); // ประเภทสินค้าที่ถูกเลือก
    const [selectedProductId, setSelectedProductId] = useState(1); // ประเภทสินค้าที่ถูกเลือก
    const [addedDetail, setAddedDetail] = useState([]);
    const filteredProducts = Recipe.filter(product => product.pdc_id === selectedProductType);




    const handleAddDetail = (event: React.FormEvent) => {
        event.preventDefault();

        const selectedProduct = filteredProducts.find(product => product.pd_id === selectedProductId);
        const typepd = productCat.find(type => type.pdc_id === selectedProductType)?.pdc_name;

        if (!selectedProduct) {
            alert('กรุณาเลือกสินค้า');
            return;
        }

        const enteredQuantity = parseInt((document.getElementById('num') as HTMLInputElement).value);
        if (isNaN(enteredQuantity) || enteredQuantity <= 0) {
            alert('กรุณากรอกจำนวนที่ถูกต้อง');
            return;
        }

        const existingDetailIndex = detail.pdodetail.findIndex((detail: PdodDetail) => detail.pd_id === selectedProduct.pd_id);
        if (existingDetailIndex >= 0) {
            const updatedDetail = [...detail.pdodetail];
            updatedDetail[existingDetailIndex].qty += enteredQuantity;
            setDetail({ ...detail, pdodetail: updatedDetail });
        } else {
            const newDetail: PdodDetail = {
                pd_id: selectedProduct.pd_id,
                pd_name: selectedProduct.pd_name,
                pdc_name: typepd || '',
                pdo_id: detail.pdo_id,
                pdod_id: null,
                qty: enteredQuantity,
                status: '1',
            };
            setDetail({ ...detail, pdodetail: [...detail.pdodetail, newDetail] });
        }

        setSelectedProductType(1);
        (document.getElementById('product') as HTMLSelectElement).value = '';
        (document.getElementById('num') as HTMLInputElement).value = '';
    };
    console.log(detail)
    console.log(addedDetail)
    const handleDeleteProduct = (idx: number) => {
        setDetail(prevDetail => {
            const newDetail = { ...prevDetail };
            newDetail.pdodetail.splice(idx, 1);
            return newDetail;

        });
    };

    const [isChecked, setIsChecked] = useState(true); // State to track checkbox status

    const handleCheckboxChange = async (id) => {
        setIsChecked(!isChecked); // Toggle checkbox status
        console.log(isChecked)
    };
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const handleCancel = () => {
        closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    };
    const getProductNameById = (productId) => {
        const product = Recipe.find((item) => item.pd_id === productId);
        return product ? product.pd_name : '';
    };
    const [message, setMessage] = useState('Loading');

    const handleConfirm = async () => {
        const pdo_status = isChecked ? 2 : 1;

        // Prepare data to send to API
        const dataToEdit = [
            ...detail.pdodetail,
            ...addedDetail
        ].map(detail => ({
            pd_id: detail.pd_id,
            qty: detail.qty
        }));

        const postData = {
            productionOrder: [{ pdo_status }],
            productionOrderdetail: dataToEdit,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/addProductionOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const responseData = await response.json();

            if (response.ok) {
                setMessage('Data updated successfully');
                // router.push(`/detail/${detail.pdo_id}`);
            } else {
                setMessage(responseData.message || 'Error occurred');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            setMessage('Error occurred while updating data');
        }

        closeModal();
    };


    //   const handleConfirm = async () => {
    //     closeModal();
    //     const pdo_status = isChecked ? 2 : 1;
    //     const productionOrder = { pdo_status };
    //     const productionOrderdetail = addedDetail.map(detail => ({ qty: detail.num, pd_id: detail.pd_id }));
    //     const postData = {
    //         productionOrder: [productionOrder], // Send productionOrder as an array
    //         productionOrderdetail
    //     };

    //     try {
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/addProductionOrder`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(postData),
    //         });

    //         if (!response.ok) {
    //             throw new Error('ไม่สามารถเพิ่มใบสั่งผลิตได้');
    //         }

    //         console.log('เพิ่มใบสั่งผลิตเรียบร้อยแล้ว!');
    //         closeModal();
    //     } catch (error) {
    //         console.error('เกิดข้อผิดพลาดในการเพิ่มใบสั่งผลิต:', error.message);
    //         // จัดการข้อผิดพลาด (เช่น แสดงข้อความผิดพลาดให้ผู้ใช้เห็น)
    //     }
    //     console.log("รายละเอียดสินค้าทั้งหมด:", postData);
    // };


    // const handleCancel = () => {
    //     closeModal(); // ปิด Modal หลังจากที่รีเซ็ตค่าเรียบร้อย
    // };
    // const getProductNameById = (productId) => {
    //     const product = Recipe.find((item) => item.pd_id === productId);
    //     return product ? product.pd_name : '';
    // };


    return (

        <div>
            <p className='text-[#F2B461] font-medium m-4'>เพิ่มใบสั่งผลิต</p>
            {detail !== null ? (
                <div>

                    <form >
                        <div className="grid grid-cols-4">
                            <div className="flex items-center justify-center">
                                <p className="text-sm px-6 py-2 text-[#73664B] flex items-center w-full">ประเภทสินค้า :</p>
                                <select
                                    id="productType"
                                    value={selectedProductType}
                                    onChange={(e) => setSelectedProductType(parseInt(e.target.value))}
                                    className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6"
                                >
                                    {productCat.map((pd: ProductCat) => (
                                        <option key={pd.pdc_id} value={pd.pdc_id}>
                                            {pd.pdc_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className=" flex items-center justify-center">
                                <p className="text-sm px-5 py-2 text-[#73664B] flex justify-center w-full">สินค้า :</p>
                                <select
                                    onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
                                    id="product"
                                    className="bg-[#E3D8BF] w-full block rounded-md border py-1 text-[#73664B] shadow-sm sm:text-sm sm:leading-6"
                                >
                                    {filteredProducts.map((product) => (
                                        <option key={product.pd_id} value={product.pd_id}>
                                            {product.pd_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className=" flex items-center justify-center">
                                <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center w-full">จำนวน :</p>
                                <input
                                    value={detail.num} // Use the value from the state variable
                                    id="num"
                                    placeholder="จำนวน"
                                    type="number"
                                    min={1}
                                    autoComplete="off"
                                    className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                                    onChange={(e) => setDetail({ ...detail, num: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="scale-75 w-1/2 h-auto flex justify-center items-center">
                                <Button
                                    onClick={handleAddDetail}
                                    type="submit"
                                    value="เพิ่มสินค้า"
                                    className="text-lg text-white border  bg-[#F2B461] rounded-full py-2 px-2 ">เพิ่มสินค้า</Button>
                            </div>
                        </div>
                    </form>
                    <p className="text-m px-6 py-2 text-[#73664B]">รายละเอียดใบสั่งผลิต</p>

                    <div className="relative overflow-x-auto mx-6 mt-2">
                        <table className="w-full text-sm text-center text-gray-500 ">
                            <thead >
                                <tr className="text-white  font-normal  bg-[#908362] ">
                                    <td scope="col" className="px-6 py-3">
                                        ประเภทสินค้า
                                    </td>
                                    <td scope="col" className="px-6 py-3">
                                        สินค้า
                                    </td>
                                    <td scope="col" className="px-6 py-3">
                                        จำนวน
                                    </td>
                                    <td scope="col" className="px-6 py-3">

                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {detail.pdodetail.map((pdodetail, idx) => (
                                    <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                        <td
                                            scope="row"
                                            className="px-6 py-1 whitespace-nowrap dark:text-white">
                                            {pdodetail.pdc_name}
                                        </td>
                                        <td className="px-6 py-1">{pdodetail.pd_name}</td>
                                        <td className="px-6 py-1 h-10 ">
                                            {pdodetail.qty}
                                        </td>
                                        <td >
                                            <button onClick={() => handleDeleteProduct(idx)}>
                                                <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                        </td>
                                    </tr>
                                ))}
                                {addedDetail.map((detail, idx) => (
                                    <tr key={idx} className="odd:bg-white  even:bg-[#F5F1E8] border-b h-10">
                                        <td scope="row"
                                            className="px-6 py-1 whitespace-nowrap dark:text-white">{detail.pdc_name}</td>
                                        <td className="px-6 py-1">{getProductNameById(detail.pd_id)}</td>
                                        <td className="px-6 py-1 h-10 ">{detail.qty}</td>
                                        <td >

                                            <button onClick={() => handleDeleteProduct(idx)}>
                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="ml-6 mt-5">
                <Checkbox radius="sm" color="warning" onChange={handleCheckboxChange} checked={isChecked}>
                    ยืนยันการดำเนินการผลิต
                </Checkbox>
            </div>
            <div className="flex justify-start">
                <div className="w-1/2  mt-10  flex justify-start " >
                    <Link href="/product/sell_all">
                        <Button href="/product/sell_all"
                            onClick={handleCancel}
                            type="button"
                            className=" text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                            ยกเลิก</Button>
                    </Link>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment} >
                                <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`} >
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B]"
                                                    >
                                                        ยืนยันการแก้ไขใบสั่งผลิต
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการแก้ไขใบสั่งผลิตหรือไม่
                                                        </p>
                                                    </div>
                                                    {/*  choose */}
                                                    <div className="flex justify-end">
                                                        <div className="inline-flex justify-end">
                                                            <button
                                                                type="button"
                                                                className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeModal}
                                                            >
                                                                ยกเลิก
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={handleConfirm}
                                                            ><Link href={`../listorder`}>
                                                                    ยืนยัน
                                                                </Link></button>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )
                        }
                    </>
                    <Button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</Button>
                </div >
            </div>
        </div>


    )
}

export default Editpdod