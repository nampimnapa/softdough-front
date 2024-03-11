// import React, { Fragment, useState } from "react";
// // import Datepicker from "react-tailwindcss-datepicker";
// // import Datepicker from "../components/admin-softdough/DatePicker";
// import Datepicker from "react-tailwindcss-datepicker";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function addstaff() {

//   const [nameEm, setNameEm] = useState('');
//   const [userName , setUserName] = useState('');
//   const [userTel , setUserTel] = useState('');
//   const [userPassw , setUserPassw] = useState('');
//   const [userDepart , setUserDepart] = useState('');
//   const [value, setValue] = useState({
//     startDate: null,
//     endDate: null
//   });

//   const handleValueChange = (newValue) => {
//     console.log("newValue:", newValue);
//     setValue(newValue);
//   }
//   // modal
//   // const [isOpen, setIsOpen] = useState(true); จะขึ้นอัตโนมัติ
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };
// // ปุ่มยกเลิก
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     tel: '',
//     pw: '',
//     depart: '',
//   });
//   // const resetForm = () => {
//   //   setFormData({
//   //     name: '',
//   //     username: '',
//   //     tel: '',
//   //     pw: '',
//   //     depart: '',
//   //   });
//   // };

//   // FormData sand to API ถ้าส่งให้ อฟ ก็ส่งอันนี้ไปให้เลย Type JSON
//     const formDatasave = {
//     nameEm,
//     userName,
//     userPassw,
//     userDepart,
//     userTel,
//     value
//   }

//   const handleCancelClick = () => {
//     setFormData({
//       name: '',
//       username: '',
//       tel: '',
//       pw: '',
//       depart: ''});

//       console.log("Test data => ", formDatasave);

//       setNameEm('');
//       setUserName('');
//       setUserDepart('');
//       setUserPassw('');
//       setUserTel('');
//       setValue({
//         startDate: null,
//         endDate: null
//       });
//   };

//   // console.log("Name => ",nameEm);
//   // console.log("UserName => ",userDepart);


//   return (
//     <div className='h-screen'>
//       <p className='text-[#F2B461] font-medium m-4'>เพิ่มพนักงาน</p>
//       <div className="mt-5 w-1/2 ">
//         <div className="grid grid-cols-3 items-center ">
//           <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             ชื่อพนักงาน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={nameEm}
//               onChange={(e) => setNameEm(e.target.value)}
//               placeholder='ชื่อพนักงาน'
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             ชื่อผู้ใช้งาน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="text"
//               name="username"
//               id="username"
//               placeholder='ชื่อผู้ใช้งาน'
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>

//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             รหัสผ่าน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="password"
//               name="pw"
//               id="pw"
//               placeholder='รหัสผ่าน'
//               value={userPassw}
//               onChange={(e) => setUserPassw(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             เบอร์โทร :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="number"
//               name="tel"
//               id="tel"
//               placeholder='เบอร์โทร'
//               value={userTel}
//               onChange={(e) => setUserTel(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             แผนก :</label>
//           <div className="mt-2 col-span-2 flex">
//             <div className="form-control">
//               <label className="label cursor-pointer ">
//                 <input type="radio" name="depart" value={userDepart} onChange={() => setUserDepart("1")} checked={userDepart === "1"} className="radio checked:bg-[#C5B182] " />
//                 <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
//               </label>
//             </div>
//             <div className="form-control ml-4">
//               <label className="label cursor-pointer">
//                 <input type="radio" name="depart" value={userDepart} onChange={() => setUserDepart("2")} checked={userDepart === "2"} className="radio checked:bg-[#C5B182]" />
//                 <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
//               </label>
//             </div>
//             {/* <select id="countries"
//               className="bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2">
//               <option>พนักงานฝ่ายขาย</option>
//               <option>พนักงานฝ่ายผลิต</option>
//             </select> */}
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center mt-3 ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             วันที่เข้าทำงาน :</label>
//           <Datepicker
//             className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
//             useRange={false}
//             asSingle={true}
//             value={value}
//             onChange={handleValueChange}
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-3 items-center mt-3" >
//         <button
//           onClick={handleCancelClick}
//           type="button"
//           className=" mx-auto w-1/3 text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
//           ยกเลิก</button>
//         <>
//           {isOpen && (
//             <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
//               <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <div className="fixed inset-0 bg-black/25" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 overflow-y-auto">
//                   <div className="flex min-h-full items-center justify-center p-4 text-center">

