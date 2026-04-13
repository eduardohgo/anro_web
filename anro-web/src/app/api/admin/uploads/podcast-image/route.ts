export const dynamic = "force-dynamic";

import { proxyToBackend } from "@/lib/backend-api";

export async function POST(request: Request) {
  return proxyToBackend(request, "/admin/uploads/podcast-image", { method: "POST" });
}
