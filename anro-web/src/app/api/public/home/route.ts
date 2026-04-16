import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_CONTENT,
  enforceHomeFixedText,
  resolveHomeContent,
} from "@/lib/home-content";
import { getPageContent } from "@/lib/page-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET() {
  try {
    const content = await getPageContent<unknown>("home");

    const normalized = enforceHomeFixedText(
      resolveHomeContent(content ?? DEFAULT_HOME_CONTENT)
    );

    return NextResponse.json(normalized, {
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible obtener el contenido público de Home.",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      {
        status: 500,
        headers: NO_STORE_HEADERS,
      }
    );
  }
}