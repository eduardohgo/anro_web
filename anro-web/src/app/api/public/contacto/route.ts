import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/page-content";

export async function GET() {
  try {
    const content = await getPageContent<unknown>("contacto");
    if (!content) {
      return NextResponse.json({ message: "No hay contenido público de Contacto." }, { status: 404 });
    }
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { message: "No fue posible obtener el contenido público de Contacto.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
