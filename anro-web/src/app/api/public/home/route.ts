import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5000";

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/public/home`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : { message: "Respuesta inválida del backend" };

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            payload?.message ||
            "No fue posible obtener el contenido público del home desde backend",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible conectar con el backend",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 502 }
    );
  }
}
