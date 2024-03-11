// import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
// import Link from "next/link";
// import {
//     ChevronLeftIcon,
//     MagnifyingGlassIcon,
//     PlusIcon,
//     PencilSquareIcon,
//     TrashIcon
// } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// import Datepicker from "react-tailwindcss-datepicker";
// import { useRouter } from "next/router";
// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });
// function edit() {
//     // const ingreunit = {
//     //     "แป้ง": "ถุง",
//     //     "น้ำตาล": "ถุง",
//     //     "นม": "แกลลอน",
//     //     "เนย": "ชิ้น"
//     // };

//     const router = useRouter();
//     const { id } = router.query;
//     const [message, setMessage] = useState('Loading');
//     const [pendingData, setPendingData] = useState<FormData[]>([]);
//     // const [addedIngredients, setAddedIngredients] = useState<FormData[]>([]);
//     const [ingredientOptions, setUnitOptions] = useState([]);
//     const [formData, setFormData] = useState<FormData>({
//         indlde_id: 0,
//         ind_id: '',
//         indl_id: id ? id as string : '', // Only set if id exists
//         qtypurchased: 0,
//         date_exp: '',
//         price: 0,
//         ind_name: ''
//     });

//     interface IngredientType {

//         ind_id: string,
//         ind_name: string,
//         un_purchased: string,
//         qtyminimum: number,
//         un_ind: string,
//         qty_per_unit: number,
//         status: string
//         // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
//     }
//     interface FormData {
//         indlde_id: number,
//         ind_id: string,
//         indl_id: string,
//         qtypurchased: number,
//         date_exp: string,
//         price: number
//         ind_name: string
//     }

//     // const [ingrelot, setIngrelot] = useState([
//     //     {
//     //         lotno: "LOT01",
//     //         date: '10/10/2555',
//     //         ingre: [
//     //             {
//     //                 name: 'แป้ง',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '500'
//     //             },
//     //             {
//     //                 name: 'น้ำตาล',
//     //                 count: "2",
//     //                 unit: "ถุง",
//     //                 exp: "10/10/2556",
//     //                 price: '100'
//     //             }
//     //         ],
//     //     },
//     // ]);
//     const handleEditWork = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/ingredient/editData/${id}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(pendingData),
//             });

//             const responseData = await response.json();

//             if (responseData.message === 'success') {
//                 setMessage('Data added successfully');
//                 setPendingData([]);  // รีเซ็ต pendingData หลังจากเพิ่มข้อมูลสำเร็จ
//             } else {
//                 setMessage(responseData.message || 'Error occurred');
//             }

//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Error occurred');
//         }
//     };
//     useEffect(() => {
//         fetch('http://localhost:8080/ingredient/read')
//             .then(response => response.json())
//             .then(data => {
//                 setUnitOptions(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });
//     }, []);
//     const [ind, setIngredientLot] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [indde, setIngredientsde] = useState<any[]>([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/ingredient/readlot/${id}`);
//                 const data = await response.json();
//                 setIngredientLot(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error:', error);
//                 setLoading(false);
//             }
//         };
//         if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
//             fetch(`http://localhost:8080/ingredient/ingredientLotDetails/${id}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     setIngredientsde(data.data);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching ingredient details:', error);
//                 });
//         }
//         fetchData();
//     }, [id]);

//     const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         const [ind_id, ind_name] = value.split(':');

//         setFormData(prevData => ({
//             ...prevData,
//             ind_id,
//             ind_name
//         }));
//     };

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         // เพิ่มข้อมูลลงใน pendingData
//         setPendingData(prevData => [...prevData, formData]);

//         // รีเซ็ตฟอร์มหลังจากเพิ่มข้อมูล
//         setFormData({
//             indlde_id: 0,
//             ind_id: '',
//             indl_id: id ? id as string : '',
//             qtypurchased: 0,
//             date_exp: '',
//             price: 0,
//             ind_name: ''
//         });
//     };

