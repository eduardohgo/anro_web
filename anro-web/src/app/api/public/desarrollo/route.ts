export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/page-content";
import { resolveDesarrolloContent } from "@/lib/public-page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("desarrollo");
    return NextResponse.json(resolveDesarrolloContent(content ?? {}));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible obtener el contenido público de Desarrollo.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}