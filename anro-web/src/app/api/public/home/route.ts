import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_HOME_CONTENT, resolveHomeContent } from "@/lib/home-content";

const PAGE_KEY = "home";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { pageKey: PAGE_KEY },
    });

    const content = pageContent
      ? resolveHomeContent(pageContent.content)
      : structuredClone(DEFAULT_HOME_CONTENT);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("GET /api/public/home error", error);
    return NextResponse.json(
      { message: "No fue posible obtener el Home público." },
      { status: 500 }
    );
  }
}
