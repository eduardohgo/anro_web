import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { setAdminAuthCookie, signAdminToken } from "@/lib/server-auth";
import { AdminUser } from "@/models/AdminUser";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos." }, { status: 400 });
    }

    await connectToDatabase();

    const admin = await AdminUser.findOne({ email }).lean<{ _id: unknown; email: string; role: "admin"; isActive: boolean; passwordHash: string; name?: string; createdAt?: Date; updatedAt?: Date; } | null>();

    if (!admin || !admin.passwordHash) {
      return NextResponse.json({ message: "Credenciales inválidas." }, { status: 401 });
    }

    if (!admin.isActive) {
      return NextResponse.json({ message: "Este usuario administrador está inactivo." }, { status: 403 });
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Credenciales inválidas." }, { status: 401 });
    }

    const token = signAdminToken({
      sub: String(admin._id),
      email: admin.email,
      role: "admin",
    });

    await setAdminAuthCookie(token);

    return NextResponse.json({
      token,
      admin: {
        id: String(admin._id),
        email: admin.email,
        name: admin.name ?? "",
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt?.toISOString(),
        updatedAt: admin.updatedAt?.toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible iniciar sesión.", details: message }, { status: 500 });
  }
}
