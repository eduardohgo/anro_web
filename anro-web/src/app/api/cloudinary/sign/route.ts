import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { message: "Credenciales de Cloudinary incompletas en variables de entorno." },
        { status: 500 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      folder?: string;
      timestamp?: number;
    };

    const timestamp = body.timestamp || Math.floor(Date.now() / 1000);
    const folder = body.folder || "anro/home";

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      apiSecret
    );

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      apiKey,
      cloudName,
    });
  } catch (error) {
    console.error("POST /api/cloudinary/sign error", error);
    return NextResponse.json(
      { message: "No fue posible generar la firma de Cloudinary." },
      { status: 500 }
    );
  }
}
