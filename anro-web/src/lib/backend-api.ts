import { NextResponse } from "next/server";

function removeTrailingSlash(value: string) {
  return value.replace(/\/$/, "");
}

function resolveConfiguredBackendApiUrl() {
  const explicitServerUrl =
    process.env.BACKEND_API_URL ||
    process.env.INTERNAL_API_URL ||
    process.env.API_URL;

  if (explicitServerUrl) {
    return removeTrailingSlash(explicitServerUrl);
  }

  const publicUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (publicUrl && !publicUrl.startsWith("/")) {
    return publicUrl;
  }

  return `http://localhost:${process.env.BACKEND_PORT || "5000"}/api`;
}

function resolveBackendApiUrl(requestUrl: string) {
  const configured = resolveConfiguredBackendApiUrl();

  try {
    const request = new URL(requestUrl);
    const target = new URL(configured);

    const isSameOrigin = request.origin === target.origin;
    const targetsNextApi = target.pathname === "/api" || target.pathname.startsWith("/api/");

    if (isSameOrigin && targetsNextApi) {
      const internalOverride = process.env.BACKEND_INTERNAL_API_URL;
      if (internalOverride) {
        return removeTrailingSlash(internalOverride);
      }

      const fallback = new URL(requestUrl);
      fallback.port = process.env.BACKEND_PORT || "5000";
      fallback.pathname = "/api";
      fallback.search = "";
      fallback.hash = "";
      return removeTrailingSlash(fallback.toString());
    }
  } catch {
    return configured;
  }

  return configured;
}

type ProxyOptions = {
  method?: string;
};

export async function proxyToBackend(
  request: Request,
  path: string,
  options: ProxyOptions = {}
) {
  const backendApiUrl = resolveBackendApiUrl(request.url);
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");

  if (contentType) headers.set("content-type", contentType);
  if (authorization) headers.set("authorization", authorization);

  const method = options.method || request.method;
  const canHaveBody = method !== "GET" && method !== "HEAD";
  const rawBody = canHaveBody ? await request.arrayBuffer() : null;
  const body = rawBody && rawBody.byteLength > 0 ? rawBody : undefined;

  const response = await fetch(`${backendApiUrl}${path}`, {
    method,
    headers,
    body,
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
