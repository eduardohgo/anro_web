export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPageContent, upsertPageContent } from "@/lib/page-content";
import { resolveServiciosContent } from "@/lib/public-page-content";

const PAGE_KEY = "servicios" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);
    return NextResponse.json(resolveServiciosContent(content ?? {}));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible cargar Servicios.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = resolveServiciosContent(payload);
    const saved = await upsertPageContent(PAGE_KEY, normalized);
    return NextResponse.json(resolveServiciosContent(saved));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible guardar Servicios.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}