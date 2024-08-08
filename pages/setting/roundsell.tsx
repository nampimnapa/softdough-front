// import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
// import { useRouter } from "next/router";
// import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
// import { Dialog, Transition } from '@headlessui/react';
// import { Button, Input } from "@nextui-org/react";
// import Link from "next/link";
// import { Kanit } from "next/font/google";


// const kanit = Kanit({
//     subsets: ["thai", "latin"],
//     weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function type() {
//     const router = useRouter();
//     const { id } = router.query;
//     const [typeProducts, setTypeProducts] = useState([]);
//     // const [isEditing, setIsEditing] = useState(false);
//     // const [openInput, setOpenInput] = useState(0);
//     // const [newValue, setNewValue] = useState('');
//     // const [newProductName, setNewProductName] = useState('');
//     // const [isAdding, setAdding] = useState(false);
//     // const [message, setMessage] = useState('Loading');
//     useEffect(() => {
//         fetch(`${process.env.NEXT_PUBLIC_API_URL}/circulating_money`)
//             .then(response => response.json())
//             .then(data => {
//                 setTypeProducts(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching unit data:', error);
//             });

//     }, [id]);



//     const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const [formData, setFormData] = useState({
//         change: 0,
//     });


//     // const handleAddProduct = () => {
//     //     setAdding(true);
//     // };

//     const [isOpen, setIsOpen] = useState(false);

//     const closeModal = () => {
//         setIsOpen(false);
//     };

//     const openModal = () => {
//         setIsOpen(true);
//     };

