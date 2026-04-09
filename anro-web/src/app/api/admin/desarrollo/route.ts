import { NextResponse } from "next/server";
import { getPageContent, upsertPageContent } from "@/lib/page-content";

const PAGE_KEY = "desarrollo" as const;

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);

    if (!content) {
      return NextResponse.json({ message: "No hay contenido guardado para Desarrollo." }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible cargar Desarrollo.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const saved = await upsertPageContent(PAGE_KEY, payload);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible guardar Desarrollo.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
