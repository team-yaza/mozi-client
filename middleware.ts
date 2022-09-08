import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/kakao') && req.cookies.get('token')) {
    return NextResponse.redirect('http://localhost:3000');
  }
}
