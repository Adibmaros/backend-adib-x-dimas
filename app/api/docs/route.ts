import { NextResponse } from "next/server";
import { swaggerSpec } from "@/lib/swagger";

export async function GET() {
  // Middleware akan menangani header secara otomatis
  return NextResponse.json(swaggerSpec);
}
