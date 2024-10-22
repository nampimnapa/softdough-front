import React, { useState, ChangeEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Kanit } from "next/font/google";
import { useRouter } from 'next/router';
import { Input } from "@nextui-org/react";
import Logo from "../../public/images/diff.jpeg";
import Head from 'next/head'

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
      const formData = { username, password };

      console.log('Form data:', formData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'ไม่สามารถเข้าสู่ระบบได้');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (data.st_id) {
        localStorage.setItem('userId', data.st_id.toString());
        console.log('User ID saved in localStorage:', data.st_id);
      } else {
        console.warn('User ID not found in response');
      }

      switch (true) {
        case data.message.includes('admin'):
          console.log(data.message)
          router.push('/dashboard/dashboard');
          break;
        case data.message.includes('production'):
          router.push('/staffpro/addusedind');
          break;
        case data.message.includes('order'):
          router.push('/staffsell/test');
          break;
        default:
          console.warn('Unknown user type');
        // อาจจะ redirect ไปยังหน้า default หรือแสดงข้อความแจ้งเตือน
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error.message);
      // แสดงข้อความผิดพลาดให้ผู้ใช้เห็น (เช่น ใช้ state เพื่อแสดงข้อความใน UI)
    }
  };

  return (
    <div className={kanit.className}>
      <Head>
        <title>Login - Softdough</title>
      </Head>
      <div className="hero min-h-screen max-w-screen bg-base-200 bg-cover bg-center relative" style={{ backgroundImage: `url('/images/diff.jpeg')`, opacity: 0.9 }}>
        <div className="hero-overlay bg-opacity-50"></div>
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
              <button className="btn bg-[#73664B] text-white" onClick={handleLogin}>เข้าสู่ระบบ</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;