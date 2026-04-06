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
    console.error("GET /api/admin/home error", error);
    return NextResponse.json(
      { message: "No fue posible obtener el contenido de Home." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { content?: unknown };
    const content = resolveHomeContent(body?.content);

    const saved = await prisma.pageContent.upsert({
      where: { pageKey: PAGE_KEY },
      create: { pageKey: PAGE_KEY, content },
      update: { content },
    });

    return NextResponse.json({ content: resolveHomeContent(saved.content) });
  } catch (error) {
    console.error("PUT /api/admin/home error", error);
    return NextResponse.json(
      { message: "No fue posible guardar el contenido de Home." },
      { status: 500 }
    );
  }
}
