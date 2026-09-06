import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (!res.ok) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('admin_token');
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};