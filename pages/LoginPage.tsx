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
  const [errorMessage, setErrorMessage] = useState<string>('');
const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const makeAPICall = async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    try {
        const response = await fetch(`${baseURL}${endpoint}`, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
      const formData = { username, password };

      console.log('Form data:', formData);

      // เพิ่ม timeout สำหรับ fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
          signal: controller.signal,
          mode: 'cors', // เพิ่ม mode cors
      });

      clearTimeout(timeoutId);

      // ตรวจสอบ cookies จาก response
      const cookies = response.headers.get('set-cookie');
      console.log('Received cookies:', cookies);

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'ไม่สามารถเข้าสู่ระบบได้');
      }

      const data = await response.json();
      console.log('Login response:', data);

      // Set cookie ด้วย js-cookie หรือวิธีอื่น
      document.cookie = `isLoggedIn=true; path=/; secure; samesite=none`;

      if (data.st_id) {
          localStorage.setItem('userId', data.st_id.toString());
          console.log('User ID saved in localStorage:', data.st_id);

          // เพิ่ม session storage สำหรับข้อมูลเพิ่มเติม
          sessionStorage.setItem('userType', data.message);
      } else {
          console.warn('User ID not found in response');
      }

      // ตรวจสอบว่ามี cookie หรือไม่
      const isLoggedInCookie = document.cookie.includes('isLoggedIn=true');
      console.log('Login cookie status:', document.cookie);

      // if (!isLoggedInCookie) {
      //     throw new Error('Failed to set login cookie');
      // }

      // Redirect based on user type
      const userType = data.message?.toLowerCase() || '';
      const redirectMap = {
          admin: '/dashboard/dashboard',
          production: '/staffpro/addusedind',
          order: '/staffsell/test'
      };

      const redirectPath = Object.entries(redirectMap).find(([key]) => 
          userType.includes(key)
      )?.[1];

      if (redirectPath) {
          await router.push(redirectPath);
      } else {
          console.warn('Unknown user type:', userType);
          // แสดง UI error หรือ redirect ไปหน้า default
      }

  } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
      
      if (error.name === 'AbortError') {
          errorMessage = 'การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง';
      } else if (error instanceof TypeError && error.message.includes('network')) {
          errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
      } else if (error.message) {
          errorMessage = error.message;
      }

      // แสดง error message ใน UI (ใช้ state หรือ UI component)
      setErrorMessage(errorMessage); // สมมติว่ามี state สำหรับ error message
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
              <button className="btn bg-[#73664B] text-white" onClick={handleLogin}>{isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;