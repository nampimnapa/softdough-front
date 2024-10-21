import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files like .js, .css, and other static resources
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const isLoggedIn = req.cookies.get('isLoggedIn') || false;

  // ถ้าไม่เข้าสู่ระบบและไม่ได้อยู่ที่หน้า login ให้รีไดเรกไปที่ /LoginPage
  if (!isLoggedIn && pathname !== '/LoginPage') {
    const loginUrl = new URL('/LoginPage', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

