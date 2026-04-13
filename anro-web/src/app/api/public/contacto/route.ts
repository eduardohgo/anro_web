export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/page-content";
import { resolveContactoContent } from "@/lib/public-page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("contacto");
    return NextResponse.json(resolveContactoContent(content ?? {}));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible obtener el contenido público de Contacto.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}