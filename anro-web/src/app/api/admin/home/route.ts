export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_CONTENT,
  resolveHomeContent,
} from "@/lib/home-content";
import { getPageContent, upsertPageContent } from "@/lib/page-content";

const PAGE_KEY = "home" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);

    if (!content) {
      return NextResponse.json(DEFAULT_HOME_CONTENT);
    }

    return NextResponse.json(resolveHomeContent(content));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible cargar Home.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const normalized = resolveHomeContent(payload);
    const saved = await upsertPageContent(PAGE_KEY, normalized);
    return NextResponse.json(resolveHomeContent(saved));
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible guardar Home.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}