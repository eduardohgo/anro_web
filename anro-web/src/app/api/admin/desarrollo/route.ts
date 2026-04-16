import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Desarrollo se administra como contenido estático en código." });
}

export async function PUT() {
  return NextResponse.json(
    { message: "La edición de Desarrollo vía panel quedó deshabilitada." },
    { status: 405 }
  );
}