//                     <Transition.Child
//                       as={Fragment}
//                       enter="ease-out duration-300"
//                       enterFrom="opacity-0 scale-95"
//                       enterTo="opacity-100 scale-100"
//                       leave="ease-in duration-200"
//                       leaveFrom="opacity-100 scale-100"
//                       leaveTo="opacity-0 scale-95"
//                     >
//                       <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-[73664B]"
//                         >
//                           ยืนยันการเพิ่มพนักงาน
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <p className="text-sm text-[#73664B]">
//                             คุณต้องการเพิ่มพนักงานหรือไม่
//                           </p>
//                         </div>
//                         {/*  choose */}
//                         <div className="flex justify-end">
//                           <div className="inline-flex justify-end">
//                             <button
//                               type="button"
//                               className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                               onClick={closeModal}
//                             >
//                               ยกเลิก
//                             </button>

//                             <button
//                               type="button"
//                               className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                               onClick={closeModal}
//                             >
//                               ยืนยัน
//                             </button>
//                           </div>
//                         </div>
//                       </Dialog.Panel>
//                     </Transition.Child>
//                   </div>
//                 </div>
//               </Dialog>
//             </Transition>

//           )
//           }
//         </>
//         <button onClick={openModal} type="button" className="mx-auto w-1/3 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
//       </div>

//     </div>

//   )
// }


// export default addstaff


