export const dynamic = "force-dynamic";

import { proxyToBackend } from "@/lib/backend-api";

export async function GET(request: Request) {
  return proxyToBackend(request, "/admin/podcast", { method: "GET" });
}

export async function POST(request: Request) {
  return proxyToBackend(request, "/admin/podcast", { method: "POST" });
}
