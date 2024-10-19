// import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
// import Link from "next/link";
// import { Tabs, Tab, Chip, Select, SelectItem, Spinner, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
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
// import { CheckboxGroup, Checkbox, Input, colors, Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
// import Head from 'next/head'
// import { IoCalculator } from "react-icons/io5";



// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function Add() {
//     const router = useRouter(); // Declare router here
//     const [addedIngredients, setAddedIngredients] = useState([]);
//     const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
//     const [isOpen, setIsOpen] = useState(false);

//     const handleCheckboxChange = () => {
//         setIsChecked(!isChecked); // Toggle checkbox status
//     };
//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const openModal = () => {
//         setIsOpen(true);
//     };
//     const [message, setMessage] = useState('Loading');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const ingredientData = {
//             ind_id: e.target.ind_id.value,
//             ind_name: e.target.ind_id.options[e.target.ind_id.selectedIndex].text, // Get the selected ingredient name
//             // qty_used_sum: parseInt(e.target.qty_used_sum.value),
//             // scrap: parseInt(e.target.scrap.value),
//             qtyusedgrum: parseInt(e.target.qtyusedgrum.value),

//         };
//         // setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientData]);
//         // Check if the ingredient already exists in the addedIngredients array
//         const existingIngredientIndex = addedIngredients.findIndex((ingredient) => ingredient.ind_id === ingredientData.ind_id);

//         if (existingIngredientIndex !== -1) {
//             // If the ingredient is already added, update its quantity and scrap
//             const updatedIngredients = [...addedIngredients];
//             // updatedIngredients[existingIngredientIndex].qty_used_sum += ingredientData.qty_used_sum;
//             // updatedIngredients[existingIngredientIndex].scrap += ingredientData.scrap;
//             updatedIngredients[existingIngredientIndex].scrap += ingredientData.qtyusedgrum;
//             setAddedIngredients(updatedIngredients);
//         } else {
//             // If the ingredient doesn't exist, add it to the addedIngredients array
//             setAddedIngredients(prevIngredients => [...prevIngredients, ingredientData]);
//         }

//     };

//     const handleDeleteIngredient = (index) => {
//         setAddedIngredients((prevIngredients) => {
//             const updatedIngredients = [...prevIngredients];
//             updatedIngredients.splice(index, 1);
//             return updatedIngredients;
//         });
//     };
//     const [type, setType] = useState(""); // เก็บค่าประเภทที่เลือก

//     const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
//     // const [LotOptions, setLotOptions] = useState<Ingredients[]>([]);


//     interface Ingredients {
//         ind_id: string;
//         ind_name: string;
//         un_ind_name: string
//         un_ind: number;
//         // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
//     }
//     interface UnitType {
//         pdo_id: string;
//         pdo_id_name: string;
//         pdo_status: string;
//         // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
//     }
//     interface DetailData {
//         pdod_id: number; // Added pdod_id here
//         pd_name: string;
//         ind_name: string;
//         ind_id: number;
//         qty_used_sum: number;
//         scrap: number;
//     }
//     const [selectedId, setSelectedId] = useState<string>('');
//     const [detailData, setDetailData] = useState<DetailData[]>([]);
//     const [unitOptions, setUnitOptions] = useState<UnitType[]>([]);
//     const { id } = router.query;


//     useEffect(() => {
//         // Fetch unit data from the server and set the options
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/read`)
//             .then(response => response.json())
//             .then(data => {
//                 setIngredientsOptions(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });
//     }, []);

//     useEffect(() => {
//         // Fetch unit data from the server and set the options
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readall`)
//             .then(response => response.json())
//             .then(data => {
//                 setUnitOptions(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });
//     }, []);

//     useEffect(() => {
//         if (id) {
//             setSelectedId(id as string);
//         }
//     }, [id]);



//     useEffect(() => {
//         if (selectedId) {
//             fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLotpro/${selectedId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     // Extract the array from finalResults property
//                     if (data && Array.isArray(data.finalResults)) {
//                         setDetailData(data.finalResults);
//                     } else {
//                         console.error('Unexpected data structure:', data);
//                         setDetailData([]);
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching detail data:', error);
//                     setDetailData([]); // Set to an empty array on error
//                 });
//         }
//     }, [selectedId]);

//     // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     //     const { name, value } = event.target;
//     //     setUnitOptions((prevData) => ({
//     //         ...prevData,
//     //         [name]: value,
//     //     }));
//     //     setSelectedPdoIdName(value);

//     // };
//     const filteredUnitOptions = unitOptions.filter(unit => [3].includes(Number(unit.pdo_status)));

//     const handleSubmit2 = async () => {
//         const ingredientLotDetail = addedIngredients.map((ingredient) => ({
//             ind_id: parseInt(ingredient.ind_id),
//             qtyusedgrum: parseInt(ingredient.qtyusedgrum), // แปลงเป็นตัวเลข

//             // qty_used_sum: parseInt(ingredient.qty_used_sum), // แปลงเป็นตัวเลข
//             // scrap: parseInt(ingredient.scrap), // แปลงเป็นตัวเลข
//         }));
//         const noteValue = (document.getElementById("note") as HTMLInputElement).value; // แปลงเป็น HTMLInputElement

//         const requestData = {
//             ingredient_Used: {
//                 status: isChecked ? 2 : 1,
//                 note: noteValue, // ใช้ค่าที่แปลงเป็น HTMLInputElement
//             },
//             ingredient_Used_detail: ingredientLotDetail
//         };
//         console.log("add:", requestData)


//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantnew`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });
//             const responseData = await response.json();

//             if (responseData.message === 'success') {
//                 setMessage('Data added successfully');
//                 router.push('/ingredients/using/list'); // Navigate to the specified route
//             } else {
//                 setMessage(responseData.message || 'Error occurred');
//             }
//         } catch (error) {
//             setMessage('Error occurred while submitting data');
//             console.error('Error:', error);
//         }

//     };
//     // const handleSubmitPro = async () => {
//     //     const ingredientLotDetail = addedIngredients.map((ingredient) => ({
//     //         pdod_id: parseInt(ingredient.pdod_id), // Assuming you have pdod_id in your addedIngredients
//     //         ind_id: parseInt(ingredient.ind_id),
//     //         qty_used_sum: parseInt(ingredient.qty_used_sum), // Convert to number
//     //         scrap: parseInt(ingredient.scrap), // Convert to number
//     //     }));


//     //     const requestData = {
//     //         ingredient_Used_Lot: ingredientLotDetail, // Updating to match the expected structure
//     //     };

//     //     console.log("Request Data:", requestData);

//     //     try {
//     //         // Sending the POST request to the API
//     //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLotpro`, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify(requestData),
//     //         });

//     //         // Handling the response
//     //         const responseData = await response.json();
//     //         if (responseData.message === 'success') {
//     //             setMessage('Data added successfully');
//     //             router.push('/ingredients/using/list'); // Navigate to the specified route
//     //         } else {
//     //             setMessage(responseData.message || 'Error occurred');
//     //         }
//     //     } catch (error) {
//     //         setMessage('Error occurred while submitting data');
//     //         console.error('Error:', error);
//     //     }
//     // };
//     const handleSubmitPro = async () => {
//         // Mapping detailData to the required format for the API request

//         const ingredientLotDetail = editedData.map((ingredient) => ({
//             pdod_id: ingredient.pdod_id, // Ensure pdod_id exists in DetailData
//             ind_id: ingredient.ind_id,
//             qty_used_sum: ingredient.qty_used_sum, // Assuming it's already a number
//             scrap: ingredient.scrap, // Assuming it's already a number
//         }));

//         // Preparing the request payload according to the API's expected format
//         const requestData = {
//             pdo_id: selectedId,
//             ingredient_Used_Lot: ingredientLotDetail,
//         };

//         console.log("Request Data:", requestData);

