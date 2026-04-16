import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_AUTH_COOKIE = "anro_admin_token";

export type AdminJwtPayload = JwtPayload & {
  sub: string;
  email: string;
  role: "admin";
};

function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET no está definido en variables de entorno.");
  }
  return jwtSecret;
}

export function signAdminToken(payload: Omit<AdminJwtPayload, "iat" | "exp">) {
  return jwt.sign(payload, getJwtSecret());
}

export function verifyAdminToken(token: string): AdminJwtPayload {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded !== "object" || !decoded.sub || !decoded.email || decoded.role !== "admin") {
    throw new Error("Token inválido.");
  }

  return decoded as AdminJwtPayload;
}

export function getAuthTokenFromRequest(request: NextRequest) {
  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice(7).trim();
  }

  return request.cookies.get(ADMIN_AUTH_COOKIE)?.value ?? null;
}

export async function setAdminAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_AUTH_COOKIE);
}