//     const [message, setMessage] = useState('Loading');
//     const handleSubmit = async () => {
//         // event.preventDefault();

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/circulating_money`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//             credentials: 'include',

//         });
//         const responseData = await response.json();

//         if (responseData.message === 'success') {
//             setMessage('Data added successfully');
//             router.push('/ingredients/all');
//         } else {
//             setMessage(responseData.message || 'Error occurred');
//         }

//         // Reset the form after submission
//         // (event.target as HTMLFormElement).reset();
//     }

//     return (
//         <div className="h-screen">
//             <p className='text-[#F2B461] font-medium m-4'>ประเภทรายการจ่าย</p>
//             <div className="flex justify-center">
//                 <div className="mt-5 w-1/2 ">
//                     <div className="grid grid-cols-4 items-center">
//                         <label htmlFor="change" className="text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//                             เงินทอนตั้งต้น :</label>
//                         {/* <div className="mt-2 col-span-2"> */}
//                         <input
//                             placeholder="จำนวน"
//                             min="0"
//                             value={formData.change}
//                             onChange={handleInputChange}
//                             type="number"
//                             name="change"
//                             id="min"
//                             autoComplete="family-name"
//                             // placeholder='ชื่อผู้ใช้งาน'
//                             className="px-3 bg-[#FFFFDD] w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  sm:text-sm sm:leading-6 focus:outline-none"
//                         />
//                         <div>
//                             <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button>
//                         </div>
//                         {/* </div> */}
//                     </div>

//                     {/* <div className="flex w-full flex-col">
//                     <div className="relative overflow-x-auto mx-4">
//                         <div className="flex items-center justify-end mb-2"> */}
//                     {/* <button
//                                 className="scale-90 px-3 p-2 text-sm rounded-full text-white bg-[#73664B] border hover:bg-[#5E523C] flex"
//                                 onClick={handleAddProduct}
//                             >
//                                 <PlusIcon className="h-5 w-5 text-white mr-2" />
//                                 เพิ่ม
//                             </button> */}


//                 </div>
//             </div>

//             {/* <div className="mt-2 p-4">
//                 <div className="relative overflow-x-auto">

//                         <table className="w-full text-sm text-center text-gray-500">
//                             <thead>
//                                 <tr className="text-white font-normal bg-[#908362]">
//                                     <th scope="col" className="px-6 py-3">วัน/เดือน/ปี</th>
//                                     <th scope="col" className="px-6 py-3">เงินทอนตั้งต้น</th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                     <tr key={staffItem.ep_id} className={classNames(idx % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-white', 'border-b h-10', 'text-[#73664B]')}>
//                                         <td scope="row" className="px-6 py-1">
//                                             {staffItem.ep_date}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ept_name}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ep_note}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.ep_sum_formatted}
//                                         </td>
//                                         <td className="px-6 py-1">
//                                             {staffItem.st_name}
//                                         </td>
//                                     </tr>
//                             </tbody>
//                         </table>
//                     {loading && <p className="text-center text-sm text-[#73664B] py-3">Loading...</p>}
//                     {error && <p className="text-center text-sm py-3 text-red-500">{error}</p>}
//                     {!loading && !error && filteredStaff.length === 0 && (
//                         <p className="text-center text-sm text-[#73664B] py-3">ไม่มีรายการจ่าย</p>
//                     )}
//                 </div>
//             </div> */}


//             <div className="w-1/2  mt-10  flex justify-start " >

//                 <>
//                     {isOpen && (
//                         <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
//                             <Dialog as="div" className="relative z-10" onClose={closeModal}  >
//                                 <Transition.Child
//                                     as={Fragment}
//                                     enter="ease-out duration-300"
//                                     enterFrom="opacity-0"
//                                     enterTo="opacity-100"
//                                     leave="ease-in duration-200"
//                                     leaveFrom="opacity-100"
//                                     leaveTo="opacity-0"
//                                 >
//                                     <div className="fixed inset-0 bg-black/25" />
//                                 </Transition.Child>

//                                 <div className="fixed inset-0 overflow-y-auto">
//                                     <div className="flex min-h-full items-center justify-center p-4 text-center">
//                                         <Transition.Child
//                                             as={Fragment}
//                                             enter="ease-out duration-300"
//                                             enterFrom="opacity-0 scale-95"
//                                             enterTo="opacity-100 scale-100"
//                                             leave="ease-in duration-200"
//                                             leaveFrom="opacity-100 scale-100"
//                                             leaveTo="opacity-0 scale-95"
//                                         >
//                                             <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                                                 <Dialog.Title
//                                                     as="h3"
//                                                     className="text-lg font-medium leading-6 text-[73664B]"
//                                                 >
//                                                     ยืนยันการเพิ่มวัตถุดิบ
//                                                 </Dialog.Title>
//                                                 <div className="mt-2">
//                                                     <p className="text-sm text-[#73664B]">
//                                                         คุณต้องการเพิ่มวัตถุดิบ
//                                                     </p>
//                                                 </div>
//                                                 {/*  choose */}
//                                                 <div className="flex justify-end mt-2">
//                                                     <div className="inline-flex justify-end">
//                                                         <Button
//                                                             type="button"
//                                                             className="text-[#73664B] bg-white inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                             onClick={closeModal}
//                                                         >
//                                                             ยกเลิก
//                                                         </Button>

//                                                         <Button
//                                                             type="button"
//                                                             className="bg-white text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] hover:text-[#73664B]  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                                             onClick={handleSubmit}
//                                                         ><Link href="/ingredients/all">
//                                                                 ยืนยัน
//                                                             </Link>
//                                                         </Button>
//                                                     </div>
//                                                 </div>
//                                             </Dialog.Panel>
//                                         </Transition.Child>
//                                     </div>
//                                 </div>
//                             </Dialog>
//                         </Transition>
//                     )
//                     }
//                 </>
//                 {/* <button onClick={openModal} type="button" className="ml-2 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">บันทึก</button> */}
//             </div >
//             {/* <table className="w-full text-sm text-center table-fixed">
//               <thead>
//                 <tr className="text-white font-normal bg-[#908362]">
//                   <th scope="col" className="px-3 py-3 w-64">
//                     ลำดับ
//                   </th>
//                   <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden">
//                     ชื่อประเภทรายการจ่าย
//                   </th>
//                   <th scope="col" className="px-12 py-3 whitespace-nowrap overflow-hidden"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {typeProducts.length > 0 || isAdding ? (
//                   typeProducts.map((type, index) => (
//                     <tr key={type.ept_id} className={index % 2 === 0 ? "odd:bg-white" : "even:bg-[#F5F1E8]"}>

//                       <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">{index + 1}</td>
//                       {openInput === type.ept_id ? (
//                         <td className="py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
//                           <input
//                             className="w-full h-9 focus:outline-none border"
//                             type="text"
//                             defaultValue={type.ept_name}
//                             onChange={(event) => handleInputChange(event, type.ept_id)}
//                           />
//                         </td>
//                       ) : (
//                         <td className="ms-7 py-1 text-left text-[#73664B] whitespace-nowrap overflow-hidden">{type.ept_name}</td>
//                       )}
//                       {isEditing && openInput === type.ept_id ? (
//                         <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem] flex items-center justify-end">
//                           <button type="button" onClick={handleCancelEdit} className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light">
//                             ยกเลิก
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => handleSaveChanges(type.ept_id)}
//                             className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
//                           >
//                             บันทึก
//                           </button>
//                         </td>
//                       ) : (
//                         <td className="me-2 py-4 flex items-center justify-end whitespace-nowrap overflow-hidden">
//                           <button type="button" onClick={() => changeInput(type.ept_id)}>
//                             <a href="#" className="w-full flex justify-center items-center">
//                               <PencilSquareIcon className="h-4 w-4 text-[#73664B]" />
//                             </a>
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="text-center text-sm text-[#73664B] py-3">
//                       ไม่มีข้อมูลประเภทรายการจ่าย
//                     </td>
//                   </tr>
//                 )}
//                 {isAdding && (
//                   <tr key="new" className={typeProducts.length % 2 === 0 ? "odd:bg-white" : "even:bg-[#F5F1E8]"}>
//                     <td scope="row" className="px-3 py-1 w-96 text-[#73664B] whitespace-nowrap dark:text-white">
//                       {typeProducts.length + 1}
//                     </td>
//                     <td className="py-1 text-left w-96 text-[#73664B] whitespace-nowrap overflow-hidden">
//                       <input
//                         className="w-full h-9 focus:outline-none border"
//                         type="text"
//                         value={newProductName}
//                         onChange={(event) => setNewProductName(event.target.value)}
//                       />
//                     </td>
//                     <td className="me-2 my-1 pt-[0.30rem] pb-[0.30rem] flex items-center justify-end">
//                       <button
//                         type="button"
//                         onClick={handleCancelEdit}
//                         className="border px-4 py-1 rounded-xl bg-[#F26161] text-white font-light"
//                       >
//                         ยกเลิก
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleAddChanges}
//                         className="border px-4 py-1 rounded-xl bg-[#87DA46] text-white font-light"
//                       >
//                         บันทึก
//                       </button>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table> */}

//             {/* </div>
//              </div>
//          </div> */}
//         </div>

//     );
// }

// export default type;

import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from '@headlessui/react';
import { Button } from "@nextui-org/react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function Type() {
    const router = useRouter();
    const [typeProducts, setTypeProducts] = useState([]);
    const [formData, setFormData] = useState({ change: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Loading');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/circulating_money`)
            .then(response => response.json())
            .then(data => {
                setTypeProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleSubmit = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/circulating_money`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
        });
        const responseData = await response.json();
    
        if (responseData.message === 'success') {
            setMessage('Data added successfully');
            closeModal();
            router.replace('/setting/roundsell').then(() => router.reload()); // เปลี่ยนเส้นทางแล้วรีเฟรชหน้า
        } else {
            setMessage(responseData.message || 'Error occurred');
        }
    };
    

    const today = new Date().toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return (
        <div className="h-screen">
            <p className='text-[#F2B461] font-medium m-4'>ประเภทรายการจ่าย</p>
            {/* <div className="flex "> */}
            <div className="mt-5">
                <div className="flex flex-row items-center w-full">
                    <div className=" items-center basis-1/3 text-lg font-medium leading-6 text-[#73664B] text-right mr-5">
                        {today}
                    </div>

                    <div className="basis-1/3 flex items-center justify-center">
                        <label
                            htmlFor="change"
                            className="text-sm font-medium leading-6 text-[#73664B] mr-3"
                        >
                            เงินทอนตั้งต้น :
                        </label>
                        <input
                            placeholder="จำนวน"
                            value={formData.change === 0 ? '' : formData.change}
                            onChange={handleInputChange}
                            type="number"
                            name="change"
                            id="change"
                            className="w-2/3 px-3 bg-[#FFFFDD] rounded-md border border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm placeholder:text-[#C5B182] sm:text-sm sm:leading-6 focus:outline-none"
                        />

                    </div>
                    <div className="basis-1/3 ">
                        <button
                            onClick={openModal}
                            type="button"
                            className="ml-2 text-white bg-[#73664B] focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 "
                        >
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>

            {/* </div> */}

            <div className="mt-2 p-4">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-center text-gray-500">
                        <thead>
                            <tr className="text-white font-normal bg-[#908362]">
                                <th scope="col" className="px-6 py-3">วัน/เดือน/ปี</th>
                                <th scope="col" className="px-6 py-3">เงินทอนตั้งต้น</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={2} className="text-center py-3">Loading...</td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={2} className="text-center py-3 text-red-500">{error}</td>
                                </tr>
                            )}
                            {!loading && !error && typeProducts.length > 0 && typeProducts.map((item, idx) => (
                                <tr key={item.cm_id} className={idx % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-white'}>
                                    {/* <td className="px-6 py-1">{new Date(item.created_at).toLocaleDateString()}</td> */}
                                    <td className="px-6 py-1">{item.created_at}</td>
                                    <td className="px-6 py-1">{item.change}</td>


                                </tr>
                            ))}
                            {!loading && !error && typeProducts.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="text-center py-3 text-[#73664B]">ไม่มีรายการจ่าย</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[73664B]">
                                        ยืนยันการเพิ่มเงินตั้งต้น
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-[#73664B]">
                                            คุณต้องการเพิ่มเงินตั้งต้นหรือไม่?
                                        </p>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            type="button"
                                            className="text-[#73664B] bg-white inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            ยกเลิก
                                        </Button>
                                        <Button
                                            type="button"
                                            className="ml-3 text-white bg-[#73664B] inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium hover:bg-[#5E523C] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={handleSubmit}
                                        >
                                            ยืนยัน
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default Type;
