export const dynamic = "force-dynamic";

import { proxyToBackend } from "@/lib/backend-api";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/admin/podcast/${id}`, { method: "GET" });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/admin/podcast/${id}`, { method: "PUT" });
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/admin/podcast/${id}`, { method: "DELETE" });
}
