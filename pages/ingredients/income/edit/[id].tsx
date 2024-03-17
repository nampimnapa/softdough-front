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
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/router";
const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});
function Index() {
    const router = useRouter();
    const { id } = router.query;

    const [Ind, setInd] = useState({
        ind_name: '',
        un_purchased: '',
        un_purchased_name: '',
        un_ind: 0,
        un_ind_name: 0,
        qtyminimum: 0,
        qty_per_unit: 0,
    });
    const [message, setMessage] = useState('Loading');
    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    const [ind, setIngredientLot] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [indde, setIngredientsde] = useState<any[]>([]);


    const [additionalIngredients, setAdditionalIngredients] = useState([]);

    const [ingrelot, setIngrelot] = useState(indde);
    const [isOpen, setIsOpen] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [dataForm, setDataForm] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setDataForm({ dataaToEdit: ingrelot[0].indde })
        setIsOpen(true);
    };

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    // const handleSubmit = (e, lotIndex) => {
    //     e.preventDefault();
    //     const priceValue = e.target.price ? parseInt(e.target.price.value) : null;
    //     const countInt = parseInt(e.target.count.value, 10);
    //     const newIngredientData = {
    //         ind_id: e.target.ingredients.value,
    //         qtypurchased: countInt,
    //         date_exp: value.startDate,
    //         price: priceValue,
    //     };

    //     const updatedIngrelot = [...ingrelot];
    //     if (lotIndex >= 0 && lotIndex < updatedIngrelot.length) {
    //         const existingLot = updatedIngrelot[lotIndex];
    //         if (existingLot) {
    //             existingLot.ingre.push(newIngredientData);
    //         }
    //     }

    //     setIngrelot(updatedIngrelot);
    //     e.target.reset();
    //     setIsModified(true);
    //     setValue({
    //         startDate: null,
    //         endDate: null
    //     })
    //     console.log("Data submit: ", updatedIngrelot);
    // };


    // const handleDeleteIngredient = (lotIndex, ingreIndex) => {
    //     const updatedIngrelot = [...ingrelot];
    //     if (
    //         lotIndex >= 0 && lotIndex < updatedIngrelot.length &&
    //         ingreIndex >= 0 && ingreIndex < updatedIngrelot[lotIndex].ingre.length
    //     ) {
    //         const isAddingOrModifying = isModified || updatedIngrelot[lotIndex].ingre.length > 0;
    //         updatedIngrelot[lotIndex].ingre.splice(ingreIndex, 1);
    //         setIngrelot(updatedIngrelot);


    //         if (isAddingOrModifying) {
    //             setIsModified(true);
    //         }
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceValue = e.target.price ? parseInt(e.target.price.value) : null;
        const countInt = parseInt(e.target.count.value, 10);
        const newIngredientData = {
            name: e.target.ingredients.value,
            quantity: countInt,
            exp: value.startDate,
            price: priceValue,
        };

        setAdditionalIngredients([...additionalIngredients, newIngredientData]);
        e.target.reset();
        setValue({
            startDate: null,
            endDate: null
        });
    };

    const handleDeleteIngredient = (index) => {
        const updatedIngredients = [...indde];
        updatedIngredients.splice(index, 1);
        setIngredientsde(updatedIngredients);
    };

    interface Ingredients {
        ind_id: string;
        ind_name: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []); // Run only once on component mount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/readlot/${id}`);
                const data = await response.json();
                setIngredientLot(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/ingredientLotDetails/${id}`)
                .then(response => response.json())
                .then(data => {
                    setIngredientsde(data.data);
                })
                .catch(error => {
                    console.error('Error fetching ingredient details:', error);
                });
        }
        fetchData();
    }, [id]);

    const handleEditWork = async () => {
        setIsOpen(false);
        const requestData = {
            ingreLotData: indde, // ใช้ข้อมูล indde ที่เก็บข้อมูลวัตถุดิบที่แก้ไขแล้ว
            // ข้อมูลอื่น ๆ ที่คุณต้องการส่งไปด้วย request
        };
        setIsOpen(false);
        console.log("handleEditWork", dataForm);
        const updatedIngrelot = [...ingrelot];

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/editData/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // ส่งข้อมูลที่ต้องการอัปเดตไปยังเซิร์ฟเวอร์
        });
        const responseData = await response.json();
        if (responseData.message === 'success') {
            setMessage('Data updated successfully');
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
        setIsModified(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInd((prevFormIn) => ({
            ...prevFormIn,
            [name]: value,
        }));
    };

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
            {ind !== null ? (
                <div>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {ind.indl_id_name}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {ind.created_at}</p>
                    <form onSubmit={handleSubmit}>
                        {/* <input type="hidden" name="lotno" id="lotno" value={lot.lotno} /> */}
                        <div className="grid grid-cols-6">
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
                                <select id="ingredients"
                                    className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                                    {Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind: Ingredients) => (
                                        <option key={ind.ind_id} value={ind.ind_name}>
                                            {ind.ind_name}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">
                                จำนวน :
                                <input
                                    min="1"
                                    type="number"
                                    name="count"
                                    id="count"
                                    className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                                {/* ใส่หน่วยวัตถุดิบตรง span */}
                            </p>
                            <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                                <p>วันหมดอายุ: </p>
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={value}
                                    onChange={handleValueChange}
                                /></div>
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :
                                <input
                                    min="0"
                                    type="number"
                                    pattern="[0-9]+([.,][0-9]+)?"
                                    name="price"
                                    id="price"
                                    className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                /></p>
                            <input
                                type="submit"
                                value="เพิ่มวัตถุดิบ"
                                className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 scale-75 w-1/2" />
                        </div >
                    </form>
                    {additionalIngredients.map((addedIngredient, index) => (
                        <div key={index} className="grid grid-cols-8">
                            <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ:  {addedIngredient.name}</p>
                            <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">จำนวน:  {addedIngredient.quantity}</p>
                            <p className="text-sm px-6 py-2 text-[#73664B] col-span-2 ">วันหมดอายุ:  {addedIngredient.exp}</p>
                            <p className="text-sm px-6 py-2 text-[#73664B]" >ราคา:  {addedIngredient.price}</p>
                            <p className="px-6 py-2">
                                <button onClick={() => handleDeleteIngredient(index)}>
                                    <TrashIcon className="h-5 w-5 text-red-500" /></button>
                            </p>
                        </div>
                    ))}
                    {indde.map((ingredient, Idx) => (
                        <Fragment key={Idx}>
                            <div className="grid grid-cols-8">
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
                                    วัตถุดิบ: {ingredient.ind_name}
                                </p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
                                    จำนวน: {ingredient.qtypurchased}
                                </p>
                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.date_exp}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p>
                                <p className="px-6 py-2">
                                    <button onClick={() => handleDeleteIngredient(Idx)}>
                                        <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                </p>
                            </div>
                        </Fragment>
                    ))}

                    <div className="flex justify-end mt-5">
                        <button
                            onClick={openModal}
                            disabled={!isModified}
                            type="button"
                            className={`mx-auto mr-5 text-white ${!isModified ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#73664B]'
                                } focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`}
                        >
                            เสร็จสิ้น
                        </button>
                    </div>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                                <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${kanit.className}`}>
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-medium leading-6 text-[73664B]"
                                                    >
                                                        ยืนยันการแก้ไขวัตถุดิบเข้าร้าน
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            คุณต้องการแก้ไขวัตถุดิบเข้าร้านหรือไม่
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
                                                                onClick={handleEditWork}>
                                                                ยืนยัน</button>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}
                    </>
                </div>
            ) : null
            }
        </div >
    );
}
export default Index