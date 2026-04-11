export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { resolveHomeContent } from "@/lib/home-content";
import { getPageContent } from "@/lib/page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("home");
    if (!content) {
      return NextResponse.json({ message: "No hay contenido público de Home." }, { status: 404 });
    }
    return NextResponse.json(resolveHomeContent(content));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible obtener el contenido público de Home.",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
