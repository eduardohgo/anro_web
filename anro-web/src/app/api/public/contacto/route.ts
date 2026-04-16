import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Contenido estático en código para Contacto." });
}
