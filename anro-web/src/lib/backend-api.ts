import { NextResponse } from "next/server";

function resolveBackendApiUrl() {
  const explicitServerUrl =
    process.env.BACKEND_API_URL ||
    process.env.INTERNAL_API_URL ||
    process.env.API_URL;

  if (explicitServerUrl) {
    return explicitServerUrl.replace(/\/$/, "");
  }

  const publicUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (publicUrl && !publicUrl.startsWith("/")) {
    return publicUrl;
  }

  return "http://localhost:5000/api";
}

export const BACKEND_API_URL = resolveBackendApiUrl();

type ProxyOptions = {
  method?: string;
};

export async function proxyToBackend(
  request: Request,
  path: string,
  options: ProxyOptions = {}
) {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");

  if (contentType) headers.set("content-type", contentType);
  if (authorization) headers.set("authorization", authorization);

  const method = options.method || request.method;
  const canHaveBody = method !== "GET" && method !== "HEAD";

  const response = await fetch(`${BACKEND_API_URL}${path}`, {
    method,
    headers,
    body: canHaveBody ? request.body : undefined,
    cache: "no-store",
  });

  const text = await response.text();
  const responseContentType = response.headers.get("content-type");

  if (responseContentType?.includes("application/json")) {
    return NextResponse.json(text ? JSON.parse(text) : null, {
      status: response.status,
    });
  }

  return new NextResponse(text, {
    status: response.status,
    headers: responseContentType
      ? {
          "content-type": responseContentType,
        }
      : undefined,
  });
}
