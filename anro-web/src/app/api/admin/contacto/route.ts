export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPageContent, upsertPageContent } from "@/lib/page-content";
import { resolveContactoContent } from "@/lib/public-page-content";

const PAGE_KEY = "contacto" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);
    return NextResponse.json(resolveContactoContent(content ?? {}));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible cargar Contacto.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = resolveContactoContent(payload);
    const saved = await upsertPageContent(PAGE_KEY, normalized);
    return NextResponse.json(resolveContactoContent(saved));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible guardar Contacto.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}