//         try {
//             // Sending the POST request to the API
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLot`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData),
//             });

//             // Handling the response
//             const responseData = await response.json();
//             if (responseData.message === 'success') {
//                 setMessage('Data added successfully');
//                 router.push('/ingredients/using/list'); // Navigate to the specified route
//             } else {
//                 setMessage(responseData.message || 'Error occurred');
//             }
//         } catch (error) {
//             setMessage('Error occurred while submitting data');
//             console.error('Error:', error);
//         }
//         console.log("Request Data:", requestData);

//     };

//     interface DetailComponentProps {
//         detailData: DetailData[];
//         handleDeleteIngredient: (index: number) => void;
//         onSave: (updatedData: DetailData[]) => void; // Function to handle save operation
//     }
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedData, setEditedData] = useState<DetailData[]>([]);

//     // Initialize editedData when detailData changes
//     useEffect(() => {
//         setEditedData(detailData.map(data => ({ ...data })));
//     }, [detailData]);

//     const handleEditToggle = () => {
//         if (isEditing) {
//             // Save the edited data when exiting edit mode
//             saveEditedData();
//         }
//         setIsEditing(!isEditing);
//     };

//     const handleInputChange = (index: number, field: keyof DetailData, value: string | number) => {
//         const newEditedData = [...editedData];
//         if (newEditedData[index]) {
//             newEditedData[index] = {
//                 ...newEditedData[index],
//                 [field]: field === 'qty_used_sum' || field === 'scrap' ? Number(value) : value
//             };
//             setEditedData(newEditedData);
//         } else {
//             console.error('Invalid index:', index);
//         }
//     };


//     const saveEditedData = () => {
//         // Handle saving the updated data directly
//         console.log('Saved Data:', editedData);
//         // You can update the state here or send the data to a server
//     };


//     // calculate

//     const [isOpenPop, setIsOpenPop] = React.useState(false);
    
//     const conversionFactors = {
//         "กรัม": 1,
//         "กิโลกรัม": 1000,
//         "มิลลิลิตร": 1,
//         "ลิตร": 1000,
//         "ลูกบาศก์เซนติเมตร": 1,
//         "ลูกบาศก์เมตร": 1000000,
//         "ออนซ์": 30,
//         "ช้อนโต๊ะ": 15,
//         "ช้อนชา": 5,
//         "ถ้วยตวง": 240,
//         "1/4 ช้อนชา": 1.25,
//         "1/2 ช้อนชา": 2.5,
//         "1/4 ถ้วยตวง": 60,
//         "1/3 ถ้วยตวง": 80,
//         "1/2 ถ้วยตวง": 120,
//         "1 ถ้วยตวง": 240
//     };

//     const UnitDetail = [
//         { id: 1, name: "กรัม" },
//         { id: 2, name: "กิโลกรัม" },
//         { id: 3, name: "มิลลิลิตร" },
//         { id: 4, name: "ลิตร" },
//         { id: 5, name: "ออนซ์" },
//         { id: 6, name: "ช้อนโต๊ะ" },
//         { id: 7, name: "ช้อนชา" },
//         { id: 8, name: "ถ้วยตวง" }
//     ];
//     const [quantity, setQuantity] = useState(0);
//     const [fromUnit, setFromUnit] = useState(UnitDetail[0].name);
//     const [toUnit, setToUnit] = useState(UnitDetail[1].name);
//     const [result, setResult] = useState("0");

//     // const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);

    
//     function convert(value, fromUnit, toUnit) {
//         if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
//             throw new Error('Conversion factor for the provided units is not defined.');
//         }
    
//         const fromFactor = conversionFactors[fromUnit];
//         const toFactor = conversionFactors[toUnit];
//         return value * (fromFactor / toFactor);
//     }
    
//     // ที่เก็บค่ากรอกเข้ามาเพื่อเพิ่มวัตถุดิบ
//     const [ingredientsFood, setIngredientsFood] = useState({
//         ind_id: "",
//         ingredients_qty: null,
//         un_id: ""
//     });

//     // เก็บค่าที่รับการเพิ่มวัตถุดิบ
//     const [ingredientsFoodSave, setIngredientsFoodSave] = useState([]);

//     // เก็บค่าเตครื่องแปลงสูคร
//     const [convertData, setConvertData] = useState({
//         convert_before: 0,
//         convert_before_type: "ช้อนชา",
//         convert_after_type: "",
//         convert_after: 0
//     });

//     // แปลงค่า
//     const handleConvert = (e) => {
//         const { name, value } = e.target;
//         setConvertData(prevState => ({
//             ...prevState,
//             [name]: value
//         })
//         )
//         console.log(ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name)
//         console.log(name,'name')

//         if (name == "convert_before") {
//             const convertedValue = convert(value, convertData.convert_before_type, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
//             setResult(convertedValue.toString());
//             console.log(convertedValue.toString(),'convertedValue.toString()')
//         } else {
//             const convertedValue = convert(convertData.convert_before, value, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
//             setResult(convertedValue.toString());
//         }

//     }


//     // ย้ายค่าไปใส่ช่องเพื่อเพิ่มวัตถุดิบ
//     const handleConvertAfter = () => {
//         setIngredientsFood(prevState => ({
//             ...prevState,
//             "ingredients_qty": parseFloat(result)
//         }));
//         setIsOpenPop(false)
//     }

//     // ล้างค่าในเครื่องแปลง
//     const handleConvertCencel = () => {
//         setConvertData({
//             convert_before: 0,
//             convert_before_type: "ช้อนชา",
//             convert_after_type: "",
//             convert_after: 0
//         })
//         setResult("0");
//         setIsOpenPop(false)
//     }

//     // ปิด Modal
//     const handleModalClose = () => {
//         setIngredientsFood({
//             ind_id: "",
//             ingredients_qty: null,
//             un_id: ""
//         })
//         // onClose()
//     }

//     const handleIngredientsFood = (e) => {
//         const { name, value } = e.target;
//         setIngredientsFood(prevState => ({
//             ...prevState,
//             [name]: value
//         }));

//         if (name == "ind_id") {
//             const un_ind_find = ingredientsOptions.find(ingredient => ingredient.ind_id == value)?.un_ind
//             setIngredientsFood(prevState => ({
//                 ...prevState,
//                 "un_id": un_ind_find ? un_ind_find.toString() : prevState.un_id
//             }));
//         }
//     }

//     return (
//         <div>
//             <Head>
//                 <title>วัตถุดิบที่ใช้ - Softdough</title>
//             </Head>
//             <button className='my-3 mx-5 '>
//                 <Link href="/ingredients/using/list" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
//                     <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
//                     วัตถุดิบที่ใช้
//                 </Link>
//             </button>
//             <p className='my-1 mx-6 font-semibold text-[#C5B182]  border-b border-[#C5B182] py-2'>เพิ่มวัตถุดิบที่ใช้</p>
//             <div>
//                 <div className="mx-6">
//                     <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
//                         เลือกประเภท :</label>
//                     <div className="mt-2 col-span-3 flex">
//                         <div className="form-control">
//                             <label className="label cursor-pointer ">
//                                 <input type="radio" name="st_type"
//                                     value="1"
//                                     className="radio checked:bg-[#C5B182]"
//                                     onChange={() => setType("1")} // เมื่อเลือกผลิตตามใบสั่งผลิต
//                                 />
//                                 <span className="label-text text-[#73664B] px-3 ">ผลิตตามใบสั่งผลิต</span>
//                             </label>
//                         </div>
//                         <div className="form-control ml-4">
//                             <label className="label cursor-pointer">
//                                 <input type="radio" name="st_type"
//                                     value="2"
//                                     className="radio checked:bg-[#C5B182]"
//                                     onChange={() => setType("2")} // เมื่อเลือกประเภทอื่นๆ
//                                 />
//                                 <span className="label-text text-[#73664B] px-3">อื่นๆ</span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 {/* แสดง input text เมื่อเลือกประเภท "ผลิตตามใบสั่งผลิต" */}
//                 {type === "1" && (
//                     <div className="mt-4 mx-6">
//                         <div className="flex w-1/2 justify-start">
//                             <label className="block text-sm  leading-6 text-[#73664B]  mt-3 text-left ">
//                                 เลขใบสั่งผลิต :</label>
//                             <div className="mt-2 col-span-3">
//                                 <select
//                                     id="countries"
//                                     className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
//                                     value={selectedId}
//                                     onChange={(e) => setSelectedId(e.target.value)}
//                                 >
//                                     {filteredUnitOptions
//                                         .sort((a, b) => Number(b.pdo_id) - Number(a.pdo_id))
//                                         .map((unit) => (
//                                             <option key={unit.pdo_id} value={unit.pdo_id}>
//                                                 {unit.pdo_id_name}
//                                             </option>
//                                         ))}
//                                 </select>

//                             </div>
//                         </div>
//                         <p className="mt-4 mb-2  text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดวัตถุดิบที่ใช้</p>

//                         <div className="flex justify-end">
//                             <Button
//                                 // href={`../using/edit/${selectedId}`}
//                                 // as={Link}
//                                 onClick={handleEditToggle}

//                                 className="ml-auto  text-white bg-[#F2B461] focus:outline-none rounded-full text-sm px-4 py-2  mb-2 ">{isEditing ? "บันทึก" : "แก้ไข"}</Button>
//                         </div>

//                         <div className="flex flex-col">
//                             <div className="bg-[#908362] text-white text-sm flex">
//                                 <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
//                                 <div className="flex-1 py-3 text-center">จำนวน</div>
//                                 <div className="flex-1 py-3 text-center">เศษ</div>
//                                 <div className="flex-1 py-3 text-center"></div>
//                             </div>
//                             <div className="max-h-40 overflow-y-auto mb-5">
//                                 <table className="w-full">
//                                     {/* <tbody className="w-full">
//                                         {detailData.map((detail, index) => (
//                                             <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white flex items-center">
//                                                 <td scope="col" className="flex-1 text-center">{detail.ind_name}</td>
//                                                 <td scope="col" className="flex-1 text-center">{detail.qty_used_sum}</td>
//                                                 <td scope="col" className="flex-1 text-center">{detail.scrap}</td>
//                                                 <td scope="col" className="flex-1 text-center">
//                                                     <div className="flex items-center justify-center">
//                                                         <button onClick={() => handleDeleteIngredient(index)}>
//                                                             <TrashIcon className="h-5 w-5 text-red-500" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody> */}
//                                     <tbody className="w-full">
//                                         {editedData.map((detail, index) => (
//                                             <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white flex items-center">
//                                                 <td scope="col" className="flex-1 text-center">
//                                                     {
//                                                         detail.ind_name
//                                                     }
//                                                 </td>
//                                                 <td scope="col" className="flex-1 text-center">
//                                                     {isEditing ? (
//                                                         <input
//                                                             type="number"
//                                                             value={detail.qty_used_sum}
//                                                             defaultValue={detail.qty_used_sum}
//                                                             onChange={(e) => handleInputChange(index, 'qty_used_sum', e.target.value)}
//                                                             className="bg-white border border-gray-300 rounded p-1"
//                                                         />
//                                                     ) : (
//                                                         detail.qty_used_sum
//                                                     )}
//                                                 </td>
//                                                 <td scope="col" className="flex-1 text-center">
//                                                     {isEditing ? (
//                                                         <input
//                                                             type="number"
//                                                             defaultValue={detail.scrap}
//                                                             onChange={(e) => handleInputChange(index, 'scrap', e.target.value)}
//                                                             className="bg-white border border-gray-300 rounded p-1"
//                                                         />
//                                                     ) : (
//                                                         detail.scrap
//                                                     )}
//                                                 </td>
//                                                 <td scope="col" className="flex-1 text-center">
//                                                     <div className="flex items-center justify-center">
//                                                         <button onClick={() => handleDeleteIngredient(index)}>
//                                                             <TrashIcon className="h-5 w-5 text-red-500" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                         <div className="">
//                             {/* เช็คคือยืนยันการใช้งาน */}
//                             <Checkbox radius="sm" color="warning" checked={isChecked} onChange={handleCheckboxChange} className="text-sm text-[#73664B]">
//                                 ยืนยันการเพิ่มวัตถุดิบที่ใช้ทันที
//                             </Checkbox>
//                         </div>
//                         < div className="mt-8 " >
//                             <button>
//                                 <Link href="/ingredients/income/all"
//                                     type="button"
//                                     className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
//                                     ยกเลิก</Link></button>
//                             <>
//                                 {isOpen && (
//                                     <Transition appear show={isOpen} as={Fragment}>
//                                         <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
//                                             <Transition.Child
//                                                 as={Fragment}
//                                                 enter="ease-out duration-300"
//                                                 enterFrom="opacity-0"
//                                                 enterTo="opacity-100"
//                                                 leave="ease-in duration-200"
//                                                 leaveFrom="opacity-100"
//                                                 leaveTo="opacity-0"
//                                             >
//                                                 <div className="fixed inset-0 bg-black/25" />
//                                             </Transition.Child>

//                                             <div className="fixed inset-0 overflow-y-auto">
//                                                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                                                     <Transition.Child
//                                                         as={Fragment}
//                                                         enter="ease-out duration-300"
//                                                         enterFrom="opacity-0 scale-95"
//                                                         enterTo="opacity-100 scale-100"
//                                                         leave="ease-in duration-200"
//                                                         leaveFrom="opacity-100 scale-100"
//                                                         leaveTo="opacity-0 scale-95"
//                                                     >
//                                                         <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                                                             <Dialog.Title
//                                                                 as="h3"
//                                                                 className="text-lg font-medium leading-6 text-[73664B]"
//                                                             >
//                                                                 ยืนยันการเพิ่มวัตถุดิบเข้าร้าน
//                                                             </Dialog.Title>
//                                                             <div className="mt-2">
//                                                                 <p className="text-sm text-[#73664B]">
//                                                                     คุณต้องการเพิ่มวัตถุดิบเข้าร้านหรือไม่
//                                                                 </p>
//                                                             </div>
//                                                             {/*  choose */}
//                                                             <div className="flex justify-end">
//                                                                 <div className="inline-flex justify-end">
//                                                                     <button
//                                                                         type="button"
//                                                                         className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                                         onClick={closeModal}
//                                                                     >
//                                                                         ยกเลิก
//                                                                     </button>

//                                                                     <button
//                                                                         type="button"
//                                                                         className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                                         onClick={handleSubmitPro}
//                                                                     ><Link href="/ingredients/using/list">
//                                                                             ยืนยัน
//                                                                         </Link></button>
//                                                                 </div>
//                                                             </div>
//                                                         </Dialog.Panel>
//                                                     </Transition.Child>
//                                                 </div>
//                                             </div>
//                                         </Dialog>
//                                     </Transition>
//                                 )
//                                 }
//                             </>
//                             <button onClick={openModal} type="button" className="ml-2 mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
//                         </div >
//                     </div>
//                 )}
//                 {/* แสดง input เมื่อเลือกประเภท "อื่นๆ" */}
//                 {type === "2" && (
//                     <div className="mt-4 mx-6">
//                         <div className="flex w-1/2 justify-start">
//                             <label className="block text-sm  leading-6 text-[#73664B]  mt-3 text-left ">
//                                 หมายเหตุ :</label>
//                             <div className="mt-2 col-span-3">
//                                 <input
//                                     type="text"
//                                     name="note"
//                                     id="note"
//                                     className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <p className=" my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดวัตถุดิบที่ใช้</p>
//                         <form
//                             onSubmit={handleSubmit}
//                         >
//                             <div className="grid grid-cols-6">
//                                 <div className="flex items-center justify-center">
//                                     <p className="text-sm ml-6 mr-3 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ: </p>
//                                     {/* <select id="ind_id"
//                                         className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
//                                         {Array.isArray(ingredientsOptions) &&
//                                             ingredientsOptions.map((ind: Ingredients) => (
//                                                 <option key={ind.ind_id.toString()} value={ind.ind_id}>
//                                                     {ind.ind_name}
//                                                 </option>
//                                             ))}
//                                     </select> */}
//                                     <Select
//                                         isRequired
//                                         label="วัตถุดิบ"
//                                         className=" bg-fourth text-primary col-span-2"
//                                         size="sm"
//                                         color="primary"
//                                         name="ind_id"
//                                         onChange={handleIngredientsFood}
//                                         selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.ind_id] : []}
//                                     >
//                                         {ingredientsOptions.map(type => (
//                                             <SelectItem key={type.ind_id} value={type.ind_id}>
//                                                 {type.ind_name}
//                                             </SelectItem>
//                                         ))}
//                                     </Select>
//                                 </div>
//                                 {/* <div className="flex items-center justify-center mr-5">
//                                     <p className="text-sm  text-[#73664B] flex justify-center items-center w-full">จำนวน : </p>
//                                     <input
//                                         min="1"
//                                         // onChange={handleCancelClick}
//                                         type="number"
//                                         name="qty_used_sum"
//                                         id="qty_used_sum"
//                                         className="px-3 bg-[#FFFFDD] w-full block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                                     />
//                                 </div>

//                                 <div className="flex items-center justify-center">
//                                     <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">เศษ : </p>
//                                     <input
//                                         min="0"
//                                         // onChange={handleCancelClick}
//                                         type="number"
//                                         pattern="[0-9]+([.,][0-9]+)?"
//                                         name="scrap"
//                                         id="scrap"
//                                         className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                                     />
//                                 </div> */}
//                                 <div className="flex items-center justify-center">
//                                     <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">ปริมาณ : </p>
//                                     <input
//                                         min="0"
//                                         // onChange={handleCancelClick}
//                                         type="qtyusedgrum"
//                                         pattern="[0-9]+([.,][0-9]+)?"
//                                         name="qtyusedgrum"
//                                         id="qtyusedgrum"
//                                         className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                                     />
//                                      {/* <Input
//                                             isRequired
//                                             type="number"
//                                             label="ปริมาณ"
//                                             size="sm"
//                                             width="100%"
//                                             className=" bg-fourth text-primary"
//                                             color="primary"
//                                             name="qtyusedgrum"
//                                             onChange={handleIngredientsFood}
//                                             value={ingredientsFood.ingredients_qty == null ? "" : ingredientsFood.ingredients_qty}
//                                         /> */}
//                                 </div>

//                                 {/* เครื่องแปลงหน่วย */}
//                                 <Popover placement="bottom" isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} showArrow offset={10} style={{ fontFamily: 'kanit' }} backdrop="opaque">
//                                             <PopoverTrigger>
//                                                 <Button isIconOnly className="ml-2" variant="light" isDisabled={ingredientsFood.ind_id === "" ? true : false}>
//                                                     <IoCalculator className="text-2xl" />
//                                                 </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-[340px]">
//                                                 {(titleProps) => (
//                                                     <div className="px-1 py-2 w-full">
//                                                         <p className="text-small font-bold text-foreground" {...titleProps}>
//                                                             เครื่องแปลงหน่วย
//                                                         </p>
//                                                         <div className="mt-2 flex w-full">
//                                                             <Input onChange={handleConvert} size="sm" name="convert_before" label="กรุณากรอกค่า" type="number" className=" bg-fourth text-primary" color="primary" />
//                                                             <Select
//                                                                 label="หน่วยแปลง"
//                                                                 color="primary"
//                                                                 className="max-w-md bg-fourth text-primary ml-2"
//                                                                 size="sm"
//                                                                 value={convertData.convert_before_type}
//                                                                 name="convert_before_type"
//                                                                 onChange={handleConvert}
//                                                                 defaultSelectedKeys={["ช้อนชา"]}
//                                                             >
//                                                                 {UnitDetail.map((item) => (
//                                                                     <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
//                                                                 ))}
//                                                             </Select>
//                                                         </div>

//                                                         <div className="mt-2 flex w-full">
//                                                             <Input value={result !== null ? result : "0"} onValueChange={setResult} name="convert_after" size="sm" label="ค่าที่แปลงแล้ว" readOnly type="number" className=" bg-fourth text-primary" color="primary" />
//                                                             <Select
//                                                                 label="หน่วยแปลง"
//                                                                 color="primary"
//                                                                 name="convert_after_type"
//                                                                 className="max-w-md bg-fourth text-primary ml-2"
//                                                                 size="sm"
//                                                                 isDisabled
//                                                                 selectedKeys={ingredientsFood.ind_id ? [ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name] : []}
//                                                             // onChange={handleConvert}
//                                                             >
//                                                                 {UnitDetail.map(type => (
//                                                                     <SelectItem key={type.name} value={type.name}>
//                                                                         {type.name}
//                                                                     </SelectItem>
//                                                                 ))}
//                                                             </Select>
//                                                         </div>
//                                                         <div className="flex justify-end mt-3">
//                                                             <Button className="bg-[#C5B182] text-white mr-2" onPress={() => setIsOpenPop(false)}>
//                                                                 ปิด
//                                                             </Button>
//                                                             <Button className="text-white bg-[#736648]" onClick={() => handleConvertAfter()}>
//                                                                 แทนที่
//                                                             </Button>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </PopoverContent>
//                                         </Popover>

//                                 <Select
//                                         isRequired
//                                         label="หน่วย"
//                                         name="un_id"
//                                         size="sm"
//                                         color="primary"
//                                         className=" bg-fourth text-primary col-span-2"
//                                         isDisabled
//                                         selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.un_id] : []}
//                                     >
//                                         <SelectItem key={ingredientsFood.un_id}>{ingredientsOptions.find(ingreds => ingreds.ind_id == ingredientsFood.ind_id)?.un_ind_name}</SelectItem>
//                                     </Select>

//                                 <div className="scale-75 w-full my-2 flex justify-end">
//                                     <Button
//                                         type="submit"
//                                         value="เพิ่มวัตถุดิบ"
//                                         className="text-lg text-white border bg-[#F2B461] rounded-full mr-6 py-2 px-2">เพิ่มวัตถุดิบ</Button>
//                                 </div>
//                             </div >
//                         </form>
//                         <div className=" mt-3 h-1/2">
//                             <div className="flex flex-col">
//                                 <div className="bg-[#908362] text-white text-sm flex">
//                                     <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
//                                     <div className="flex-1 py-3 text-center">ปริมาณ</div>

//                                     {/* <div className="flex-1 py-3 text-center">จำนวน</div> */}
//                                     {/* <div className="flex-1 py-3 text-center">เศษ</div> */}
//                                     <div className="flex-1 py-3 text-center"></div>
//                                 </div>
//                                 <div className="max-h-40 overflow-y-auto mb-5">
//                                     <table className="w-full">
//                                         <tbody className="w-full">
//                                             {addedIngredients.map((addedIngredient, index) => (
//                                                 <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
//                                                     <td scope="col" className="flex-1 text-center">{addedIngredient.ind_name}</td>
//                                                     {/* <td scope="col" className="flex-1 text-center">{addedIngredient.qty_used_sum}</td>
//                                                     <td scope="col" className="flex-1 text-center">{addedIngredient.scrap}</td> */}
//                                                     <td scope="col" className="flex-1 text-center">{addedIngredient.qtyusedgrum}</td>

//                                                     <td scope="col" className="flex-1 text-center">
//                                                         <div className="flex items-center justify-center">
//                                                             <button onClick={() => handleDeleteIngredient(index)}>
//                                                                 <TrashIcon className="h-5 w-5 text-red-500" />
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="">
//                             {/* เช็คคือยืนยันการใช้งาน */}
//                             <Checkbox radius="sm" color="warning" checked={isChecked} onChange={handleCheckboxChange} className="text-sm text-[#73664B]">
//                                 ยืนยันการเพิ่มวัตถุดิบที่ใช้ทันที
//                             </Checkbox>
//                         </div>

//                         < div className="mt-8 " >
//                             <button>
//                                 <Link href="/ingredients/using/list"
//                                     type="button"
//                                     className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
//                                     ยกเลิก</Link></button>
//                             <>
//                                 {isOpen && (
//                                     <Transition appear show={isOpen} as={Fragment} >
//                                         <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
//                                             <Transition.Child
//                                                 as={Fragment}
//                                                 enter="ease-out duration-300"
//                                                 enterFrom="opacity-0"
//                                                 enterTo="opacity-100"
//                                                 leave="ease-in duration-200"
//                                                 leaveFrom="opacity-100"
//                                                 leaveTo="opacity-0"
//                                             >
//                                                 <div className="fixed inset-0 bg-black/25" />
//                                             </Transition.Child>

//                                             <div className="fixed inset-0 overflow-y-auto">
//                                                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                                                     <Transition.Child
//                                                         as={Fragment}
//                                                         enter="ease-out duration-300"
//                                                         enterFrom="opacity-0 scale-95"
//                                                         enterTo="opacity-100 scale-100"
//                                                         leave="ease-in duration-200"
//                                                         leaveFrom="opacity-100 scale-100"
//                                                         leaveTo="opacity-0 scale-95"
//                                                     >
//                                                         <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                                                             <Dialog.Title
//                                                                 as="h3"
//                                                                 className="text-lg font-medium leading-6 text-[73664B]"
//                                                             >
//                                                                 ยืนยันการเพิ่มวัตถุดิบเข้าร้าน
//                                                             </Dialog.Title>
//                                                             <div className="mt-2">
//                                                                 <p className="text-sm text-[#73664B]">
//                                                                     คุณต้องการเพิ่มวัตถุดิบเข้าร้านหรือไม่
//                                                                 </p>
//                                                             </div>
//                                                             {/*  choose */}
//                                                             <div className="flex justify-end">
//                                                                 <div className="inline-flex justify-end">
//                                                                     <button
//                                                                         type="button"
//                                                                         className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                                         onClick={closeModal}
//                                                                     >
//                                                                         ยกเลิก
//                                                                     </button>

//                                                                     <button
//                                                                         type="button"
//                                                                         className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                                         onClick={handleSubmit2}
//                                                                     ><Link href="/ingredients/using/list">
//                                                                             ยืนยัน
//                                                                         </Link></button>
//                                                                 </div>
//                                                             </div>
//                                                         </Dialog.Panel>
//                                                     </Transition.Child>
//                                                 </div>
//                                             </div>
//                                         </Dialog>
//                                     </Transition>
//                                 )
//                                 }
//                             </>
//                             <button onClick={openModal} type="button" className="ml-2 mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
//                         </div >





//                     </div>

//                 )}
//             </div>

//         </div>
//     )
// }

// export default Add


import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import { ChevronLeftIcon, MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/router";
import { CheckboxGroup, Checkbox, Input, colors, Button, Popover, PopoverTrigger, PopoverContent, SelectItem, Select } from "@nextui-org/react";
import Head from 'next/head'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IoCalculator } from "react-icons/io5";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Add() {
    const router = useRouter(); // Declare router here
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
    const [isOpen, setIsOpen] = useState(false);
    const MySwal = withReactContent(Swal);
    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
          router.push('/ingredients/using/list');
        }
      });

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle checkbox status
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    const [message, setMessage] = useState('Loading');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ingredientData = {
            ind_id: e.target.ind_id.value,
            ind_name: e.target.ind_id.options[e.target.ind_id.selectedIndex].text, // Get the selected ingredient name
            // qty_used_sum: parseInt(e.target.qty_used_sum.value),
            // scrap: parseInt(e.target.scrap.value),
            qtyusedgrum: parseInt(e.target.qtyusedgrum.value),

        };
        // setAddedIngredients((prevIngredients) => [...prevIngredients, ingredientData]);
        // Check if the ingredient already exists in the addedIngredients array
        const existingIngredientIndex = addedIngredients.findIndex((ingredient) => ingredient.ind_id === ingredientData.ind_id);

        if (existingIngredientIndex !== -1) {
            // If the ingredient is already added, update its quantity and scrap
            const updatedIngredients = [...addedIngredients];
            // updatedIngredients[existingIngredientIndex].qty_used_sum += ingredientData.qty_used_sum;
            // updatedIngredients[existingIngredientIndex].scrap += ingredientData.scrap;
            updatedIngredients[existingIngredientIndex].scrap += ingredientData.qtyusedgrum;
            setAddedIngredients(updatedIngredients);
        } else {
            // If the ingredient doesn't exist, add it to the addedIngredients array
            setAddedIngredients(prevIngredients => [...prevIngredients, ingredientData]);
        }

    };

    const handleDeleteIngredient = (index) => {
        setAddedIngredients((prevIngredients) => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.splice(index, 1);
            return updatedIngredients;
        });
    };
    const [type, setType] = useState(""); // เก็บค่าประเภทที่เลือก

    const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    // const [LotOptions, setLotOptions] = useState<Ingredients[]>([]);


    interface Ingredients {
        ind_id: string;
        ind_name: string;
        un_ind_name: string
        un_ind: number;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    interface UnitType {
        pdo_id: string;
        pdo_id_name: string;
        pdo_status: string;
        // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    }
    interface DetailData {
        pdod_id: number; // Added pdod_id here
        pd_name: string;
        ind_name: string;
        ind_id: number;
        qty_used_sum: number;
        scrap: number;
    }
    const [selectedId, setSelectedId] = useState<string>('');
    const [detailData, setDetailData] = useState<DetailData[]>([]);
    const [unitOptions, setUnitOptions] = useState<UnitType[]>([]);
    const { id } = router.query;


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
    }, []);

    useEffect(() => {
        // Fetch unit data from the server and set the options
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/production/readall`)
            .then(response => response.json())
            .then(data => {
                setUnitOptions(data);
            })
            .catch(error => {
                console.error('Error fetching unit data:', error);
            });
    }, []);

    useEffect(() => {
        if (id) {
            setSelectedId(id as string);
        }
    }, [id]);



    useEffect(() => {
        if (selectedId) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLotpro/${selectedId}`)
                .then(response => response.json())
                .then(data => {
                    // Extract the array from finalResults property
                    if (data && Array.isArray(data.finalResults)) {
                        setDetailData(data.finalResults);
                    } else {
                        console.error('Unexpected data structure:', data);
                        setDetailData([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching detail data:', error);
                    setDetailData([]); // Set to an empty array on error
                });
        }
    }, [selectedId]);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = event.target;
    //     setUnitOptions((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    //     setSelectedPdoIdName(value);

    // };
    const filteredUnitOptions = Array.isArray(unitOptions) 
    ? unitOptions.filter(unit => [3].includes(Number(unit.pdo_status)))
    : [];

    const handleSubmit2 = async () => {
        const ingredientLotDetail = addedIngredients.map((ingredient) => ({
            ind_id: parseInt(ingredient.ind_id),
            qtyusedgrum: parseInt(ingredient.qtyusedgrum), // แปลงเป็นตัวเลข

            // qty_used_sum: parseInt(ingredient.qty_used_sum), // แปลงเป็นตัวเลข
            // scrap: parseInt(ingredient.scrap), // แปลงเป็นตัวเลข
        }));
        const noteValue = (document.getElementById("note") as HTMLInputElement).value; // แปลงเป็น HTMLInputElement

        const requestData = {
            ingredient_Used: {
                status: isChecked ? 2 : 1,
                note: noteValue, // ใช้ค่าที่แปลงเป็น HTMLInputElement
            },
            ingredient_Used_detail: ingredientLotDetail
        };
        console.log("add:", requestData)


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantnew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const responseData = await response.json();

            if (responseData.message === 'success') {
                setMessage('Data added successfully');
                Toast.fire({
                    icon: "success",
                    title: <p style={{ fontFamily: 'kanit' }}>เพิ่มวัตถุดิบที่ใช้สำเร็จ</p>
                  });
            } else {
                setMessage(responseData.message || 'Error occurred');
                Toast.fire({
                    icon: "error",
                    title: <p style={{ fontFamily: 'kanit' }}>เพิ่มวัตถุดิบที่ใช้ไม่สำเร็จ</p>
                  });
            }
        } catch (error) {
            setMessage('Error occurred while submitting data');
            console.error('Error:', error);
        }

    };
    // const handleSubmitPro = async () => {
    //     const ingredientLotDetail = addedIngredients.map((ingredient) => ({
    //         pdod_id: parseInt(ingredient.pdod_id), // Assuming you have pdod_id in your addedIngredients
    //         ind_id: parseInt(ingredient.ind_id),
    //         qty_used_sum: parseInt(ingredient.qty_used_sum), // Convert to number
    //         scrap: parseInt(ingredient.scrap), // Convert to number
    //     }));


    //     const requestData = {
    //         ingredient_Used_Lot: ingredientLotDetail, // Updating to match the expected structure
    //     };

    //     console.log("Request Data:", requestData);

    //     try {
    //         // Sending the POST request to the API
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLotpro`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(requestData),
    //         });

    //         // Handling the response
    //         const responseData = await response.json();
    //         if (responseData.message === 'success') {
    //             setMessage('Data added successfully');
    //             router.push('/ingredients/using/list'); // Navigate to the specified route
    //         } else {
    //             setMessage(responseData.message || 'Error occurred');
    //         }
    //     } catch (error) {
    //         setMessage('Error occurred while submitting data');
    //         console.error('Error:', error);
    //     }
    // };
    const handleSubmitPro = async () => {
        // Mapping detailData to the required format for the API request

        const ingredientLotDetail = editedData.map((ingredient) => ({
            pdod_id: ingredient.pdod_id, // Ensure pdod_id exists in DetailData
            ind_id: ingredient.ind_id,
            qty_used_sum: ingredient.qty_used_sum, // Assuming it's already a number
            scrap: ingredient.scrap, // Assuming it's already a number
        }));

        // Preparing the request payload according to the API's expected format
        const requestData = {
            pdo_id: selectedId,
            ingredient_Used_Lot: ingredientLotDetail,
        };

        console.log("Request Data:", requestData);

        try {
            // Sending the POST request to the API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredient/addUseIngrediantLot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Handling the response
            const responseData = await response.json();
            if (responseData.message === 'success') {
                setMessage('Data added successfully');
                Toast.fire({
                    icon: "success",
                    title: <p style={{ fontFamily: 'kanit' }}>เพิ่มวัตถุดิบที่ใช้สำเร็จ</p>
                  });
            } else {
                setMessage(responseData.message || 'Error occurred');
                Toast.fire({
                    icon: "error",
                    title: <p style={{ fontFamily: 'kanit' }}>เพิ่มวัตถุดิบที่ใช้ไม่สำเร็จ</p>
                  });
            }
        } catch (error) {
            setMessage('Error occurred while submitting data');
            console.error('Error:', error);
        }
        console.log("Request Data:", requestData);

    };

    interface DetailComponentProps {
        detailData: DetailData[];
        handleDeleteIngredient: (index: number) => void;
        onSave: (updatedData: DetailData[]) => void; // Function to handle save operation
    }
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<DetailData[]>([]);

    // Initialize editedData when detailData changes
    useEffect(() => {
        setEditedData(detailData.map(data => ({ ...data })));
    }, [detailData]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Save the edited data when exiting edit mode
            saveEditedData();
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (index: number, field: keyof DetailData, value: string | number) => {
        const newEditedData = [...editedData];
        if (newEditedData[index]) {
            newEditedData[index] = {
                ...newEditedData[index],
                [field]: field === 'qty_used_sum' || field === 'scrap' ? Number(value) : value
            };
            setEditedData(newEditedData);
        } else {
            console.error('Invalid index:', index);
        }
    };


    const saveEditedData = () => {
        // Handle saving the updated data directly
        console.log('Saved Data:', editedData);
        // You can update the state here or send the data to a server
    };


    // calculate

    const [isOpenPop, setIsOpenPop] = React.useState(false);
    
    const conversionFactors = {
        "กรัม": 1,
        "กิโลกรัม": 1000,
        "มิลลิลิตร": 1,
        "ลิตร": 1000,
        "ลูกบาศก์เซนติเมตร": 1,
        "ลูกบาศก์เมตร": 1000000,
        "ออนซ์": 30,
        "ช้อนโต๊ะ": 15,
        "ช้อนชา": 5,
        "ถ้วยตวง": 240,
        "1/4 ช้อนชา": 1.25,
        "1/2 ช้อนชา": 2.5,
        "1/4 ถ้วยตวง": 60,
        "1/3 ถ้วยตวง": 80,
        "1/2 ถ้วยตวง": 120,
        "1 ถ้วยตวง": 240
    };

    const UnitDetail = [
        { id: 1, name: "กรัม" },
        { id: 2, name: "กิโลกรัม" },
        { id: 3, name: "มิลลิลิตร" },
        { id: 4, name: "ลิตร" },
        { id: 5, name: "ออนซ์" },
        { id: 6, name: "ช้อนโต๊ะ" },
        { id: 7, name: "ช้อนชา" },
        { id: 8, name: "ถ้วยตวง" }
    ];
    const [quantity, setQuantity] = useState(0);
    const [fromUnit, setFromUnit] = useState(UnitDetail[0].name);
    const [toUnit, setToUnit] = useState(UnitDetail[1].name);
    const [result, setResult] = useState("0");

    // const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);

    
    function convert(value, fromUnit, toUnit) {
        if (!(fromUnit in conversionFactors) || !(toUnit in conversionFactors)) {
            throw new Error('Conversion factor for the provided units is not defined.');
        }
    
        const fromFactor = conversionFactors[fromUnit];
        const toFactor = conversionFactors[toUnit];
        return value * (fromFactor / toFactor);
    }
    
    // ที่เก็บค่ากรอกเข้ามาเพื่อเพิ่มวัตถุดิบ
    const [ingredientsFood, setIngredientsFood] = useState({
        ind_id: "",
        qtyusedgrum: null,
        un_id: ""
    });

    // เก็บค่าที่รับการเพิ่มวัตถุดิบ
    const [ingredientsFoodSave, setIngredientsFoodSave] = useState([]);

    // เก็บค่าเตครื่องแปลงสูคร
    const [convertData, setConvertData] = useState({
        convert_before: 0,
        convert_before_type: "ช้อนชา",
        convert_after_type: "",
        convert_after: 0
    });

    // แปลงค่า
    const handleConvert = (e) => {
        const { name, value } = e.target;
        setConvertData(prevState => ({
            ...prevState,
            [name]: value
        })
        )
        console.log(ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name)
        console.log(name,'name')

        if (name == "convert_before") {
            const convertedValue = convert(value, convertData.convert_before_type, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
            setResult(convertedValue.toString());
            console.log(convertedValue.toString(),'convertedValue.toString()')
        } else {
            const convertedValue = convert(convertData.convert_before, value, ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name);
            setResult(convertedValue.toString());
        }

    }


    // ย้ายค่าไปใส่ช่องเพื่อเพิ่มวัตถุดิบ
    const handleConvertAfter = () => {
        setIngredientsFood(prevState => ({
            ...prevState,
            "qtyusedgrum": parseFloat(result)
        }));
        setIsOpenPop(false)
    }

    // ล้างค่าในเครื่องแปลง
    const handleConvertCencel = () => {
        setConvertData({
            convert_before: 0,
            convert_before_type: "ช้อนชา",
            convert_after_type: "",
            convert_after: 0
        })
        setResult("0");
        setIsOpenPop(false)
    }

    // ปิด Modal
    const handleModalClose = () => {
        setIngredientsFood({
            ind_id: "",
            qtyusedgrum: null,
            un_id: ""
        })
        // onClose()
    }

    const handleIngredientsFood = (e) => {
        const { name, value } = e.target;
        setIngredientsFood(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name == "ind_id") {
            const un_ind_find = ingredientsOptions.find(ingredient => ingredient.ind_id == value)?.un_ind
            setIngredientsFood(prevState => ({
                ...prevState,
                "un_id": un_ind_find ? un_ind_find.toString() : prevState.un_id
            }));
        }
    }

    return (
        <div>
            <Head>
                <title>วัตถุดิบที่ใช้ - Softdough</title>
            </Head>
            <button className='my-3 mx-5 '>
                <Link href="/ingredients/using/list" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    วัตถุดิบที่ใช้
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182]  border-b border-[#C5B182] py-2'>เพิ่มวัตถุดิบที่ใช้</p>
            <div>
                <div className="mx-6">
                    <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-left ">
                        เลือกประเภท :</label>
                    <div className="mt-2 col-span-3 flex">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="st_type"
                                    value="1"
                                    className="radio checked:bg-[#C5B182]"
                                    onChange={() => setType("1")} // เมื่อเลือกผลิตตามใบสั่งผลิต
                                />
                                <span className="label-text text-[#73664B] px-3 ">ผลิตตามใบสั่งผลิต</span>
                            </label>
                        </div>
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="st_type"
                                    value="2"
                                    className="radio checked:bg-[#C5B182]"
                                    onChange={() => setType("2")} // เมื่อเลือกประเภทอื่นๆ
                                />
                                <span className="label-text text-[#73664B] px-3">อื่นๆ</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* แสดง input text เมื่อเลือกประเภท "ผลิตตามใบสั่งผลิต" */}
                {type === "1" && (
                    <div className="mt-4 mx-6">
                        <div className="flex w-1/2 justify-start">
                            <label className="block text-sm  leading-6 text-[#73664B]  mt-3 text-left ">
                                เลขใบสั่งผลิต :</label>
                            <div className="mt-2 col-span-3">
                                <select
                                    id="countries"
                                    className="bg-[#E3D9C0] block w-full rounded-md py-1.5 text-[#73664B] shadow-sm sm:text-sm sm:leading-6 pl-2"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                >
                                    {filteredUnitOptions.length > 0 ? (
                                        filteredUnitOptions
                                            .sort((a, b) => Number(b.pdo_id) - Number(a.pdo_id))
                                            .map((unit) => (
                                                <option key={unit.pdo_id} value={unit.pdo_id}>
                                                    {unit.pdo_id_name}
                                                </option>
                                            ))
                                    ) : (
                                        <option disabled value="">
                                            ไม่มีใบสั่งผลิตที่ใช้ได้
                                        </option>
                                    )}
                                </select>
                            </div>

                        </div>
                        <p className="mt-4 mb-2  text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดวัตถุดิบที่ใช้</p>

                        <div className="flex justify-end">
                            <Button
                                // href={`../using/edit/${selectedId}`}
                                // as={Link}
                                onClick={handleEditToggle}

                                className="ml-auto  text-white bg-[#F2B461] focus:outline-none rounded-full text-sm px-4 py-2  mb-2 ">{isEditing ? "บันทึก" : "แก้ไข"}</Button>
                        </div>

                        <div className="flex flex-col">
                            <div className="bg-[#908362] text-white text-sm flex">
                                <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                                <div className="flex-1 py-3 text-center">จำนวน</div>
                                <div className="flex-1 py-3 text-center">เศษ</div>
                                <div className="flex-1 py-3 text-center"></div>
                            </div>
                            <div className="max-h-40 overflow-y-auto mb-5">
                                <table className="w-full">
                                    {/* <tbody className="w-full">
                                        {detailData.map((detail, index) => (
                                            <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white flex items-center">
                                                <td scope="col" className="flex-1 text-center">{detail.ind_name}</td>
                                                <td scope="col" className="flex-1 text-center">{detail.qty_used_sum}</td>
                                                <td scope="col" className="flex-1 text-center">{detail.scrap}</td>
                                                <td scope="col" className="flex-1 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <button onClick={() => handleDeleteIngredient(index)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody> */}
                                    <tbody className="w-full">
                                        {editedData.map((detail, index) => (
                                            <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white flex items-center">
                                                <td scope="col" className="flex-1 text-center">
                                                    {
                                                        detail.ind_name
                                                    }
                                                </td>
                                                <td scope="col" className="flex-1 text-center">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            value={detail.qty_used_sum}
                                                            defaultValue={detail.qty_used_sum}
                                                            onChange={(e) => handleInputChange(index, 'qty_used_sum', e.target.value)}
                                                            className="bg-white border border-gray-300 rounded p-1"
                                                        />
                                                    ) : (
                                                        detail.qty_used_sum
                                                    )}
                                                </td>
                                                <td scope="col" className="flex-1 text-center">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            defaultValue={detail.scrap}
                                                            onChange={(e) => handleInputChange(index, 'scrap', e.target.value)}
                                                            className="bg-white border border-gray-300 rounded p-1"
                                                        />
                                                    ) : (
                                                        detail.scrap
                                                    )}
                                                </td>
                                                <td scope="col" className="flex-1 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <button onClick={() => handleDeleteIngredient(index)}>
                                                            <TrashIcon className="h-5 w-5 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="">
                            {/* เช็คคือยืนยันการใช้งาน */}
                            <Checkbox radius="sm" color="warning" checked={isChecked} onChange={handleCheckboxChange} className="text-sm text-[#73664B]">
                                ยืนยันการเพิ่มวัตถุดิบที่ใช้ทันที
                            </Checkbox>
                        </div>
                        < div className="mt-8 " >
                            <button>
                                <Link href="/ingredients/income/all"
                                    type="button"
                                    className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                                    ยกเลิก</Link></button>
                            <>
                                {isOpen && (
                                    <Transition appear show={isOpen} as={Fragment}>
                                        <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
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
                                                                ยืนยันการเพิ่มวัตถุดิบเข้าร้าน
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-[#73664B]">
                                                                    คุณต้องการเพิ่มวัตถุดิบเข้าร้านหรือไม่
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
                                                                        onClick={handleSubmitPro}
                                                                    ><Link href="/ingredients/using/list">
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
                            <button onClick={openModal} type="button" className="ml-2 mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
                        </div >
                    </div>
                )}
                {/* แสดง input เมื่อเลือกประเภท "อื่นๆ" */}
                {type === "2" && (
                    <div className="mt-4 mx-6">
                        <div className="flex w-1/2 justify-start">
                            <label className="block text-sm  leading-6 text-[#73664B]  mt-3 text-left ">
                                หมายเหตุ :</label>
                            <div className="mt-2 col-span-3">
                                <input
                                    type="text"
                                    name="note"
                                    id="note"
                                    className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <p className=" my-4 text-[#73664B] border-b-1 border-b-[#C5B182]">รายละเอียดวัตถุดิบที่ใช้</p>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-6">
                                <div className="flex items-center justify-center">
                                    <p className="text-sm ml-6 mr-3 py-2 text-[#73664B] flex justify-center items-center">วัตถุดิบ: </p>
                                    {/* <select id="ind_id"
                                        className="bg-[#E3D8BF] w-full block  rounded-md border py-1 text-[#73664B] shadow-sm  sm:text-sm sm:leading-6">
                                        {Array.isArray(ingredientsOptions) &&
                                            ingredientsOptions.map((ind: Ingredients) => (
                                                <option key={ind.ind_id.toString()} value={ind.ind_id}>
                                                    {ind.ind_name}
                                                </option>
                                            ))}
                                    </select> */}
                                    <Select
                                        isRequired
                                        label="วัตถุดิบ"
                                        className=" bg-fourth text-primary col-span-2"
                                        size="sm"
                                        color="primary"
                                        name="ind_id"
                                        onChange={handleIngredientsFood}
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.ind_id] : []}
                                    >
                                        {ingredientsOptions.map(type => (
                                            <SelectItem key={type.ind_id} value={type.ind_id}>
                                                {type.ind_name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                {/* <div className="flex items-center justify-center mr-5">
                                    <p className="text-sm  text-[#73664B] flex justify-center items-center w-full">จำนวน : </p>
                                    <input
                                        min="1"
                                        // onChange={handleCancelClick}
                                        type="number"
                                        name="qty_used_sum"
                                        id="qty_used_sum"
                                        className="px-3 bg-[#FFFFDD] w-full block rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center justify-center">
                                    <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">เศษ : </p>
                                    <input
                                        min="0"
                                        // onChange={handleCancelClick}
                                        type="number"
                                        pattern="[0-9]+([.,][0-9]+)?"
                                        name="scrap"
                                        id="scrap"
                                        className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    />
                                </div> */}
                                <div className="flex items-center justify-center">
                                    <p className="text-sm  py-2 text-[#73664B] flex justify-center items-center mr-3">ปริมาณ : </p>
                                    {/* <input
                                        min="0"
                                        // onChange={handleCancelClick}
                                        type="qtyusedgrum"
                                        pattern="[0-9]+([.,][0-9]+)?"
                                        name="qtyusedgrum"
                                        id="qtyusedgrum"
                                        className="px-3 bg-[#FFFFDD] block w-1/2 rounded-t-md border border-b-[#C5B182] py-1 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
                                    /> */}
                                     <Input
                                            isRequired
                                            type="number"
                                            label="ปริมาณ"
                                            size="sm"
                                            width="100%"
                                            className=" bg-fourth text-primary"
                                            color="primary"
                                            name="qtyusedgrum"
                                            onChange={handleIngredientsFood}
                                            value={ingredientsFood.qtyusedgrum == null ? "" : ingredientsFood.qtyusedgrum}
                                        />
                                </div>

                                {/* เครื่องแปลงหน่วย */}
                                <Popover placement="bottom" isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} showArrow offset={10} style={{ fontFamily: 'kanit' }} backdrop="opaque">
                                            <PopoverTrigger>
                                                <Button isIconOnly className="ml-2" variant="light" isDisabled={ingredientsFood.ind_id === "" ? true : false}>
                                                    <IoCalculator className="text-2xl" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[340px]">
                                                {(titleProps) => (
                                                    <div className="px-1 py-2 w-full">
                                                        <p className="text-small font-bold text-foreground" {...titleProps}>
                                                            เครื่องแปลงหน่วย
                                                        </p>
                                                        <div className="mt-2 flex w-full">
                                                            <Input onChange={handleConvert} size="sm" name="convert_before" label="กรุณากรอกค่า" type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                value={convertData.convert_before_type}
                                                                name="convert_before_type"
                                                                onChange={handleConvert}
                                                                defaultSelectedKeys={["ช้อนชา"]}
                                                            >
                                                                {UnitDetail.map((item) => (
                                                                    <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>

                                                        <div className="mt-2 flex w-full">
                                                            <Input value={result !== null ? result : "0"} onValueChange={setResult} name="convert_after" size="sm" label="ค่าที่แปลงแล้ว" readOnly type="number" className=" bg-fourth text-primary" color="primary" />
                                                            <Select
                                                                label="หน่วยแปลง"
                                                                color="primary"
                                                                name="convert_after_type"
                                                                className="max-w-md bg-fourth text-primary ml-2"
                                                                size="sm"
                                                                isDisabled
                                                                selectedKeys={ingredientsFood.ind_id ? [ingredientsOptions.find(unit => unit.ind_id == ingredientsFood.ind_id)?.un_ind_name] : []}
                                                            // onChange={handleConvert}
                                                            >
                                                                {UnitDetail.map(type => (
                                                                    <SelectItem key={type.name} value={type.name}>
                                                                        {type.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                        <div className="flex justify-end mt-3">
                                                            <Button className="bg-[#C5B182] text-white mr-2" onPress={() => setIsOpenPop(false)}>
                                                                ปิด
                                                            </Button>
                                                            <Button className="text-white bg-[#736648]" onClick={() => handleConvertAfter()}>
                                                                แทนที่
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </PopoverContent>
                                        </Popover>

                                <Select
                                        isRequired
                                        label="หน่วย"
                                        name="un_id"
                                        size="sm"
                                        color="primary"
                                        className=" bg-fourth text-primary col-span-2"
                                        isDisabled
                                        selectedKeys={ingredientsFood.ind_id ? [ingredientsFood.un_id] : []}
                                    >
                                        <SelectItem key={ingredientsFood.un_id}>{ingredientsOptions.find(ingreds => ingreds.ind_id == ingredientsFood.ind_id)?.un_ind_name}</SelectItem>
                                    </Select>

                                <div className="scale-75 w-full my-2 flex justify-end">
                                    <Button
                                        type="submit"
                                        value="เพิ่มวัตถุดิบ"
                                        className="text-lg text-white border bg-[#F2B461] rounded-full mr-6 py-2 px-2">เพิ่มวัตถุดิบ</Button>
                                </div>
                            </div >
                        </form>
                        <div className=" mt-3 h-1/2">
                            <div className="flex flex-col">
                                <div className="bg-[#908362] text-white text-sm flex">
                                    <div className="flex-1 py-3 text-center">วัตถุดิบ</div>
                                    <div className="flex-1 py-3 text-center">ปริมาณ</div>

                                    {/* <div className="flex-1 py-3 text-center">จำนวน</div> */}
                                    {/* <div className="flex-1 py-3 text-center">เศษ</div> */}
                                    <div className="flex-1 py-3 text-center"></div>
                                </div>
                                <div className="max-h-40 overflow-y-auto mb-5">
                                    <table className="w-full">
                                        <tbody className="w-full">
                                            {addedIngredients.map((addedIngredient, index) => (
                                                <tr key={index} className="even:bg-[#F5F1E8] border-b h-10 text-sm odd:bg-white border-b h-10 text-sm flex items-center">
                                                    <td scope="col" className="flex-1 text-center">{addedIngredient.ind_name}</td>
                                                    {/* <td scope="col" className="flex-1 text-center">{addedIngredient.qty_used_sum}</td>
                                                    <td scope="col" className="flex-1 text-center">{addedIngredient.scrap}</td> */}
                                                    <td scope="col" className="flex-1 text-center">{addedIngredient.qtyusedgrum}</td>

                                                    <td scope="col" className="flex-1 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <button onClick={() => handleDeleteIngredient(index)}>
                                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* เช็คคือยืนยันการใช้งาน */}
                            <Checkbox radius="sm" color="warning" checked={isChecked} onChange={handleCheckboxChange} className="text-sm text-[#73664B]">
                                ยืนยันการเพิ่มวัตถุดิบที่ใช้ทันที
                            </Checkbox>
                        </div>

                        < div className="mt-8 " >
                            <button>
                                <Link href="/ingredients/using/list"
                                    type="button"
                                    className="mx-auto text-white bg-[#C5B182] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5  mb-2 ml-6">
                                    ยกเลิก</Link></button>
                            <>
                                {isOpen && (
                                    <Transition appear show={isOpen} as={Fragment} >
                                        <Dialog as="div" onClose={closeModal} className={`relative z-10 ${kanit.className}`}>
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
                                                                ยืนยันการเพิ่มวัตถุดิบเข้าร้าน
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-[#73664B]">
                                                                    คุณต้องการเพิ่มวัตถุดิบเข้าร้านหรือไม่
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
                                                                        onClick={handleSubmit2}
                                                                    ><Link href="/ingredients/using/list">
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
                            <button onClick={openModal} type="button" className="ml-2 mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
                        </div >





                    </div>

                )}
            </div>

        </div>
    )
}

export default Add