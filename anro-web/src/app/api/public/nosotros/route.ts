export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { resolveNosotrosContent } from "@/lib/nosotros-content";
import { getPageContent } from "@/lib/page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("nosotros");
    if (!content) {
      return NextResponse.json({ message: "No hay contenido público de Nosotros." }, { status: 404 });
    }
    return NextResponse.json(resolveNosotrosContent(content));
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible obtener el contenido público de Nosotros.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
