import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface MediaPayload {
  pageKey?: string;
  sectionKey?: string;
  publicId?: string;
  url?: string;
  secureUrl?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MediaPayload;

    if (!body.pageKey || !body.sectionKey || !body.publicId || !body.url || !body.secureUrl) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios para registrar el asset." },
        { status: 400 }
      );
    }

    const media = await prisma.mediaAsset.create({
      data: {
        pageKey: body.pageKey,
        sectionKey: body.sectionKey,
        publicId: body.publicId,
        url: body.url,
        secureUrl: body.secureUrl,
        format: body.format,
        width: body.width,
        height: body.height,
        bytes: body.bytes,
      },
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/media error", error);
    return NextResponse.json(
      { message: "No fue posible guardar los metadatos de la imagen." },
      { status: 500 }
    );
  }
}
