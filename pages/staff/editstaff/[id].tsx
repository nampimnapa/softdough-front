import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
});


function detailstaff() {
    // Data JSON ที่รับมาจากหลังบ้าน เอามาแสดงในช่องอินพูต
    // const categoriesData = {
    //     st_id: 1,
    //     st_name: 'น้องอายฟู',
    //     st_username: 'eyefu',
    //     st_password: '1234',
    //     st_tel: '099-9999999',
    //     st_type: '1',
    //     st_start: "2025-01-12"
    // }
    const router = useRouter();
    const { id } = router.query;
    // const [categories, setCategories] = useState<{
    //     st_id: number;
    //     st_name: string;
    //     st_username: string;
    //     st_password: string;
    //     st_tel: string;
    //     st_type: string;
    //     st_start: string;
    // }>(categoriesData);
    const [staff, setStaff] = useState({
        st_id:0,
        st_username: '',
        st_password: '',
        st_name: '',
        st_tel: '',
        st_start: "",
        st_end: '',
        st_type: '',
        st_status: ''
    });

    const [leaveData, setLeaveData] = useState({
        st_id: staff.st_id,
        st_end: "",
        st_status: 2
    });

    // เอาไว้สำหรับกำหนดวันใส่ช่องอินพุต ทำงานเมื่อมีการรีโหลดหน้าครั้งแรก
    useEffect(() => {
        setWorkDate({
            startDate: staff.st_start,
            endDate: staff.st_start
        })
    }, [])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch staff data based on st_id
        fetch(`http://localhost:8080/staff/read/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setStaff(data);
                setLoading(false);
                console.log(staff);

            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);
    // Eyefuu ของ อฟ มันจะเลือกทำอันได อันหนึ่ง ดูจากการเลือกว่าทำงานหรือลาออก ดูบรรทัด 343
    // send data json for edit employees

    // const handleEditWork = () => {
    //     setIsOpen(false);
    //     console.log("handleEditWork", categories);

    // }
    const handleEditWork = async () => {
        try {
            // Send updated data to the server
            const response = await fetch(`http://localhost:8080/staff/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staff),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData.message);
                // Redirect to staff list page or show a success message
                router.push(`../${staff.st_id}`);
            } else {
                console.error('Update failed:', responseData);
                // Handle update failure, show error message, etc.
            }
        } catch (error) {
            console.error('Error updating staff data:', error);
        }
    
        // if (validateForm()) {
        //     setIsOpen(false);
        //     console.log("handleEditWork", staff);
        // }
    };

    // Eyefuu ของ อฟ
    // send data json for leave employee
    // const handleLeaveWork = () => {
    //     if (validateForm()) {
    //         setIsOpen(false);
    //         console.log("handleLeaveWork", leaveData);
    //     }
    // };
    const handleLeaveWork = () => {
        setIsOpen(false);
        console.log("handleLeaveWork", leaveData);
    }



    // //workDate
    // const [workDate, setWorkDate] = useState({
    //     startDate: null,
    //     endDate: null
    // });

    // //leaveDate
    const [leaveDate, setLeaveDate] = useState({
        startDate: null,
        endDate: null
    });

    const [workDate, setWorkDate] = useState(null);

    // // State สำหรับเช็คว่าจะทำงาน หรือ ลาออก
    const [leaveDateselect, setLeaveDateselect] = useState(false);

    // const handleWorkDateChange = (workDate: { startDate: any; endDate: any; }) => {
    //     console.log("workDate:", workDate);
    //     setWorkDate(workDate);
    //     setCategories((prevFormIn) => ({
    //         ...prevFormIn,
    //         "st_start": workDate.startDate,
    //     }));
    // };

    const handleLeaveDateChange = (leaveDate: { startDate: any; endDate: any; }) => {
        console.log("leaveDate:", leaveDate);
        setLeaveDate(leaveDate);
        setLeaveData((prevFormIn) => ({
            ...prevFormIn,
            "st_end": workDate.startDate,
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    // const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    //     const { name, value } = e.target;
    //     setCategories((prevFormIn) => ({
    //         ...prevFormIn,
    //         [name]: value,
    //     }));
    // }

    const leaveSelect = (e: number) => {
        console.log('leaveSelect', e)
        if (e == 1) {
            setLeaveDateselect(false)
        } else if (e == 2) {
            setLeaveDateselect(true)
            setLeaveDate({
                startDate: new Date(),
                endDate: new Date()
            })
        }
    }

    // console.log("Data => ", categories)

    // เขียนดัก
    // const [categories, setCategories] = useState<{
    //     st_id: number;
    //     st_name: string;
    //     st_username: string;
    //     st_password: string;
    //     st_tel: string;
    //     st_type: string;
    //     st_start: string;
    // }>(categoriesData);

    //ก่อน อฟ มา
    // const [formErrors, setFormErrors] = useState({
    //     st_name: '',
    //     st_username: '',
    //     st_password: '',
    //     st_tel: '',
    // });

    // const validateForm = () => {
    //     const errors: typeof formErrors = {};

    //     console.log('categories:', categories);

    //     if (!categories.st_name || !categories.st_name.trim()) {
    //         errors.st_name = 'กรุณากรอกชื่อพนักงาน';
    //     }

    //     if (!categories.st_username || !categories.st_username.trim()) {
    //         errors.st_username = 'กรุณากรอกชื่อผู้ใช้งาน';
    //     }

    //     if (!categories.st_password || !categories.st_password.trim()) {
    //         errors.st_password = 'กรุณากรอกรหัสผ่าน';
    //     }

    //     if (!categories.st_tel || !categories.st_tel.trim()) {
    //         errors.st_tel = 'กรุณากรอกเบอร์โทร';
    //     }

    //     console.log('formErrors:', errors);

    //     setFormErrors(errors as typeof formErrors);  // แปลง errors เป็นชนิดของ formErrors

    //     return Object.keys(errors).length === 0;
    // };
    //อฟเอามา
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setStaff((prevValues) => ({
            ...prevValues,
            [name]: type === 'radio' ? value : value,
        }));
    };
   const [formErrors, setFormErrors] = useState<{
        st_name: string;
        st_username: string;
        st_password: string;
        st_tel: string;
    }>({ 
        st_name: '',
        st_username: '',
        st_password: '',
        st_tel: '',
    });

    const validateForm = () => {
        const errors: typeof formErrors = {
            st_name: '',
            st_username: '',
            st_password: '',
            st_tel: '',
        };

//         console.log('categories:', categories);

//         if (!categories.st_name || !categories.st_name.trim()) {
//             errors.st_name = 'กรุณากรอกชื่อพนักงาน';
//         }

//         if (!categories.st_username || !categories.st_username.trim()) {
//             errors.st_username = 'กรุณากรอกชื่อผู้ใช้งาน';
//         }

//         if (!categories.st_password || !categories.st_password.trim()) {
//             errors.st_password = 'กรุณากรอกรหัสผ่าน';
//         }

//         if (!categories.st_tel || !categories.st_tel.trim()) {
//             errors.st_tel = 'กรุณากรอกเบอร์โทร';
//         }

//         console.log('formErrors:', errors);

// //         setFormErrors(errors);

//         return Object.keys(errors).length === 0;
//     };

    };
    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href="/staff/detailstaff" className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายละเอียดพนักงาน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b border-b-3 border-[#C5B182] py-2'>แก้ไขพนักงาน</p>

            <div className="mt-5 w-1/2 ">
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="st_name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        ชื่อพนักงาน :</label>
                    <div className="mt-2 col-span-2 ">
                        <input
                            required
                            key={staff.st_id}
                            defaultValue={staff.st_name}
                            onChange={handleInputChange}
                            type="text"
                            name="st_name"
                            id="st_name"
                            autoComplete="given-name"
                            placeholder='ชื่อพนักงาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                        {/* {formErrors.st_name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.st_name}</p>
                        )} */}

                    </div>
                </div>
                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="st_username" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        ชื่อผู้ใช้งาน :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            required
                            defaultValue={staff.st_username}
                            onChange={handleInputChange}
                            type="text"
                            name="st_username"
                            id="st_username"
                            autoComplete="family-name"
                            placeholder='ชื่อผู้ใช้งาน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                        {/* {formErrors.st_username && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.st_username}</p>
                        )} */}
                    </div>
                </div>


                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="st_password" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        รหัสผ่าน :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            required
                            onChange={handleInputChange}
                            defaultValue={staff.st_password}
                            type="text"
                            name="st_password"
                            id="st_password"
                            autoComplete="family-name"
                            placeholder='รหัสผ่าน'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                        {/* {formErrors.st_password && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.st_password}</p>
                        )} */}
                    </div>
                </div>


                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="st_tel" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        เบอร์โทร :</label>
                    <div className="mt-2 col-span-2">
                        <input
                            required
                            defaultValue={staff.st_tel}
                            onChange={handleInputChange}

                            type="text"
                            name="st_tel"
                            id="st_tel"
                            autoComplete="family-name"
                            placeholder='เบอร์โทร'
                            className="px-3 bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]  placeholder:pl-3  sm:text-sm sm:leading-6 focus:outline-none"
                        />
                         {/* {formErrors.st_tel && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.st_tel}</p>
                        )} */}
                    </div>
                </div>


                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        แผนก :</label>
                    <div className="mt-2 col-span-2 flex">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="st_type" className="radio checked:bg-[#C5B182] " defaultChecked={staff.st_type === "1"}
                                    onChange={handleInputChange}
                                />
                                <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
                            </label >
                        </div >
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="st_type" className="radio checked:bg-[#C5B182]" defaultChecked={staff.st_type === "2"}
                                    onChange={handleInputChange}
                                />
                                <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
                            </label >
                        </div >
                    </div >
                </div >


                <div className="grid grid-cols-3 items-center mt-3 ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        วันที่เข้าทำงาน :</label>
                    <Datepicker


                        useRange={false}
                        asSingle={true}
                        // value={staff.st_start}
                        // onChange={handleInputChange}
                        value={workDate}
                        onChange={handleInputChange}
                    />

                </div>


                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        สถานะ :</label>
                    <div className="mt-2 col-span-2 flex">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="radio-1" className="radio checked:bg-[#C5B182] "
                                    onChange={() => leaveSelect(1)} />
                                <span className="label-text text-[#73664B] px-3 ">ทำงาน</span>
                            </label>
                        </div>
                        <div className="form-control ml-4">
                            <label className="label cursor-pointer">
                                <input type="radio" name="radio-1" className="radio checked:bg-[#C5B182]"
                                    onChange={() => leaveSelect(2)}
                                />
                                <span className="label-text text-[#73664B] px-3">ลาออก</span>
                            </label>
                        </div>
                    </div>
                </div>

                {
                    leaveDateselect && (
                        <div className="grid grid-cols-3 items-center mt-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B] mt-3 text-right mr-5">
                                วันที่ลาออก :</label>
                            <Datepicker
                                useRange={false}
                                asSingle={true}
                                value={leaveDate}
                                onChange={handleLeaveDateChange}
                            />
                        </div>
                    )
                }
            </div >

            <div className="flex justify-between items-center mt-3" >
                <button>

                    <Link href="/staff/detailstaff"
                        type="button"
                        className=" mx-auto  text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-6">
                        ยกเลิก</Link></button>
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
                                                    ยืนยันการแก้ไขพนักงาน
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-[#73664B]">
                                                        คุณต้องการแก้ไขพนักงานหรือไม่
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
                                                            onClick={leaveDateselect ? handleLeaveWork : handleEditWork}>
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
                {/* <button onClick={openModal} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button> */}
                <button onClick={() => {
                    // const isValid = validateForm();

                    // if (isValid) {
                    //     // ทำงานเมื่อ validateForm ผ่าน
                    //     console.log('Form is valid. Open the modal.');

                    //     // ทำการเรียก openModal ที่นี่
                        openModal();
                    // } else {
                    //     // ทำงานเมื่อ validateForm ไม่ผ่าน
                    //     console.log('Form is not valid. Please check the errors.');
                    // }
                }} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                    เสร็จสิ้น
                </button>

            </div >
        </div >
    );
}


export default detailstaff;