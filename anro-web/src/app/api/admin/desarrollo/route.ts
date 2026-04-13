export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPageContent, upsertPageContent } from "@/lib/page-content";
import { resolveDesarrolloContent } from "@/lib/public-page-content";

const PAGE_KEY = "desarrollo" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);
    return NextResponse.json(resolveDesarrolloContent(content ?? {}));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible cargar Desarrollo.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = resolveDesarrolloContent(payload);
    const saved = await upsertPageContent(PAGE_KEY, normalized);
    return NextResponse.json(resolveDesarrolloContent(saved));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible guardar Desarrollo.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}