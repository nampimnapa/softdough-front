import React, { useState, ChangeEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import { Input } from "@nextui-org/react";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const formData = {
        username: username,
        password: password
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // ตรวจสอบว่าใช้ 'include' หรือไม่

      });

      if (!response.ok) {
        throw new Error('ไม่สามารถเข้าสู่ระบบได้');
      }

      // ทำสิ่งที่ต้องการหลังจากเข้าสู่ระบบสำเร็จ
      const data = await response.json();
      console.log(data.message);
      if (data.message.includes('admin')) {
        router.push('/expenses/add');
      } else if (data.message.includes('production')) {
        router.push('/production/dashboard');
      } else if (data.message.includes('order')) {
        router.push('/order/dashboard');
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error.message);
      // จัดการข้อผิดพลาด (เช่น แสดงข้อความผิดพลาดให้ผู้ใช้เห็น)
    }
  };

  return (
    <div className={kanit.className}>
      <div className="hero min-h-screen max-w-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full ">
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  animate-fade animate-once animate-ease-linear'>
            <form className="card-body">
              <div className="form-control">
                <p className='text-center font-bold'>เข้าสู่ระบบ</p>
                <div className='mt-4'>
                  <Input 
                    type="text" 
                    label="ชื่อผู้ใช้งาน" 
                    placeholder="" 
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='mt-4'>
                  <Input
                    label="รหัสผ่าน"
                    placeholder=""
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
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
                <button className="btn btn-info text-white" onClick={handleLogin}>เข้าสู่ระบบ</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;