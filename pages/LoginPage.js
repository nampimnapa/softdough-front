import React, { Fragment, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, image, Input, RadioGroup, Radio, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
// import imgHome from "@/images/img-1.jpg";
// import Logo from "@/images/logo-cp.png";
import { Kanit } from "next/font/google";
import { Dialog, Transition } from '@headlessui/react'
import {
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});


const LoginPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();


  const handleLogin = () => {
    // ทำสิ่งที่คุณต้องการเมื่อกดปุ่มเข้าสู่ระบบ
    setLoggedIn(true);


  };


  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    // <Sidebar>
    //   <LoginPage/>
    // </Sidebar>
    <div className={kanit.className}>
      <div className="hero min-h-screen max-w-screen bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse w-full bg-gradient-to-b from-[#0F75BC] to-blue-200 h-full">


          {/* <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">เข้าสู่ระบบ</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div> */}
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  animate-fade animate-once animate-ease-linear'>
            <form className="card-body">
              <div className="form-control">
                <p className='text-center font-bold'>เข้าสู่ระบบ</p>
                <div className='mt-4'>
                  <Input type="text" label="ชื่อผู้ใช้งาน" placeholder="" />
                </div>
                <div className='mt-4'>
                  <Input
                    label="รหัสผ่าน"
                    placeholder=""
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashIcon class="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon class="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                  />
                </div>
                <label className="label">
                  {/* <a href="#" className="label-text-alt link link-hover">ลืมรหัสผ่าน?</a> */}
                </label>
              </div>
              <div className="form-control mt-6">
                <Link href='/admin/check'>
                  <button className="btn btn-info text-white" onClick={handleLogin}>เข้าสู่ระบบ</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  )
};

export default LoginPage