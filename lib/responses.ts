import { NextResponse } from "next/server";

export function successResponse(data: any, message?: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function errorResponse(error: string, details?: any, status = 500) {
  return NextResponse.json(
    {
      success: false,
      error,
      details,
    },
    { status },
  );
}

export function validationErrorResponse(errors: any[]) {
  return NextResponse.json(
    {
      success: false,
      error: "Validation error",
      details: errors,
    },
    { status: 400 },
  );
}

export function notFoundResponse(resource = "Resource") {
  return NextResponse.json(
    {
      success: false,
      error: `${resource} not found`,
    },
    { status: 404 },
  );
}

export function conflictResponse(message: string) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 409 },
  );
}