//     // const handleAddIngredient = (newIngredient) => {
//     //     setIngrelot((prevIngrelot) => {
//     //         const updatedIngrelot = [...prevIngrelot];

//     //         // ตรวจสอบว่า lotIndex มีค่าหรือไม่
//     //         const lotIndex = updatedIngrelot.findIndex((lot) => lot.lotno === newIngredient.lotno);
//     //         if (lotIndex !== -1) {
//     //             // ตรวจสอบว่า property ingre มีค่าหรือไม่
//     //             if (updatedIngrelot[lotIndex].ingre) {
//     //                 updatedIngrelot[lotIndex].ingre.push(newIngredient.ingre[0]);
//     //             } else {
//     //                 updatedIngrelot[lotIndex].ingre = [newIngredient.ingre[0]];
//     //             }
//     //         }

//     //         return updatedIngrelot;
//     //     });
//     // };

//     const [isOpen, setIsOpen] = useState(false);

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const openModal = () => {
//         setIsOpen(true);
//     };
//     // const ingredients = {
//     //     name: [
//     //         "แป้ง",
//     //         "น้ำตาล",
//     //         "นม",
//     //         "เนย"]
//     // }
//     const [value, setValue] = useState({
//         startDate: null,
//         endDate: null
//     });
//     const handleValueChange = (newValue) => {
//         console.log("newValue:", newValue);
//         setValue(newValue);
//     }
//     const [addedIngredients, setAddedIngredients] = useState([]);

//     // const handleSubmit = (e, lotIndex) => {
//     //     e.preventDefault();

//     //     const priceValue = e.target.price ? e.target.price.value : null;
//     //     const ingredientData = {
//     //         name: e.target.ingredients.value,
//     //         count: e.target.count.value,
//     //         // unit: "your_unit_value",  // ค่าจริงที่คุณได้รับจากฟอร์มหรือที่ต้องการ
//     //         exp: value.startDate,
//     //         price: priceValue,
//     //     };

//     //     handleAddIngredient({ lotno: ingrelot[lotIndex].lotno, ingre: [ingredientData] });
//     // };
//     // const handleDeleteIngredient = (lotIndex, ingreIndex) => {
//     //     setFormData((prevData) => {
//     //         const updatedIngrelot = [...prevIngrelot];
//     //         updatedIngrelot[lotIndex].ingre.splice(ingreIndex, 1);
//     //         return updatedIngrelot;
//     //     });
//     // };
//     const handleDeletePendingData = (indexToDelete: number) => {
//         setPendingData(prevData => prevData.filter((_, index) => index !== indexToDelete));
//     };

//     return (
//         <div className='h-screen'>
//             <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบเข้าร้าน
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
//             {/* {ingredientOptions.map((lot, idx) => ( */}
//             <div>
//                 {ind !== null ? (
//                     <div>
//                         <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {ind.indl_id_name}</p>
//                         <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {ind.created_at}</p>
//                     </div>
//                 ) : (
//                     <p className="text-sm px-6 py-2 text-[#73664B]">ไม่มีข้อมูล</p>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-6">
//                         <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
//                             <select id="ingredients"
//                                 className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6"
//                                 name="ind_id"
//                                 value={`${formData.ind_id}:${formData.ind_name}`}  // ใช้ `:` เป็นตัวแยกระหว่าง ind_id และ ind_name
//                                 onChange={handleSelectChange}>
//                                 <option value="">เลือกวัตถุดิบ  </option>
//                                 {ingredientOptions.map((ind: IngredientType) => (
//                                     <option key={ind.ind_id} value={`${ind.ind_id}:${ind.ind_name}`}>
//                                         {ind.ind_name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </p>
//                         <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">
//                             จำนวน :
//                             <input
//                                 min="0"
//                                 type="number"
//                                 name="qtypurchased"
//                                 value={formData.qtypurchased}
//                                 onChange={handleInputChange}
//                                 id="count"
//                                 className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                             />
//                             {/* ใส่หน่วยวัตถุดิบตรง span */}
//                             {/* <span>{ingreunit[lot.ingre[0].name] || ''}</span>  */}
//                         </p>


//                         <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
//                             <p>วันหมดอายุ: </p>
//                             <input
//                                 type="date"
//                                 name="date_exp"
//                                 value={formData.date_exp}
//                                 onChange={handleInputChange}
//                             />
//                         </div>
//                         <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
//                             min="0"
//                             type="number"
//                             pattern="[0-9]+([.,][0-9]+)?"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleInputChange}
//                             id="price"
//                             className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                         /></p>
//                         <input
//                             type="submit"
//                             value="เพิ่มวัตถุดิบ"
//                             className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 scale-75 w-1/2" />
//                     </div >
//                 </form>
//                 {indde.map((ingredient, Idx) => (
//                         <Fragment key={Idx}>
//                             <div className="grid grid-cols-8">
//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วัตถุดิบ : {ingredient.ind_name}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">จำนวน : {ingredient.qtypurchased} </p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.date_exp}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p>
//                                 <p className="px-6 py-2">
//                                     <button onClick={() => handleDeletePendingData}>
//                                         <TrashIcon className="h-5 w-5 text-red-500" /></button>
//                                 </p></div>

//                         </Fragment>
//                     ))}
//             </div>
//             {/* // ))} */}
//             <div className="flex justify-end  mt-5" >
//                 <button onClick={openModal}
//                     type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
//                     เสร็จสิ้น
//                     {/* <Link href="/ingredients/income/all">
//                         เสร็จสิ้น</Link> */}
//                 </button>

//             </div>
//             <>
//                 {isOpen && (
//                     <Transition appear show={isOpen} as={Fragment}>
//                         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0"
//                                 enterTo="opacity-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <div className="fixed inset-0 bg-black/25" />
//                             </Transition.Child>
//                             <div className="fixed inset-0 overflow-y-auto">
//                                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                                     <Transition.Child
//                                         as={Fragment}
//                                         enter="ease-out duration-300"
//                                         enterFrom="opacity-0 scale-95"
//                                         enterTo="opacity-100 scale-100"
//                                         leave="ease-in duration-200"
//                                         leaveFrom="opacity-100 scale-100"
//                                         leaveTo="opacity-0 scale-95"
//                                     >
//                                         <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${kanit.className}`}>
//                                             <Dialog.Title
//                                                 as="h3"
//                                                 className="text-lg font-medium leading-6 text-[73664B]"
//                                             >
//                                                 ยืนยันการแก้ไขวัตถุดิบเข้าร้าน
//                                             </Dialog.Title>
//                                             <div className="mt-2">
//                                                 <p className="text-sm text-[#73664B]">
//                                                     คุณต้องการแก้ไขวัตถุดิบเข้าร้านหรือไม่
//                                                 </p>
//                                             </div>
//                                             {/*  choose */}
//                                             <div className="flex justify-end">
//                                                 <div className="inline-flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                         onClick={closeModal}
//                                                     >
//                                                         ยกเลิก
//                                                     </button>

//                                                     <button
//                                                         type="button"
//                                                         className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                         onClick={handleEditWork}>
//                                                         ยืนยัน</button>
//                                                 </div>
//                                             </div>
//                                         </Dialog.Panel>
//                                     </Transition.Child>
//                                 </div>
//                             </div>

//                         </Dialog>

//                     </Transition>
//                 )}
//             </>

//         </div>
//     )
// }

// export default edit



// import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
// import Link from "next/link";
// import {
//     ChevronLeftIcon,
//     MagnifyingGlassIcon,
//     PlusIcon,
//     PencilSquareIcon,
//     TrashIcon
// } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";
// import Datepicker from "react-tailwindcss-datepicker";
// import { useRouter } from "next/router";

// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });
// function Index() {
//     const router = useRouter();
//     const { id } = router.query;
//     // const ingredients = [
//     //     {
//     //         id: "1",
//     //         name: "แป้ง",
//     //         type: "ถุง"
//     //     },
//     //     {
//     //         id: "2",
//     //         name: "น้ำตาล",
//     //         type: "ถุง"
//     //     },
//     //     {
//     //         id: "3",
//     //         name: "นม",
//     //         type: "กล่อง"
//     //     },
//     //     {
//     //         id: "4",
//     //         name: "เนย",
//     //         type: "ถุง"
//     //     }]
//     const [ingredientOptions, setUnitOptions] = useState([]);
//     const [formData, setFormData] = useState<FormData>({
//         indlde_id: '',
//         ind_id: '',
//         indl_id: id ? id as string : '', // Only set if id exists
//         qtypurchased: 0,
//         date_exp: '',
//         price: 0,
//         ind_name: ''
//     });
//     interface IngredientType {

//         ind_id: string,
//         ind_name: string,
//         un_purchased: string,
//         qtyminimum: number,
//         un_ind: string,
//         qty_per_unit: number,
//         status: string
//         // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
//     }

//     interface FormData {
//         indlde_id: string,
//         ind_id: string,
//         indl_id: string,
//         qtypurchased: number,
//         date_exp: string,
//         price: number
//         ind_name: string
//     }
//     useEffect(() => {
//         fetch('http://localhost:8080/ingredient/read')
//             .then(response => response.json())
//             .then(data => {
//                 setUnitOptions(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });
//     }, []);
//     const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         const [ind_id, ind_name] = value.split(':');

//         setFormData(prevData => ({
//             ...prevData,
//             ind_id,
//             ind_name
//         }));
//     };
//      const [ind, setIngredientLot] = useState<any>(null);
//     //  ind
//     const [ingrelotData, setIngredientsde] = useState<any[]>([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/ingredient/readlot/${id}`);
//                 const data = await response.json();
//                 setIngrelot(data);  // ตั้งค่า ind ใหม่ทุกครั้งที่ fetchData ถูกเรียก
//                 // setLoading(false);
//                 // console.log(ind)
//                 // console.log(data)
//             } catch (error) {
//                 console.error('Error:', error);
//                 // setLoading(false);
//             }
//         };
//         if (id) { // ตรวจสอบว่า id มีค่าหรือไม่
//             fetch(`http://localhost:8080/ingredient/ingredientLotDetails/${id}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     setIngredientsde(data.data);
//                     console.log(data)
//                 })
//                 .catch(error => {
//                     console.error('Error fetching ingredient details:', error);
//                 });
//         }
//         fetchData();
//     }, [id]);
//     console.log(ind)
//     // const ingrelotData = [
//     //     {
//     //         lotno: "LOT01",
//     //         date: '10/10/2555',
//     //         ingre: [
//     //             {
//     //                 ind_id: "1",
//     //                 qtypurchased: 2,
//     //                 date_exp: "10/10/2556",
//     //                 price: 500
//     //             },
//     //             {
//     //                 ind_id: "2",
//     //                 qtypurchased: 2,
//     //                 date_exp: "10/10/2556",
//     //                 price: 500
//     //             },

//     //         ],
//     //     }
//     // ]

//     const [ingrelot, setIngrelot] = useState(ind);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isModified, setIsModified] = useState(false);
//     const [dataForm, setDataForm] = useState(null);

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const openModal = () => {
//         setDataForm({ dataaToEdit: ingrelot[0].ingre })
//         setIsOpen(true);
//     };

//     const [value, setValue] = useState({
//         startDate: null,
//         endDate: null
//     });
//     const handleValueChange = (newValue) => {
//         console.log("newValue:", newValue);
//         setValue(newValue);
//     }

//     const handleSubmit = (e, lotIndex) => {
//         e.preventDefault();
//         const priceValue = e.target.price ? parseInt(e.target.price.value) : null;
//         const countInt = parseInt(e.target.count.value, 10);
//         const newIngredientData = {
//             ind_id: e.target.ingredients.value,
//             qtypurchased: countInt,
//             date_exp: value.startDate,
//             price: priceValue,
//         };

//         const updatedIngrelot = [...ingrelot];
//         if (lotIndex >= 0 && lotIndex < updatedIngrelot.length) {
//             const existingLot = updatedIngrelot[lotIndex];
//             if (existingLot) {
//                 existingLot.ingre.push(newIngredientData);
//             }
//         }

//         setIngrelot(updatedIngrelot);
//         e.target.reset();
//         setIsModified(true);
//         setValue({
//             startDate: null,
//             endDate: null
//         })
//         console.log("Data submit: ", updatedIngrelot);
//     };


//     const handleDeleteIngredient = (lotIndex, ingreIndex) => {
//         const updatedIngrelot = [...ingrelot];
//         if (
//             lotIndex >= 0 && lotIndex < updatedIngrelot.length &&
//             ingreIndex >= 0 && ingreIndex < updatedIngrelot[lotIndex].ingre.length
//         ) {
//             const isAddingOrModifying = isModified || updatedIngrelot[lotIndex].ingre.length > 0;
//             updatedIngrelot[lotIndex].ingre.splice(ingreIndex, 1);
//             setIngrelot(updatedIngrelot);


//             if (isAddingOrModifying) {
//                 setIsModified(true);
//             }
//         }
//     };


//     const handleEditWork = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/ingredient/editData/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(dataForm),
//             });

//             const responseData = await response.json();

//             if (responseData.message === 'success') {
//                 // setMessage('Data added successfully');
//                 setDataForm([]);  // รีเซ็ต pendingData หลังจากเพิ่มข้อมูลสำเร็จ
//             } else {
//                 // setMessage(responseData.message || 'Error occurred');
//             }

//         } catch (error) {
//             console.error('Error:', error);
//             // setMessage('Error occurred');
//         }
        
//         // setIsOpen(false);
//         // console.log("handleEditWork", dataForm);
//     };
//     console.log(ingrelot);
//     console.log(ingrelotData)

//     return (
//         <div className='h-screen'>
//             <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบเข้าร้าน
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
//             {ingrelotData.map((lot, index) => (
//                 <div key={index}>
//                     <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {lot.indl_id_name}</p>
//                     <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {lot.created_at}</p>
//                     <form onSubmit={(e) => handleSubmit(e, index)}>
//                         <input type="hidden" name="lotno" id="lotno" value={lot.indl_id} />
//                         <div className="grid grid-cols-6">
//                             <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
//                                 <select id="ingredients"
//                                     className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
//                                     {/* {ingrelotData.map((ingredient, index) => ( */}
//                                     {ingredientOptions.map((ingredient: IngredientType) => (
//                                         <option key={index} value={ingredient.ind_id}>{ingredient.ind_name}</option>
//                                     ))}
//                                 </select>
//                             </p>
//                             <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">
//                                 จำนวน :
//                                 <input
//                                     min="0"
//                                     type="number"
//                                     name="count"
//                                     id="count"
//                                     className="px-3 bg-[#FFFFDD] w-1/2 block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                                 />
//                                 {/* ใส่หน่วยวัตถุดิบตรง span */}
//                             </p>
//                             <div className="text-sm px-6 py-2 text-[#73664B] flex  col-span-2 justify-center items-center">
//                                 <p>วันหมดอายุ: </p>
//                                 <Datepicker
//                                     useRange={false}
//                                     asSingle={true}
//                                     value={value}
//                                     onChange={handleValueChange}
//                                 /></div>
//                             <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
//                                 min="0"
//                                 type="number"
//                                 pattern="[0-9]+([.,][0-9]+)?"
//                                 name="price"
//                                 id="price"
//                                 className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                             /></p>
//                             <input
//                                 type="submit"
//                                 value="เพิ่มวัตถุดิบ"
//                                 className="text-lg text-white border  bg-[#F2B461] rounded-full mr-6 scale-75 w-1/2" />
//                         </div >
//                     </form>
//                     {ingrelotData.map((ingredient, Idx) => (
//                         <Fragment key={Idx}>
//                             <div className="grid grid-cols-8">
//                                 {ingredientOptions.map((ingred) => (
//                                     ingred.ind_id === ingredient.ind_id ? (
//                                         <React.Fragment key={ingred.ind_id}>
//                                             <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
//                                                 วัตถุดิบ: {ingred.ind_name}
//                                             </p>
//                                             <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
//                                                 จำนวน: {ingredient.qtypurchased} {ingred.un_purchased_name|| ''}
//                                             </p>
//                                         </React.Fragment>
//                                     ) : null
//                                 ))}

//                                 <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.date_exp}</p>
//                                 <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p>
//                                 <p className="px-6 py-2">
//                                     <button onClick={() => handleDeleteIngredient(index, Idx)}>
//                                         <TrashIcon className="h-5 w-5 text-red-500" /></button>
//                                 </p></div>
//                         </Fragment>
//                     ))}
//                 </div>
//             ))}
//             <div className="flex justify-end mt-5">
//                 <button
//                     onClick={openModal}
//                     disabled={!isModified}
//                     type="button"
//                     className={`mx-auto mr-5 text-white ${!isModified ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#73664B]'
//                         } focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2`}
//                 >
//                     เสร็จสิ้น
//                 </button>
//             </div>
//             <>
//                 {isOpen && (
//                     <Transition appear show={isOpen} as={Fragment}>
//                         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0"
//                                 enterTo="opacity-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100"
//                                 leaveTo="opacity-0"
//                             >
//                                 <div className="fixed inset-0 bg-black/25" />
//                             </Transition.Child>
//                             <div className="fixed inset-0 overflow-y-auto">
//                                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                                     <Transition.Child
//                                         as={Fragment}
//                                         enter="ease-out duration-300"
//                                         enterFrom="opacity-0 scale-95"
//                                         enterTo="opacity-100 scale-100"
//                                         leave="ease-in duration-200"
//                                         leaveFrom="opacity-100 scale-100"
//                                         leaveTo="opacity-0 scale-95"
//                                     >
//                                         <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${kanit.className}`}>
//                                             <Dialog.Title
//                                                 as="h3"
//                                                 className="text-lg font-medium leading-6 text-[73664B]"
//                                             >
//                                                 ยืนยันการแก้ไขวัตถุดิบเข้าร้าน
//                                             </Dialog.Title>
//                                             <div className="mt-2">
//                                                 <p className="text-sm text-[#73664B]">
//                                                     คุณต้องการแก้ไขวัตถุดิบเข้าร้านหรือไม่
//                                                 </p>
//                                             </div>
//                                             {/*  choose */}
//                                             <div className="flex justify-end">
//                                                 <div className="inline-flex justify-end">
//                                                     <button
//                                                         type="button"
//                                                         className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                         onClick={closeModal}
//                                                     >
//                                                         ยกเลิก
//                                                     </button>

//                                                     <button
//                                                         type="button"
//                                                         className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                         onClick={handleEditWork}>
//                                                         ยืนยัน</button>
//                                                 </div>
//                                             </div>
//                                         </Dialog.Panel>
//                                     </Transition.Child>
//                                 </div>
//                             </div>

//                         </Dialog>

//                     </Transition>
//                 )}
//             </>

//         </div>
//         // <div>llll</div>
//     )
// }

// export default Index


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
    const ingredients = [
        {
            id: "1",
            name: "แป้ง",
            type: "ถุง"
        },
        {
            id: "2",
            name: "น้ำตาล",
            type: "ถุง"
        },
        {
            id: "3",
            name: "นม",
            type: "กล่อง"
        },
        {
            id: "4",
            name: "เนย",
            type: "ถุง"
        }]

    const ingrelotData = [
        {
            lotno: "LOT01",
            date: '10/10/2555',
            ingre: [
                {
                    ind_id: "1",
                    qtypurchased: 2,
                    date_exp: "10/10/2556",
                    price: 500
                },
                {
                    ind_id: "2",
                    qtypurchased: 2,
                    date_exp: "10/10/2556",
                    price: 500
                },

            ],
        }
    ]

    const [ingrelot, setIngrelot] = useState(ingrelotData);
    const [isOpen, setIsOpen] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [dataForm , setDataForm] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setDataForm({dataaToEdit:ingrelot[0].ingre})
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

    const handleSubmit = (e, lotIndex) => {
        e.preventDefault();
        const priceValue = e.target.price ? parseInt(e.target.price.value) : null;
        const countInt = parseInt(e.target.count.value, 10);
        const newIngredientData = {
            ind_id: e.target.ingredients.value,
            qtypurchased: countInt,
            date_exp: value.startDate,
            price: priceValue,
        };

        const updatedIngrelot = [...ingrelot];
        if (lotIndex >= 0 && lotIndex < updatedIngrelot.length) {
            const existingLot = updatedIngrelot[lotIndex];
            if (existingLot) {
                existingLot.ingre.push(newIngredientData);
            }
        }

        setIngrelot(updatedIngrelot);
        e.target.reset();
        setIsModified(true);
        setValue({
            startDate: null,
            endDate: null
        })
        console.log("Data submit: ", updatedIngrelot);
    };


    const handleDeleteIngredient = (lotIndex, ingreIndex) => {
        const updatedIngrelot = [...ingrelot];
        if (
            lotIndex >= 0 && lotIndex < updatedIngrelot.length &&
            ingreIndex >= 0 && ingreIndex < updatedIngrelot[lotIndex].ingre.length
        ) {
            const isAddingOrModifying = isModified || updatedIngrelot[lotIndex].ingre.length > 0;
            updatedIngrelot[lotIndex].ingre.splice(ingreIndex, 1);
            setIngrelot(updatedIngrelot);
    

            if (isAddingOrModifying) {
                setIsModified(true);
            }
        }
    };
    

    const handleEditWork = () => {
        setIsOpen(false);
        console.log("handleEditWork", dataForm);
    };

    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/income/all" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบเข้าร้าน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขวัตถุดิบเข้าร้าน</p>
            {ingrelot.map((lot, index) => (
                <div key={index}>
                    <p className="text-sm px-6 py-2 text-[#73664B]">เลขล็อตวัตถุดิบ : {lot.lotno}</p>
                    <p className="text-sm px-6 py-2 text-[#73664B]">วันที่ : {lot.date}</p>
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                        <input type="hidden" name="lotno" id="lotno" value={lot.lotno} />
                        <div className="grid grid-cols-6">
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ:
                                <select id="ingredients"
                                    className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                                    {ingredients.map((ingredient, index) => (
                                        <option key={index} value={ingredient.id}>{ingredient.name}</option>
                                    ))}
                                </select>
                            </p>
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">
                                จำนวน :
                                <input
                                    min="0"
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
                            <p className="text-sm px-6 py-2 text-[#73664B] flex justify-center items-center">ราคา :  <input
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
                    {lot.ingre.map((ingredient, Idx) => (
                        <Fragment key={Idx}>
                            <div className="grid grid-cols-8">
                                {ingredients.map((ingred) => (
                                    ingred.id === ingredient.ind_id ? (
                                        <React.Fragment key={ingred.id}>
                                            <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
                                                วัตถุดิบ: {ingred.name}
                                            </p>
                                            <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">
                                                จำนวน: {ingredient.qtypurchased} {ingred.type || ''}
                                            </p>
                                        </React.Fragment>
                                    ) : null
                                ))}

                                <p className="text-sm px-6 py-2 text-[#73664B] col-span-2">วันหมดอายุ : {ingredient.date_exp}</p>
                                <p className="text-sm px-6 py-2 text-[#73664B]">ราคา : {ingredient.price}</p>
                                <p className="px-6 py-2">
                                    <button onClick={() => handleDeleteIngredient(index, Idx)}>
                                        <TrashIcon className="h-5 w-5 text-red-500" /></button>
                                </p></div>
                        </Fragment>
                    ))}
                </div>
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
    )
}

export default Index
