// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Jika pengguna tidak terautentikasi dan mencoba mengakses halaman selain login, redirect ke login
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = {
  matcher: ["/dashboard", "/"], // Hanya terapkan middleware pada rute tertentu
};
