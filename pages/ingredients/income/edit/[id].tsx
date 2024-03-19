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
import { CheckboxGroup, Checkbox, Input, colors, Button } from "@nextui-org/react";
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
    const [isOpenCencel, setIsOpenCencel] = useState(false);
    const [isModified, setIsModified] = useState(true);
    const [dataForm, setDataForm] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
        setIsOpenCencel(false);
    };

    const openModal = () => {
        // setDataForm({ dataaToEdit: ingrelot[0].indde })
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
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked); // Toggle checkbox status
    //     console.log(isChecked)
    // };
    const handleCheckboxChange = (newValue) => {
        setIsChecked(!isChecked); // Set checkbox status
    };

    // เพิ่มข้อมูลที่กรอกเข้ามา เพื่อเติมเพิ่มวัตถุดิบเพิ่มเติม
    const handleSubmit = async (e) => {
        e.preventDefault();

        const priceValue = e.target.price ? parseInt(e.target.price.value) : null;
        const countInt = parseInt(e.target.count.value, 10);
        const newIngredientData = {
            indlde_id: 0,
            ind_id: parseInt(e.target.ingredients.value),
            qtypurchased: countInt,
            date_exp: value.startDate,
            price: priceValue,
        };

        setAdditionalIngredients([...additionalIngredients, newIngredientData]);
        e.target.reset();
        setValue({
            startDate: null,
            endDate: null
        });
    };

    // ลบวัตถุดิบ
    const handleDeleteIngredient = (index) => {
        console.log("index: ", index);
        const updatedIngredients = [...additionalIngredients];
        updatedIngredients.splice(index, 1);
        console.log("updatedIngredients: ", updatedIngredients);
        setAdditionalIngredients(updatedIngredients);
    };

    interface Ingredients {
        ind_id: string;
        ind_name: string;
    }
    useEffect(() => {
        // ดึงข้อมูลตัวเลือก วัตถุดิบ
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
        // ดึงข้อมูลของ Lot ที่ต้องการ
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
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/ingredientLotDetails/${id}`)  // ดึงข้อมูลรายละเอียดของ Lot ที่ต้องการ
                .then(response => response.json())
                .then(data => {
                    setIngredientsde(data.data);
                    setAdditionalIngredients(data.data);
                })
                .catch(error => {
                    console.error('Error fetching ingredient details:', error);
                });
        }
        fetchData();
    }, [id]);

    const handleEditWork = async () => {
        setIsOpen(false);
        setIsOpen(false);
        // console.log("handleEditWork", dataForm);
        // const updatedIngrelot = [...ingrelot];

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/editData/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "dataaToEdit": additionalIngredients, "status": (isChecked ? 2 : 1) }), // ส่งข้อมูลที่ต้องการอัปเดตไปยังเซิร์ฟเวอร์
        });
        const responseData = await response.json();
        if (responseData.message === 'test เงื่อนไข') {
            setMessage('Data updated successfully');
            router.replace('/ingredients/income/all'); // นำทางไปยังหน้าอื่น
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

    // เช็คว่า มีการเปลี่ยนแปลงข้อมูลที่หน้าเว็บหรือไม่ ถ้าแก้ไข ก็จะสามารถกดปุ่มบันทึกได้
    function areObjectsEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    function areArraysEqual(array1, array2) {
        if (array1.length !== array2.length) return false;

        for (let i = 0; i < array1.length; i++) {
            if (!areObjectsEqual(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    }

    // เช็คการกดย้อนกลับ ว่าค่าเหมือนเดิมมั้ย ถ้าไม่จะขึ้นแจ้งว่า จะบันทึกก่อนไปมั้ย
    const checkCencel = () => {
        if (areArraysEqual(indde, additionalIngredients) || isChecked) { // ถ้าค่าไม่เปลี่ยน จะกลับได้เลย
            router.push('/ingredients/income/all');
        } else { // ถ้าเปลี่ยน จะขึ้น Modal
            setIsOpenCencel(true);
        }
    };
    const noSave = () => {
        router.push('/ingredients/income/all');
    }
    // console.log("handleInputChange", indde);
    // console.log("additionalIngredients", additionalIngredients);
    console.log(areArraysEqual(indde, additionalIngredients))
    // console.log("ind",ind);
    console.log("isChecked", isChecked);


    return (
        <div className=''>
            <button className='my-3 mx-5 ' onClick={checkCencel}>
                <div className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </div>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
            {ind !== null ? (
                <div>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {ind.indl_id_name}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {ind.created_at}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-6">
                            <div className="flex items-center justify-center">
                                <p className="text-sm ml-6 mr-3 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ: </p>
                                <select id="ingredients" required
                                    className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                                    {Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind: Ingredients) => (
                                        <option key={ind.ind_id} value={ind.ind_id}>
                                            {ind.ind_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-center mr-5">
                                <p className="text-sm  text-[#73664B] flex justify-center items-center w-full">จำนวน : </p>
                                <input
                                required
                                    min="1"
                                    // onChange={handleCancelClick}
                                    type="number"
                                    name="count"
                                    id="count"
                                    className="px-3 bg-[#FFFFDD] w-full block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                            <div className="text-sm  py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
                                <p className="w-1/3">วันหมดอายุ: </p>
                                <Datepicker
                                    useRange={false}
                                    asSingle={true}
                                    value={value}
                                    onChange={handleValueChange}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">ราคา : </p>
                                <input
                                required
                                    min="1"
                                    // onChange={handleCancelClick}
                                    type="number"
                                    pattern="[0-9]+([.,][0-9]+)?"
                                    name="price"
                                    id="price"
                                    className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                />
                            </div>
                            <div className="scale-75 w-full my-2 flex justify-end">
                                <Button
                                    type="submit"
                                    value="เพิ่มวัตถุดิบ"
                                    className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 py-2 px-2">เพิ่มวัตถุดิบ</Button>
                            </div>
                        </div >
                    </form>
                    <div className="mx-6 mt-3 h-1/2">
                        <div className="flex flex-col">
                            <div className="bg-[#908362] text-white text-sm flex">
                                <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                                <div className="flex-1 py-3 text-center">จำนวน</div>
                                <div className="flex-1 py-3 text-center">วันหมดอายุ</div>
                                <div className="flex-1 py-3 text-center">ราคา</div>
                                <div className="flex-1 py-3 text-center"></div>
                            </div>
                            <div className="max-h-40 overflow-y-auto mb-5">
                                <table className="w-full">
                                    <tbody className="w-full">
                                        {additionalIngredients.filter(ingredient => !ingredient.deleted_at).map((ingredient, Idx) => (
                                            <tr key={Idx} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                                <td scope="col" className="flex-1 text-center">{Array.isArray(ingredientsOptions) && ingredientsOptions.map((ind: Ingredients) => (
                                                    ind.ind_id === ingredient.ind_id ? (ind.ind_name) : ""
                                                ))}</td>
                                                <td scope="col" className="flex-1 text-center"> {ingredient.qtypurchased}</td>
                                                <td scope="col" className="flex-1 text-center"> {ingredient.date_exp}</td>
                                                <td scope="col" className="flex-1 text-center">{ingredient.price}</td>
                                                <td scope="col" className="flex-1 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <button onClick={() => handleDeleteIngredient(Idx)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div className="ml-6 mt-5">
                        <Checkbox
                            className="text-sm text-[#73664B]"
                            radius="sm"
                            color="warning"
                            onChange={handleCheckboxChange}
                            isSelected={isChecked ? true : false} // หรืออาจใช้ (isChecked === 2)
                        // isSelected={ind.status == "2" ? true : false}
                        >
                            ยืนยันการใช้งาน
                        </Checkbox>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={checkCencel}
                            type="button"
                            className={`mr-5 text-white ${!isModified ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C5B182]'
                                } focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`}
                        >
                            ยกเลิก
                        </button>
                        <button
                            onClick={openModal}
                            disabled={!areArraysEqual(indde, additionalIngredients) || isChecked ? false : true}
                            type="button"
                            className={`mr-5 text-white ${!areArraysEqual(indde, additionalIngredients) || isChecked ? 'bg-[#73664B]' : 'bg-gray-400 cursor-not-allowed'
                                } focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`}
                        >
                            บันทึก
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
                                                                บันทึก</button>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}

                        {isOpenCencel && (
                            <Transition appear show={isOpenCencel} as={Fragment}>
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
                                                        คุณต้องการบันทึกการแก้ไขใหม่นี้หรือไม่
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">
                                                            การแก้ไขของคุณยังไม่ได้รับการบันทึก คุณต้องการออกหรือไม่
                                                        </p>
                                                    </div>
                                                    {/*  choose */}
                                                    <div className="flex justify-between mt-2">
                                                        <button
                                                            type="button"
                                                            className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#fee2e2] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                            onClick={noSave}
                                                        >
                                                            ไม่บันทึก
                                                        </button>
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
                                                                บันทึก</button>
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