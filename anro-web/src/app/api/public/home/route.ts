export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_CONTENT,
  resolveHomeContent,
} from "@/lib/home-content";
import { getPageContent } from "@/lib/page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("home");

    if (!content) {
      return NextResponse.json(DEFAULT_HOME_CONTENT);
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