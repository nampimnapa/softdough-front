//ในส่วนข้อมูลของแถมกับของที่เลือก เปลี่ยนมาเป็นแสดงก่อนว่ามีอะไรบ้สง แล้วค่อยเลือกใหม่แบบแอดแล้วส่งไป edit พร้อมกับส่วนอื่นๆเอา
import { useState, useEffect, ChangeEvent, Fragment } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

interface Category {
    smt_id: number;
    smt_name: string;
}

interface Product {
    sm_id: number;
    sm_name: string;
    smt_name: string;
    smt_id: number;
}

interface FormData {
    pm_id: number,
    pm_name: string;
    pm_datestart: string;
    pm_dateend: string;
    promotiondetail: { smbuy_id: number; smfree_id: number }[];
}

// Define the structure for promotion details
type PromotionDetail = {
    smbuy_id: number;
    smfree_id: number;
    smbuy_idnamet: string;
    smfree_idnamet: string;
    smbuytype: string;
    smfreetype: string;
};

// Define the structure for the overall promotion
type Promotion = {
    pm_id: number;
    pm_name: string;
    pm_datestart: string;
    pm_dateend: string;
    detail: PromotionDetail[]; // Array of details
};


const AddPromotion: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Loading');
    const [unitOptions, setUnitOptions] = useState<Category[]>([]);
    const [checkedCategories, setCheckedCategories] = useState<Category[]>([]);
    const [checkedCategories1, setCheckedCategories1] = useState<Category[]>([]);

    const [startValue, setStartValue] = useState<{ startDate: string | null; endDate: string | null }>({ startDate: null, endDate: null });
    const [endValue, setendValue] = useState<{ startDate: string | null; endDate: string | null }>({ startDate: null, endDate: null });
    const [formData, setFormData] = useState<FormData>({
        pm_id: 0,
        pm_name: '',
        pm_datestart: '',
        pm_dateend: '',
        promotiondetail: []
    });


    const [promotion, setPromotion] = useState<Promotion>({
        pm_id: 0,
        pm_name: "",
        pm_datestart: "",
        pm_dateend: "",
        detail: [], // Empty array for details
    });
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const [selectedKeys1, setSelectedKeys1] = useState<Set<string>>(new Set());

    const [ingredientsOptions, setIngredientsOptions] = useState<Product[]>([]);
    const [ingredientsOptions1, setIngredientsOptions1] = useState<Product[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmt`)
            .then(response => response.json())
            .then(data => setUnitOptions(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const fetchProductsByCategory = (smt_ids: number[]) => {
        const params = new URLSearchParams();
        smt_ids.forEach(id => params.append('smt_id', id.toString()));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmfromt?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    };
    const fetchProductsByCategory1 = (smt_ids: number[]) => {
        const params = new URLSearchParams();
        smt_ids.forEach(id => params.append('smt_id', id.toString()));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/salesmenu/readsmfromt?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                setIngredientsOptions1(data)
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPromotion((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, category: Category) => {
        const { checked } = event.target;
        const newCheckedCategories = checked
            ? [...checkedCategories, category]
            : checkedCategories.filter(c => c.smt_id !== category.smt_id);

        setCheckedCategories(newCheckedCategories);

        const selectedIds = newCheckedCategories.map(c => c.smt_id);
        if (selectedIds.length > 0) {
            fetchProductsByCategory(selectedIds);
        } else {
            setIngredientsOptions([]);  // Clear options if no category is selected
        }
    };

    const handleCheckboxChange1 = (event: ChangeEvent<HTMLInputElement>, category: Category) => {
        const { checked } = event.target;
        const newCheckedCategories = checked
            ? [...checkedCategories1, category]
            : checkedCategories1.filter(c => c.smt_id !== category.smt_id);

        setCheckedCategories1(newCheckedCategories);

        const selectedIds = newCheckedCategories.map(c => c.smt_id);
        if (selectedIds.length > 0) {
            fetchProductsByCategory1(selectedIds);
        } else {
            setIngredientsOptions([]);  // Clear options if no category is selected
        }
    };
    // Helper function to format date as YYYY-MM-DD
    const formatDate = (date: Date | null): string => {
        if (!date) return '';  // Handle null values
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async () => {
        // Format dates before submission
        const formattedStartDate = formatDate(promotion.pm_datestart ? new Date(promotion.pm_datestart) : null);
        const formattedEndDate = formatDate(promotion.pm_dateend ? new Date(promotion.pm_dateend) : null);

        // Convert selectedKeys and selectedKeys1 to arrays of numbers
        const smbuyIds = Array.from(selectedKeys).map(id => parseInt(id, 10));
        const smfreeIds = Array.from(selectedKeys1).map(id => parseInt(id, 10));

        // Create promotiondetail with smbuy_id and smfree_id as arrays
        const details = {
            smbuy_id: smbuyIds,
            smfree_id: smfreeIds
        };

        // Update form data with formatted dates
        const newFormData = {
            ...promotion,
            pm_datestart: formattedStartDate,
            pm_dateend: formattedEndDate,
            promotiondetail: [details] // Wrap details in an array to match the required format
        };

        console.log('newFormData:', newFormData);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/updatefree`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            });

            const responseData = await response.json();

            if (responseData.message === 'success') {
                setMessage('Data added successfully');
                router.push('/promotion/freeall');
                console.log('Selected Keys:', Array.from(selectedKeys));
                console.log('Selected Keys1:', Array.from(selectedKeys1));
                console.log('Details:', details);

            } else {
                setMessage(responseData.message || 'Error occurred');
                openModal();
            }
        } catch (error) {
            console.error('Submit Error:', error);
            setMessage('Error occurred');
            openModal();
        }
    };




    const handleValueChange = (newValue: { startDate: string | null; endDate: string | null }) => {
        setStartValue(newValue);
        setFormData(prevForm => ({ ...prevForm, pm_datestart: newValue.startDate }));
    };

    const handleValueChange1 = (newValue: { startDate: string | null; endDate: string | null }) => {
        setendValue(newValue);
        setFormData(prevForm => ({ ...prevForm, pm_dateend: newValue.startDate }));
    };

    const getSelectedNames = () => {
        // Map selectedKeys to their corresponding names
        const selectedNames = ingredientsOptions
            .filter(ingredient => selectedKeys.has(ingredient.sm_id.toString()))
            .map(ingredient => `${ingredient.sm_name}${ingredient.smt_name ? ` (${ingredient.smt_name})` : ''}`);

        return selectedNames.join(", ");
    };
    const getSelectedNames1 = () => {
        // Map selectedKeys to their corresponding names
        const selectedNames = ingredientsOptions1
            .filter(ingredient => selectedKeys1.has(ingredient.sm_id.toString()))
            .map(ingredient => `${ingredient.sm_name}${ingredient.smt_name ? ` (${ingredient.smt_name})` : ''}`);

        return selectedNames.join(", ");
    };


    //edit
    const { id } = router.query;



    useEffect(() => {

        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/promotion/readfreedetail/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // Check if data is an array and extract the first object
                    const promotionData = Array.isArray(data) && data.length > 0 ? data[0] : data;

                    // Ensure the dates are in a format Datepicker can handle
                    const formattedData = {
                        ...promotionData,

                        pm_datestart: promotionData.pm_datestart ? new Date(promotionData.pm_datestart) : null,
                        pm_dateend: promotionData.pm_dateend ? new Date(promotionData.pm_dateend) : null,
                    };

                    setPromotion(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setLoading(false);
                });
        }
    }, [id]);


    console.log("pro", promotion);

    // const handleDateChange = (field: 'pm_datestart' | 'pm_dateend', date: { startDate: Date, endDate: Date }) => {
    //     console.log('Date changed:', date);
    //     setPromotion((prevFormIn) => ({
    //         ...prevFormIn,
    //         [field]: date.startDate || date.endDate,
    //     }));
    // };

    const handleDateChange = (field: 'pm_datestart' | 'pm_dateend', date: DateRangeType) => {
        console.log('Date changed:', date);
        setPromotion((prevFormIn) => ({
            ...prevFormIn,
            [field]: date.startDate || date.endDate,
        }));
        console.log(promotion)
    };

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5'>
                <Link href={`/promotion/${id}`} className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />

                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-[#C5B182] py-2'>แก้ไขโปรโมชันของแถม</p>
            <div className="mt-5">
                <div className="w-1/2">
                    <div className="grid grid-cols-3 items-center">
                        <label className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
                            วันที่เริ่มโปรโมชัน :
                        </label>
                        <div className="col-span-2">
                            <Datepicker
                                useRange={false}  // เลือกเพียงวันเดียว ไม่ใช้ช่วงเวลา
                                asSingle={true}   // ใช้ในโหมดที่เลือกวันเดียว
                                value={{
                                    startDate: promotion.pm_datestart ? new Date(promotion.pm_datestart) : null,  // ค่าเริ่มต้นวันที่ ถ้ามี pm_datestart
                                    endDate: promotion.pm_datestart ? new Date(promotion.pm_datestart) : null,  // ค่าเดียวกับ startDate
                                }}
                                onChange={(date) => handleDateChange('pm_datestart', date)}
                            />


                        </div>
                        <label className="text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5 items-center">
                            วันที่สิ้นสุดโปรโมชัน :
                        </label>
                        <div className="col-span-2">
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={{
                                    startDate: promotion.pm_dateend || null, // Ensure Date object or null
                                    endDate: promotion.pm_dateend || null,
                                }}
                                onChange={(date) => handleDateChange('pm_dateend', date)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <label htmlFor="pm_name" className="block text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
                            ชื่อโปรโมชัน :
                        </label>
                        <div className="mt-2 col-span-2">
                            <input
                                placeholder="ชื่อโปรโมชัน"
                                value={promotion.pm_name}
                                onChange={handleInputChange}
                                type="text"
                                name="pm_name"
                                autoComplete="off"
                                className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <p className="mx-6 my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียด</p>

                <div className="flex flex-col ml-6 mt-3 mr-6">
                    <div className="flex items-center ">
                        <div className="text-sm font-medium leading-6 text-[#73664B] mr-2">
                            ข้อมูลสินค้าที่ซื้อของโปรโมชันปัจจุบัน :
                        </div>
                        <div className="text-sm text-[#73664B]">
                            {promotion.detail && promotion.detail.length > 0 ? (
                                <ul className="flex flex-wrap">
                                    {Array.from(
                                        new Set(promotion.detail.map(item => `${item.smbuy_idnamet} (${item.smbuytype})`))
                                    ).map((uniqueItem, index, array) => (
                                        <li key={index} className="mr-2 mb-1">
                                            {uniqueItem}
                                            {index < array.length - 1 && ", "} {/* คั่นด้วย , เฉพาะถ้าไม่ใช่ตัวสุดท้าย */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>ไม่มีข้อมูลสินค้าที่ซื้อในโปรโมชันนี้</p>
                            )}
                        </div>

                    </div>
                    <p className="mb-3 text-sm font-medium text-[#73664B]">
                        เลือกสินค้าที่ต้องซื้อใหม่
                    </p>


                    <div className="flex flex-row">
                        <div className="flex basis-1/4">
                            <label className="text-sm font-medium leading-6 text-[#73664B] ">
                                ค้นหา:
                            </label>
                            <div className="max-w-xs flex flex-col text-[#73664B]">
                                {unitOptions.map(category => (
                                    <Checkbox
                                        key={category.smt_id}
                                        color="warning"
                                        checked={checkedCategories.some(c => c.smt_id === category.smt_id)}
                                        onChange={(e) => handleCheckboxChange(e, category)}
                                        className="text-sm text-[#73664B] mb-2"
                                    >
                                        {category.smt_name}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>

                        <div className="flex basis-1/4">
                            <label className="text-sm font-medium leading-6 text-[#73664B] ">
                                สินค้า :
                            </label>
                            <div className="flex flex-col" style={{ width: '80%' }}>
                                <Select
                                    selectionMode="multiple"
                                    placeholder="เลือกสินค้า"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={(keys) => {
                                        const stringKeys = new Set(Array.from(keys).map(String));
                                        setSelectedKeys(stringKeys);
                                    }}
                                    style={{
                                        maxWidth: '25rem',
                                        backgroundColor: '#E3D8BF',
                                        borderRadius: '0.375rem',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                        color: '#73664B',
                                    }}
                                >
                                    {ingredientsOptions.map((ingredient) => (
                                        <SelectItem key={ingredient.sm_id} value={ingredient.sm_id}>
                                            {`${ingredient.sm_name} (${ingredient.smt_name})`}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="flex basis-2/4">
                            <div className="text-sm font-medium leading-6 text-[#73664B] text-right mr-5">
                                สินค้าที่เลือก : {getSelectedNames()}
                            </div>
                        </div>
                    </div>
                </div>


                {/* ของแถม       */}

                <div className="flex flex-col ml-6 mt-3 mr-6">
                    <div className="flex items-center mt-3">
                        <div className="text-sm font-medium leading-6 text-[#73664B] mr-2 ">
                            ข้อมูลสินค้าของแถมของโปรโมชันปัจจุบัน :
                        </div>
                        <div className="text-sm text-[#73664B]">
                            {promotion.detail && promotion.detail.length > 0 ? (
                                <ul className="flex flex-wrap">
                                    {Array.from(
                                        new Set(promotion.detail.map(item => `${item.smfree_idnamet} (${item.smfreetype})`))
                                    ).map((uniqueItem, index, array) => (
                                        <li key={index} className="mr-2 mb-1">
                                            {uniqueItem}
                                            {index < array.length - 1 && ", "} {/* คั่นด้วย , เฉพาะถ้าไม่ใช่ตัวสุดท้าย */}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>ไม่มีข้อมูลสินค้าที่ซื้อในโปรโมชันนี้</p>
                            )}
                        </div>
                    </div>
                    <p className="mb-3 text-sm font-medium text-[#73664B]">
                        เลือกของแถมใหม่
                    </p>
                    <div className="flex flex-row">
                        <div className="flex basis-1/4">
                            <label className="text-sm font-medium leading-6 text-[#73664B] ">
                                ค้นหา:
                            </label>
                            <div className="max-w-xs flex flex-col text-[#73664B]">
                                {unitOptions.map(category => (
                                    <Checkbox
                                        key={category.smt_id}
                                        color="warning"
                                        checked={checkedCategories1.some(c => c.smt_id === category.smt_id)}
                                        onChange={(e) => handleCheckboxChange1(e, category)}
                                        className="text-sm text-[#73664B] mb-2"
                                    >
                                        {category.smt_name}
                                    </Checkbox>
                                ))}
                            </div>
                        </div>

                        <div className="flex basis-1/4">
                            <label className="text-sm font-medium leading-6 text-[#73664B] ">
                                สินค้า :
                            </label>
                            <div className="flex flex-col" style={{ width: '80%' }}>

                                <Select
                                    selectionMode="multiple"
                                    placeholder="เลือกสินค้า"
                                    selectedKeys={selectedKeys1}
                                    onSelectionChange={(keys) => {
                                        const stringKeys = new Set(Array.from(keys).map(String));
                                        setSelectedKeys1(stringKeys);
                                    }}
                                    style={{
                                        maxWidth: '25rem',
                                        backgroundColor: '#E3D8BF',
                                        borderRadius: '0.375rem',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                        color: '#73664B',
                                    }}
                                >
                                    {ingredientsOptions1.map((ingredient) => (
                                        // <SelectItem key={ingredient.sm_id} value={ingredient.sm_id}>
                                        //     {ingredient.sm_name}
                                        //     {ingredient.smt_name ? `(${ingredient.smt_name})` : ''}
                                        // </SelectItem>
                                        <SelectItem key={ingredient.sm_id} value={ingredient.sm_id}>
                                            {`${ingredient.sm_name} (${ingredient.smt_name}) ${ingredient.sm_id}`}
                                        </SelectItem>
                                    ))}
                                </Select>

                            </div>

                        </div>

                        <div className="flex basis-2/4">
                            <div className="text-sm font-medium leading-6 text-[#73664B] text-right mr-5">
                                สินค้าที่เลือก : {getSelectedNames1()}
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className="flex justify-center my-8 gap-x-6">
                    <button
                        onClick={handleSubmit}
                        className="rounded-md bg-[#F2B461] py-2 px-10 text-sm font-semibold text-white shadow-sm hover:bg-[#D9CAA7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73664B]"
                    >
                        บันทึก
                    </button>
                </div> */}
            </div>
            <div className="flex justify-start">
                <div className="w-1/2 mt-10 flex justify-start">
                    <button>
                        <Link href={`/promotion/${id}`} type="button" className="text-white bg-[#C5B182] focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 mb-2 ml-6">
                            ยกเลิก
                        </Link>
                    </button>
                    <>
                        {isOpen && (
                            <Transition appear show={isOpen} as={Fragment} >
                                <Dialog as="div" className={`relative z-10 ${kanit.className}`} onClose={closeModal} >
                                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <div className="fixed inset-0 bg-black/25" />
                                    </Transition.Child>
                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#73664B]">
                                                        ยืนยันการแก้ไขโปรโมชันของแถม
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-[#73664B]">คุณต้องการแก้ไขโปรโมชันของแถม</p>
                                                    </div>
                                                    <div className="flex justify-end mt-2">
                                                        <div className="inline-flex justify-end">
                                                            <Button type="button" className="text-[#73664B] bg-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={closeModal}>
                                                                ยกเลิก
                                                            </Button>
                                                            <Button type="button" className="bg-white text-[#C5B182] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] hover:text-[#73664B] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={handleSubmit}>
                                                                ยืนยัน
                                                            </Button>
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
                    <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                        บันทึก
                    </button>
                </div>
            </div>

            {/* <Transition appear show={isOpen} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Notification
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {message}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <Button
                                            type="button"
                                            onClick={closeModal}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            OK
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </div>
    );
};

export default AddPromotion;