import React, { ChangeEvent, Fragment, useState } from "react";
// import Datepicker from "react-tailwindcss-datepicker";
// import Datepicker from "../components/admin-softdough/DatePicker";
import Datepicker from "react-tailwindcss-datepicker";
import router from "next/router";
import { Dialog, Transition } from '@headlessui/react';
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function addstaff() {
  const [message, setMessage] = useState('Loading');

  const [startValue, setStartValue] = useState({
    startDate: null,
    endDate: null
  });

  const [valueForm, setValueForm] = useState(
    {
      st_name:"",
      st_username:"",
      st_password:"",
      st_tel:"",
      st_type:"",
      st_start:"",
      st_status:1
    }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValueForm((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const handleValueChangeDate = (newValue: { startDate: any; endDate: any; }) => {
    console.log("newValue:", newValue.startDate);
    setValueForm((prevIngredient) => ({
      ...prevIngredient,
      "st_start": newValue.startDate,
    }));
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


    // ยกเลิก
  const handleCancelClick = () => {
    setValueForm({
        st_name:"",
        st_username:"",
        st_password:"",
        st_tel:"",
        st_type:"",
        st_start:"",
        st_status:1
    })

    setStartValue({
      startDate: null,
      endDate: null
    })
  };

  const saveData = async () =>{
    const response = await fetch(`http://localhost:8080/staff/add`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(valueForm),
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.message === 'success') {
    console.log("success")
    setIsOpen(false);
  }
  }



  return (
    <div className='h-screen'>
      <p className='text-[#F2B461] font-medium m-4'>เพิ่มพนักงาน</p>
      <div className="mt-5 w-1/2 ">
        <div className="grid grid-cols-3 items-center ">
          <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            ชื่อพนักงาน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="text"
              name="st_name"
              id="name"
              value={valueForm.st_name}
              onChange={handleInputChange}
              placeholder='ชื่อพนักงาน'
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            ชื่อผู้ใช้งาน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="text"
              name="st_username"
              id="username"
              placeholder='ชื่อผู้ใช้งาน'
              value={valueForm.st_username}
              onChange={handleInputChange}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
          </div>

        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            รหัสผ่าน :</label>
          <div className="mt-2 col-span-2">
            <input
              type="password"
              name="st_password"
              id="pw"
              placeholder='รหัสผ่าน'
              value={valueForm.st_password}
              onChange={handleInputChange}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            เบอร์โทร :</label>
          <div className="mt-2 col-span-2">
            <input
              type="tel"
              name="st_tel"
              id="tel"
              placeholder='เบอร์โทร'
              value={valueForm.st_tel}
              onChange={handleInputChange}
              className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 items-center ">
          <label  className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
            แผนก :</label>
          <div className="mt-2 col-span-2 flex">
            <div className="form-control">
              <label className="label cursor-pointer ">
                <input type="radio" name="st_type"
                value="1"
                onChange={handleInputChange} 
                className="radio checked:bg-[#C5B182] " />
                <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
              </label>
            </div>
            <div className="form-control ml-4">
              <label className="label cursor-pointer">
                <input type="radio" name="st_type" 
                value="2"
                onChange={handleInputChange} 
                className="radio checked:bg-[#C5B182]" />
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
            // className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
            useRange={false}
            asSingle={true}
            value={startValue}
            onChange={handleValueChangeDate}
            // name="st_start"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 items-center mt-3" >
        <button
          onClick={handleCancelClick}
          type="button"
          className=" mx-auto w-1/3 text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
          ยกเลิก</button>
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

          )
          }
        </>
        <button onClick={openModal} type="button" className="mx-auto w-1/3 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
      </div>

    </div>

  )
}


export default addstaff



//ไม่ได้
// import React, { Fragment, useState } from "react";
// import router from "next/router";

// // import Datepicker from "react-tailwindcss-datepicker";
// // import Datepicker from "../components/admin-softdough/DatePicker";
// import Datepicker from "react-tailwindcss-datepicker";
// import { Dialog, Transition } from '@headlessui/react';
// import { Kanit } from "next/font/google";

// const kanit = Kanit({
//   subsets: ["thai", "latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
// });

// function addstaff() {

//   const [nameEm, setNameEm] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userTel, setUserTel] = useState('');
//   const [userPassw, setUserPassw] = useState('');
//   const [userDepart, setUserDepart] = useState('');
//   const [value, setValue] = useState({
//     startDate: null,
//     endDate: null
//   });

//   const handleValueChange = (newValue) => {
//     console.log("newValue:", newValue);
//     setValue(newValue);
//   }
//   // modal
//   // const [isOpen, setIsOpen] = useState(true); จะขึ้นอัตโนมัติ
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };
//   // ปุ่มยกเลิก
//   // const [formData, setFormData] = useState({
//   //   name: '',
//   //   username: '',
//   //   tel: '',
//   //   pw: '',
//   //   depart: '',
//   // });
//   // const resetForm = () => {
//   //   setFormData({
//   //     name: '',
//   //     username: '',
//   //     tel: '',
//   //     pw: '',
//   //     depart: '',
//   //   });
//   // };

//   // FormData sand to API ถ้าส่งให้ อฟ ก็ส่งอันนี้ไปให้เลย Type JSON
//   // const formDatasave = {
//   //   nameEm,
//   //   userName,
//   //   userPassw,
//   //   userDepart,
//   //   userTel,
//   //   value
//   // }

//   const handleCancelClick = () => {
//     setFormData([]);

//   //   console.log("Test data => ", formDatasave);

//   //   setNameEm('');
//   //   setUserName('');
//   //   setUserDepart('');
//   //   setUserPassw('');
//   //   setUserTel('');
//   //   setValue({
//   //     startDate: null,
//   //     endDate: null
//   //   });
//   };

//   const [message, setMessage] = useState('Loading');
//   const [staff, setStaff] = useState([]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // สร้างอ็อบเจ็กต์ FormData
//     const formData = new FormData(event.currentTarget);

//     // ระบุชนิดของอ็อบเจ็กต์ data และตัวแปร key เป็น string
//     const data: Record<string, any> = {};

//     // ใช้ forEach ของ FormData.entries() เพื่อวนลูปข้อมูล
//     formData.forEach((value, key) => {
//       // ระบุชนิดของ key เป็น string
//       data[key] = value;
//     });

//     try {
//       // ส่งข้อมูลไปยังเซิร์ฟเวอร์
//       const response = await fetch('http://localhost:8080/staff/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const responseData = await response.json();
//       console.log(responseData);

//       // Check the response for success or duplicate username
//       if (responseData.message === 'success') {
//         setMessage('Data added successfully');
//         // If you want to update the staff data, you can do it here
//         // Redirect to the staffindex page
//         // const data = await response.json();
//         //กลับไปหน้าแรกสตาฟ
//         // router.push('./staffindex');
//         setIsOpen(false);
//       } else if (responseData.message === 'Username already exists') {
//         setMessage('Username already exists. Please choose a different username.');
//         setIsOpen(false);
//       } else {
//         setMessage('Error occurred');
//         setIsOpen(false);
//       }

//       // Reset the form after submission
//       (event.target as HTMLFormElement).reset();
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Error occurred');
//       setIsOpen(false);
//     }
//   };
//   // console.log("Name => ",nameEm);
//   // console.log("UserName => ",userDepart);


//   return (
//     <div className='h-screen'>
//       <p className='text-[#F2B461] font-medium m-4'>เพิ่มพนักงาน</p>
//       <div className="mt-5 w-1/2 ">
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             ชื่อพนักงาน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="text"
//               name="st_name"
//               id="st_name"
//               value={nameEm}
//               onChange={(e) => setNameEm(e.target.value)}
//               placeholder='ชื่อพนักงาน'
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             ชื่อผู้ใช้งาน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="text"
//               name="st_username"
//               id="st_username"
//               placeholder='ชื่อผู้ใช้งาน'
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>

//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             รหัสผ่าน :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="password"
//               name="st_password"
//               id="st_password"
//               placeholder='รหัสผ่าน'
//               value={userPassw}
//               onChange={(e) => setUserPassw(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             เบอร์โทร :</label>
//           <div className="mt-2 col-span-2">
//             <input
//               type="tel"
//               name="st_tel"
//               id="st_tel"
//               placeholder='เบอร์โทร'
//               value={userTel}
//               onChange={(e) => setUserTel(e.target.value)}
//               className="px-3 focus:outline-none bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm  placeholder:text-[#C5B182]   sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             แผนก :</label>
//           <div className="mt-2 col-span-2 flex">
//             <div className="form-control">
//               <label className="label cursor-pointer ">
//                 <input type="radio" name="st_type" value={userDepart} onChange={() => setUserDepart("1")} checked={userDepart === "1"} className="radio checked:bg-[#C5B182] " />
//                 <span className="label-text text-[#73664B] px-3 ">พนักงานฝ่ายขาย</span>
//               </label>
//             </div>
//             <div className="form-control ml-4">
//               <label className="label cursor-pointer">
//                 <input type="radio" name="st_type" value={userDepart} onChange={() => setUserDepart("2")} checked={userDepart === "2"} className="radio checked:bg-[#C5B182]" />
//                 <span className="label-text text-[#73664B] px-3">พนักงานฝ่ายผลิต</span>
//               </label>
//             </div>
//             {/* <select id="countries"
//               className="bg-[#FFFFDD] block w-full rounded-t-md border border-b-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2">
//               <option>พนักงานฝ่ายขาย</option>
//               <option>พนักงานฝ่ายผลิต</option>
//             </select> */}
//           </div>
//         </div>
//         <div className="grid grid-cols-3 items-center mt-3 ">
//           <label className="block text-sm font-medium leading-6 text-[#73664B]  mt-3 text-right mr-5">
//             วันที่เข้าทำงาน :</label>
//           <Datepicker
//             className={`bg-[#FFFFDD] block w-full rounded-t-md  border-[#C5B182] py-1.5 text-[#C5B182] shadow-sm    sm:text-sm sm:leading-6 pl-2`}
//             useRange={false}
//             asSingle={true}
//             value={value}
//             onChange={handleValueChange}
//             name="st_start"
//           />

//         </div>
      
//       </div>
//       <div className="grid grid-cols-3 items-center mt-3" >
//         <button
//           onClick={handleCancelClick}
//           type="button"
//           className="mx-auto w-1/3 text-white bg-[#C5B182] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
//           ยกเลิก
//         </button>
//         <>
//           {isOpen && (
//             <Transition appear show={isOpen} as={Fragment} className={kanit.className}>
//               <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0"
//                   enterTo="opacity-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100"
//                   leaveTo="opacity-0"
//                 >
//                   <div className="fixed inset-0 bg-black/25" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 overflow-y-auto">
//                   <div className="flex min-h-full items-center justify-center p-4 text-center">

//                     <Transition.Child
//                       as={Fragment}
//                       enter="ease-out duration-300"
//                       enterFrom="opacity-0 scale-95"
//                       enterTo="opacity-100 scale-100"
//                       leave="ease-in duration-200"
//                       leaveFrom="opacity-100 scale-100"
//                       leaveTo="opacity-0 scale-95"
//                     >
//                       <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                         <Dialog.Title
//                           as="h3"
//                           className="text-lg font-medium leading-6 text-[73664B]"
//                         >
//                           ยืนยันการเพิ่มพนักงาน
//                         </Dialog.Title>
//                         <div className="mt-2">
//                           <p className="text-sm text-[#73664B]">
//                             คุณต้องการเพิ่มพนักงานหรือไม่
//                           </p>
//                         </div>
//                         {/*  choose */}
//                         <div className="flex justify-end">
//                           <div className="inline-flex justify-end">
//                             <button
//                               type="button"
//                               className="text-[#73664B] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                               onClick={closeModal}
//                             >
//                               ยกเลิก
//                             </button>

//                             <button
//                               onClick={handleSubmit}
//                               type="button"
//                               className="text-[#C5B182] inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium  hover:bg-[#FFFFDD] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                             >
//                               ยืนยัน
//                             </button>
//                           </div>
//                         </div>
//                       </Dialog.Panel>
//                     </Transition.Child>
//                   </div>
//                 </div>
//               </Dialog>
//             </Transition>

//           )
//           }
//         </>

//         <button onClick={openModal} type="button" className="mx-auto w-1/3 text-white bg-[#73664B] focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">เสร็จสิ้น</button>
//       </div>
//     </div>
//   );
// }

// export default addstaff;