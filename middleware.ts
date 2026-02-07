import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Dapatkan response asli
  const response = NextResponse.next();

  // 2. Tambahkan header CORS untuk mengizinkan akses dari mana saja ("*")
  response.headers.set("Access-Control-Allow-Origin", "*");

  // Mengizinkan metode HTTP yang umum digunakan
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Mengizinkan header tertentu agar frontend bisa mengirim JSON atau token auth
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  // 3. Tangani "Preflight Request" (Metode OPTIONS)
  // Browser secara otomatis mengirimkan OPTIONS sebelum POST/PUT/DELETE
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

// 4. Konfigurasi Matcher
// Ini memastikan middleware hanya berjalan untuk path API saja
export const config = {
  matcher: "/api/:path*",
};
