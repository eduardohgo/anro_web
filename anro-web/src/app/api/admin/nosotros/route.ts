import { NextResponse } from "next/server";
import { DEFAULT_NOSOTROS_CONTENT, resolveNosotrosContent } from "@/lib/nosotros-content";
import { getPageContent, upsertPageContent } from "@/lib/page-content";

const PAGE_KEY = "nosotros" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);
    return NextResponse.json(resolveNosotrosContent(content ?? DEFAULT_NOSOTROS_CONTENT));
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible cargar Nosotros.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = resolveNosotrosContent(payload);
    const saved = await upsertPageContent(PAGE_KEY, normalized);
    return NextResponse.json(resolveNosotrosContent(saved));
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible guardar Nosotros.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
