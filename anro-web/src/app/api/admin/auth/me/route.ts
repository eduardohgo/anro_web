import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getAuthTokenFromRequest, verifyAdminToken } from "@/lib/server-auth";
import { AdminUser } from "@/models/AdminUser";

export async function GET(request: NextRequest) {
  try {
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    }

    const payload = verifyAdminToken(token);

    await connectToDatabase();
    const admin = await AdminUser.findById(payload.sub)
      .select("email name role isActive createdAt updatedAt")
      .lean<{
        _id: unknown;
        email: string;
        name?: string;
        role: "admin";
        isActive: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      } | null>();

    if (!admin || !admin.isActive) {
      return NextResponse.json({ message: "Sesión inválida." }, { status: 401 });
    }

    return NextResponse.json({
      id: String(admin._id),
      email: admin.email,
      name: admin.name ?? "",
      role: admin.role,
      isActive: admin.isActive,
      createdAt: admin.createdAt?.toISOString(),
      updatedAt: admin.updatedAt?.toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible validar la sesión.", details: message }, { status: 401 });
  }
}
