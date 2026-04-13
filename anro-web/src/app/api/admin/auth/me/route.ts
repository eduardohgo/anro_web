export const dynamic = "force-dynamic";

import { proxyToBackend } from "@/lib/backend-api";

export async function GET(request: Request) {
  return proxyToBackend(request, "/admin/auth/me", { method: "GET" });
}
