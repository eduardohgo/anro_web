import { NextResponse } from "next/server";
import {
  DEFAULT_HOME_CONTENT,
  enforceHomeFixedText,
} from "@/lib/home-content";

export const dynamic = "force-static";

export async function GET() {
  const normalized = enforceHomeFixedText(DEFAULT_HOME_CONTENT);
  return NextResponse.json(normalized, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
