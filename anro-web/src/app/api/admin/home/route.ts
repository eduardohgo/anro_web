import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  DEFAULT_HOME_CONTENT,
  enforceHomeFixedText,
  resolveHomeContent,
} from "@/lib/home-content";
import { getPageContent, upsertPageContent } from "@/lib/page-content";

const PAGE_KEY = "home" as const;

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

function getPayloadContent(payload: unknown) {
  if (payload && typeof payload === "object" && "content" in payload) {
    return (payload as { content: unknown }).content;
  }

  return payload;
}

export async function GET() {
  try {
    const content = await getPageContent<unknown>(PAGE_KEY);

    const normalized = enforceHomeFixedText(
      resolveHomeContent(content ?? DEFAULT_HOME_CONTENT)
    );

    return NextResponse.json(normalized, {
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible cargar Home.",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: NO_STORE_HEADERS,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = await request.json();
    const payloadContent = getPayloadContent(payload);

    const normalized = enforceHomeFixedText(
      resolveHomeContent({
        ...resolveHomeContent(payloadContent),
        updatedAt: new Date().toISOString(),
      })
    );

    const saved = await upsertPageContent(PAGE_KEY, normalized);

    const savedContent = enforceHomeFixedText(resolveHomeContent(saved));

    revalidatePath("/");
    revalidatePath("/admin/home");

    return NextResponse.json(savedContent, {
      headers: NO_STORE_HEADERS,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "No fue posible guardar Home.",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: NO_STORE_HEADERS,
      }
    );
  }
}