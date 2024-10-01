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

type Staff = {
    st_id: number;
    st_name: string;
    st_username: string;
    st_password: string;
    st_tel: string;
    st_type: string;
    st_start: string;
    st_end: string,
    st_status: number;
    date_start: string;

};
function Detailstaff() {
    const router = useRouter();
    const { id } = router.query;
    const [staff, setStaff] = useState<Staff>({
        st_id: 0,
        st_username: '',
        st_password: '',
        st_name: '',
        st_tel: '',
        st_start: "",
        st_end: '',
        st_type: '',
        st_status: 0,
        date_start: ''
    });

    const [leaveData, setLeaveData] = useState({
        st_id: staff.st_id,
        st_end: "",
        st_status: 2
    });

    useEffect(() => {
        console.log(staff.st_start)

        setWorkDate({
            startDate: staff.st_start,
            endDate: staff.st_start
        })
    }, [staff])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/read/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setStaff(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    const getData = async (ids) => {
        const responseData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/read/${ids}`, {
            method: 'GET'
        })
        const dataStaff = await responseData.json();
        setStaff(dataStaff);
    }
    
    const handleEditWork = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staff),
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData.message);
                router.push(`../${staff.st_id}`);
            } else {
                console.error('Update failed:', responseData);
            }
        } catch (error) {
            console.error('Error updating staff data:', error);
        }
        console.log(staff)
    };

    const checkDataEdit = () => {
        setStaff((prevFormIn) => ({
            ...prevFormIn,
            "st_end": leaveDate.startDate,
        }));
    }

    const handleLeaveWork = () => {
        setIsOpen(false);
        console.log("handleLeaveWork", leaveData);
    }

    //workDate
    const [workDate, setWorkDate] = useState({
        startDate: null,
        endDate: null
    });

    // //leaveDate
    const [leaveDate, setLeaveDate] = useState({
        startDate: null,
        endDate: null
    });

    // // State สำหรับเช็คว่าจะทำงาน หรือ ลาออก
    const [leaveDateselect, setLeaveDateselect] = useState(false);

    const handleWorkDateChange = (workDate: { startDate: any; endDate: any; }) => {
        console.log("workDate:", workDate);
        setWorkDate(workDate);
        setStaff((prevFormIn) => ({
            ...prevFormIn,
            "st_start": workDate.startDate,
        }));
    };

    const handleLeaveDateChange = (leaveDate: { startDate: any; endDate: any; }) => {
        console.log("leaveDate:", workDate.startDate);
        setLeaveDate(leaveDate);
        setLeaveData((prevFormIn) => ({
            ...prevFormIn,
            "st_end": leaveDate.startDate,
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setStaff((prevFormIn) => ({
            ...prevFormIn,
            [name]: value,
        }));
    }

    const leaveSelect = (e: number) => {
        console.log('leaveSelect', e)
        if (e == 1) {
            setLeaveDateselect(false)
            setStaff((prevFormIn) => ({
                ...prevFormIn,
                "st_status": 1,
            }));
        } else if (e == 2) {
            setLeaveDateselect(true)

            setLeaveDate({
                startDate: new Date().toISOString(),
                endDate: new Date()
            })
            setStaff((prevFormIn) => ({
                ...prevFormIn,
                "st_status": 2,
            }));
        }
    }

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

    };
    return (
        <div className='h-screen'>
            <button className='my-3 mx-5 '>
                <Link href={`/staff/${id}`} className="text-sm w-full flex justify-center items-center text-[#F2B461] hover:text-[#D9CAA7]">
                    <ChevronLeftIcon className="h-5 w-5 text-[#F2B461] hover:text-[#D9CAA7]" />
                    รายละเอียดพนักงาน
                </Link>
            </button>
            <p className='my-1 mx-6 font-semibold text-[#C5B182] border-b  border-[#C5B182] py-2'>แก้ไขพนักงาน</p>

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
                        value={workDate}
                        readOnly={true} 
                        disabled={true} 
                        onChange={handleWorkDateChange}

                    />

                </div>


                <div className="grid grid-cols-3 items-center ">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
                        สถานะ :</label>
                    <div className="mt-2 col-span-2 flex">
                        <div className="form-control">
                            <label className="label cursor-pointer ">
                                <input type="radio" name="radio-1" className="radio checked:bg-[#C5B182] "
                                    onChange={() => leaveSelect(1)} defaultChecked={staff.st_type === "1"} />
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

                    <Link href={`/staff/${id}`}
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
                                                            // onClick={leaveDateselect ? handleLeaveWork : handleEditWork}>
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
                    checkDataEdit();
                    // console.log("Edit work",staff," Edit leave",leaveData)
                }} type="button" className="mx-auto mr-5 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">
                    เสร็จสิ้น
                </button>

            </div >
        </div >
    );
}


export default Detailstaff;