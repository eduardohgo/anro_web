export const dynamic = "force-dynamic";

import { proxyToBackend } from "@/lib/backend-api";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/admin/podcast/${id}/status`, { method: "PATCH" });
}
