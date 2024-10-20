import React, { useEffect, useState, Fragment } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { Dialog, Transition } from '@headlessui/react';
// import {Select, SelectItem} from "@nextui-org/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

interface Staff {
    ep_id: number;
    ep_date: string;
    ept_name: string;
    ep_note: string;
    ep_sum_formatted: string;
    st_name: string;
}

function Approve() {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    // const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readstatus`, {
            credentials: 'include' // Ensure cookies are sent with the request
        })
        
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setStaff(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(`Failed to load data: ${error.message}`);
                setLoading(false);
            });
    }, []);
    
    // const [ingredientsOptions, setIngredientsOptions] = useState<Ingredients[]>([]);
    // interface Ingredients {
    //     ept_id: string;
    //     ept_name: string;
    //     // ตัวแปรอื่น ๆ ที่เกี่ยวข้อง
    // }
    // useEffect(() => {
    //     // Fetch unit data from the server and set the options
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/readtype`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setIngredientsOptions(data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching unit data:', error);
    //         });
    // }, []);
  
    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (staffItem: Staff) => {
        setSelectedStaff(staffItem);
        setIsOpen(true);
    };

    const closeModal1 = () => {
        setIsOpen1(false);
    };

    const openModal1 = (staffItem: Staff) => {
        setSelectedStaff(staffItem);
        setIsOpen1(true);
    };

    const saveData = async () => {
        if (selectedStaff === null) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/updateStatus/${selectedStaff.ep_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.message === 'expenses ep_status = 2') {
            console.log("Update success");
            setIsOpen(false);
            setStaff(prevStaff => prevStaff.filter(staff => staff.ep_id !== selectedStaff.ep_id));
        }
    };
    //ยกเลิก
    const saveData1 = async () => {
        if (selectedStaff === null) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/deleted/${selectedStaff.ep_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Ensure cookies are sent with the request
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.message === 'expenses deleted') {
            console.log("Update success");
            setIsOpen1(false);
            setStaff(prevStaff => prevStaff.filter(staff => staff.ep_id !== selectedStaff.ep_id));
        }
    };


    return (
        <div className="h-screen bg-white">
            <p className="text-[#F2B461] font-medium m-4">รออนุมัติรายการจ่าย</p>
            


            {/* <Select
                label="Favorite Animal"
                placeholder="Select an animal"
                selectionMode="multiple"
                className="max-w-xs"
            >
                {ingredientsOptions.map((animal) => (
                    <SelectItem key={animal.ept_id}>
                        {animal.ept_name}
                    </SelectItem>
                ))}
            </Select> */}


            <div className="mt-2 p-4">
                <div className="relative overflow-x-auto">
                    
                    {!loading && !error && (
                        <table className="min-w-full table-auto text-sm text-center text-gray-500">
                            <thead>
                                <tr className="text-white font-normal bg-[#908362]">
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">วัน/เดือน/ปี</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">ประเภทรายการจ่าย</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">รายละเอียด</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">จำนวนเงิน</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">พนักงาน</th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map((staffItem, idx) => (
                                    <tr key={staffItem.ep_id} className={classNames(idx % 2 === 0 ? 'bg-[#F5F1E8]' : 'bg-white', 'border-b h-10', 'text-[#73664B]')}>
                                        <td scope="row" className=" py-1">
                                            {staffItem.ep_date}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.ept_name}
                                        </td>
                                        <td className="py-1">
                                            {staffItem.ep_note}
                                        </td>
                                        <td className=" py-1">
                                            {staffItem.ep_sum_formatted}
                                        </td>
                                        <td className=" py-1">
                                            {staffItem.st_name}
                                        </td>
                                        <td className=" py-1 whitespace-nowrap overflow-hidden">
                                            <Button onClick={() => openModal1(staffItem)} className="mr-2 bg-[#F26161] text-white" size="sm">ยกเลิก</Button>
                                            <Button onClick={() => openModal(staffItem)} size="sm" className="bg-[#87DA46] text-white">อนุมัติ</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {loading && <p className="text-center text-sm text-[#73664B] py-3">Loading...</p>}
                    {error && <p className="text-center text-sm py-3 text-red-500">{error}</p>}
                    {!loading && !error && staff.length === 0 && (
                        <p className="text-center text-sm text-[#73664B] py-3">ไม่มีรายการจ่าย</p>
                    )}
                </div>
            </div>

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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-[#73664B]"
                                        >
                                            ยืนยันการอนุมัติ
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {/* <p className="text-base text-[#73664B]">
                                                คุณต้องการยืนยันการอนุมัติ
                                            </p> */}
                                            <ul className="text-sm text-[#73664B]">
                                                <li>วัน/เดือน/ปี: {selectedStaff.ep_date}</li>
                                                <li>ประเภทรายการจ่าย: {selectedStaff.ept_name}</li>
                                                <li>รายละเอียด: {selectedStaff.ep_note}</li>
                                                <li>จำนวนเงิน: {selectedStaff.ep_sum_formatted}</li>
                                                <li>พนักงาน: {selectedStaff.st_name}</li>
                                            </ul>
                                        </div>
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
                                                    onClick={saveData}
                                                >
                                                    ยืนยัน
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
            {isOpen1 && (
                <Transition appear show={isOpen1} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal1}>
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
                                            className="text-lg font-medium leading-6 text-[#73664B]"
                                        >
                                            ยกเลิกรายการ
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {/* <p className="text-base text-[#73664B]">
                                                คุณต้องการยืนยันการอนุมัติ
                                            </p> */}
                                            <ul className="text-sm text-[#73664B]">
                                                <li>วัน/เดือน/ปี: {selectedStaff.ep_date}</li>
                                                <li>ประเภทรายการจ่าย: {selectedStaff.ept_name}</li>
                                                <li>รายละเอียด: {selectedStaff.ep_note}</li>
                                                <li>จำนวนเงิน: {selectedStaff.ep_sum_formatted}</li>
                                                <li>พนักงาน: {selectedStaff.st_name}</li>
                                            </ul>
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="inline-flex justify-end">
                                                <button
                                                    type="button"
                                                    className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal1}
                                                >
                                                    ยกเลิก
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={saveData1}
                                                >
                                                    ยืนยัน
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </div>
    );
}

export default Approve;

// 'use client'

// import { useState } from 'react'
// import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const people = [
//     {
//         id: 1,
//         name: 'Wade Cooper',
//         avatar:
//             'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 2,
//         name: 'Arlene Mccoy',
//         avatar:
//             'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 3,
//         name: 'Devon Webb',
//         avatar:
//             'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
//     },
//     {
//         id: 4,
//         name: 'Tom Cook',
//         avatar:
//             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 5,
//         name: 'Tanya Fox',
//         avatar:
//             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 6,
//         name: 'Hellen Schmidt',
//         avatar:
//             'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 7,
//         name: 'Caroline Schultz',
//         avatar:
//             'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 8,
//         name: 'Mason Heaney',
//         avatar:
//             'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 9,
//         name: 'Claudie Smitham',
//         avatar:
//             'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     {
//         id: 10,
//         name: 'Emil Schaefer',
//         avatar:
//             'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
// ]

// export default function Example() {
//     const [selected, setSelected] = useState(people[3])

//     return (
//         <Listbox value={selected} onChange={setSelected}>
//             <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label>
//             <div className="relative mt-2">
//                 <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
//                     <span className="flex items-center">
//                         <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
//                         <span className="ml-3 block truncate">{selected.name}</span>
//                     </span>
//                     <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
//                         <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
//                     </span>
//                 </ListboxButton>

//                 <ListboxOptions
//                     transition
//                     className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
//                 >
//                     {people.map((person) => (
//                         <ListboxOption
//                             key={person.id}
//                             value={person}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
//                         >
//                             <div className="flex items-center">
//                                 <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" />
//                                 <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
//                                     {person.name}
//                                 </span>
//                             </div>

//                             <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
//                                 <CheckIcon aria-hidden="true" className="h-5 w-5" />
//                             </span>
//                         </ListboxOption>
//                     ))}
//                 </ListboxOptions>
//             </div>
//         </Listbox>
//     )
// }