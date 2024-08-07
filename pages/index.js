
import { Inter } from 'next/font/google'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import LoginPage from './LoginPage';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard')
  }, [])

}
