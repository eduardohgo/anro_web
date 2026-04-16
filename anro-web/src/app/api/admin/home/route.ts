import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_CONTENT,
  enforceHomeFixedText,
} from "@/lib/home-content";

export async function GET() {
  return NextResponse.json(enforceHomeFixedText(DEFAULT_HOME_CONTENT));
}

export async function PUT() {
  return NextResponse.json(
    { message: "La edición de Home vía panel quedó deshabilitada. Usa contenido estático del proyecto." },
    { status: 405 }
  );
}
