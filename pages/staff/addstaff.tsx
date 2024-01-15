import React, { Fragment, useState } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
// import Datepicker from "../components/admin-softdough/DatePicker";
import Datepicker from "react-tailwindcss-datepicker";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function addstaff() {

  const [nameEm, setNameEm] = useState('');
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userPassw, setUserPassw] = useState('');
  const [userDepart, setUserDepart] = useState('');
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }
  // modal
  // const [isOpen, setIsOpen] = useState(true); จะขึ้นอัตโนมัติ
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const InputSave = () => {
    console.log("Test")

  }
  // ปุ่มยกเลิก
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    tel: '',
    pw: '',
    depart: '',
  });
  // const resetForm = () => {
  //   setFormData({
  //     name: '',
  //     username: '',
  //     tel: '',
  //     pw: '',
  //     depart: '',
  //   });
  // };

  // FormData sand to API ถ้าส่งให้ อฟ ก็ส่งอันนี้ไปให้เลย Type JSON
  const formDatasave = {
    nameEm,
    userName,
    userPassw,
    userDepart,
    userTel,
    value
  }

  const handleCancelClick = () => {
    setFormData({
      name: '',
      username: '',
      tel: '',
      pw: '',
      depart: ''
    });

    console.log("Test data => ", formDatasave);

    setNameEm('');
    setUserName('');
    setUserDepart('');
    setUserPassw('');
    setUserTel('');
    setValue({
      startDate: null,
      endDate: null
    });
  };

  // console.log("Name => ",nameEm);
  // console.log("UserName => ",userDepart);
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

    console.log('categories:', formDatasave);

    if (!formDatasave.nameEm || !formDatasave.nameEm.trim()) {
      errors.st_name = 'กรุณากรอกชื่อพนักงาน';
    }

    if (!formDatasave.userName || !formDatasave.userName.trim()) {
      errors.st_username = 'กรุณากรอกชื่อผู้ใช้งาน';
    }

    if (!formDatasave.userPassw || !formDatasave.userPassw.trim()) {
      errors.st_password = 'กรุณากรอกรหัสผ่าน';
    }

    if (!formDatasave.userTel || !formDatasave.userTel.trim()) {
      errors.st_tel = 'กรุณากรอกเบอร์โทร';
    }

    console.log('formErrors:', errors);

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div className='h-screen'>
      <p className='text-[#F2B461] font-medium m-4'>เพิ่มพนักงาน</p>
      <form className="mt-5 w-1/2 ">
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            ชื่อพนักงาน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="text"
              name="name"
              id="name"
              value={nameEm}
              onChange={(e) => setNameEm(e.target.value)}
              placeholder='ชื่อพนักงาน'
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
            {formErrors.st_name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.st_name}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            ชื่อผู้ใช้งาน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="text"
              name="username"
              id="username"
              placeholder='ชื่อผู้ใช้งาน'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
            {formErrors.st_username && (
              <p className="text-red-500 text-xs mt-1">{formErrors.st_username}</p>
            )}
          </div>

        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            รหัสผ่าน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="password"
              name="pw"
              id="pw"
              placeholder='รหัสผ่าน'
              value={userPassw}
              onChange={(e) => setUserPassw(e.target.value)}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
            {formErrors.st_password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.st_password}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            เบอร์โทร :</label>
          <div className="mt-2 col-span-2">
            <input
              type="text"
              name="tel"
              id="tel"
              placeholder='เบอร์โทร'
              value={userTel}
              onChange={(e) => setUserTel(e.target.value)}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
            {formErrors.st_tel && (
              <p className="text-red-500 text-xs mt-1">{formErrors.st_tel}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            แผนก :</label>
          <div className="mt-2 col-span-2 flex">
            <div className="form-control">
              <label className="label cursor-pointer ">
                <input type="radio" name="depart" value={userDepart} onChange={() => setUserDepart("1")} checked={userDepart === "1"} className="radio checked:bg-[#C5B182] " />
                <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
              </label>
            </div>
            <div className="form-control ml-4">
              <label className="label cursor-pointer">
                <input type="radio" name="depart" value={userDepart} onChange={() => setUserDepart("2")} checked={userDepart === "2"} className="radio checked:bg-[#C5B182]" />
                <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
              </label>
            </div>
            {/* <select id="countries"
              className="bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2">
              <option>พนักงานฝ่ายขาย</option>
              <option>พนักงานฝ่ายผลิต</option>
            </select> */}
          </div>
        </div>
        <div className="grid grid-cols-3 items-center mt-3 ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            วันที่เข้าทำงาน :</label>
          <Datepicker
            className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </form>
      <div className="grid grid-cols-3 items-center mt-3" >
        <button
          onClick={handleCancelClick}
          type="button"
          className=" mx-auto w-1/3 text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
          ยกเลิก</button>
        <>
          {isOpen && (
            <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
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
                          className="text-lg font-medium leading-6 text-[73664B]"
                        >
                          ยืนยันการเพิ่มพนักงาน
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-[#73664B]">
                            คุณต้องการเพิ่มพนักงานหรือไม่
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
                              onClick={InputSave}
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

          )
          }
        </>
        <button onClick={() => {
          const isValid = validateForm();
          if (isValid) {
            // ทำงานเมื่อ validateForm ผ่าน
            console.log('Form is valid. Open the modal.');

            // ทำการเรียก openModal ที่นี่
            openModal();
          } else {
            // ทำงานเมื่อ validateForm ไม่ผ่าน
            console.log('Form is not valid. Please check the errors.');
          }
        }} type="button" className="mx-auto w-1/3 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
      </div>

    </div>

  )
}


export default addstaff

