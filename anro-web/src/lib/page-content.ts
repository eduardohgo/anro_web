// src/lib/page-content.ts
import { neon } from "@neondatabase/serverless";

export type SupportedPageKey = "home" | "desarrollo" | "servicios" | "contacto";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL no está definida en .env");
}
const sql = neon(databaseUrl);

// helper: timeout wrapper para evitar esperar indefinidamente
async function withTimeout<T>(p: Promise<T>, ms = 7000): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);
}

type PageContentRow<T> = { content: T };
type ErrorInfo = { message: string; cause?: unknown };

/**
 * Extrae información útil de un `unknown` error sin usar `any`.
 * - Si es instancia de Error, usa message y posiblemente cause.
 * - Si es un objeto, intenta leer message/cause de forma segura.
 * - Si es primitivo, lo convierte a string.
 */
function extractErrorInfo(err: unknown): ErrorInfo {
  if (err instanceof Error) {
    // err puede tener una propiedad `cause` en algunos runtimes
    const maybeCause = (err as Error & { cause?: unknown }).cause;
    return { message: err.message, cause: maybeCause };
  }

  if (typeof err === "object" && err !== null) {
    const obj = err as { message?: unknown; cause?: unknown };
    const message =
      typeof obj.message === "string"
        ? obj.message
        : // intenta serializar el objeto si no tiene message string
          (() => {
            try {
              return JSON.stringify(obj);
            } catch {
              return String(obj);
            }
          })();
    return { message, cause: obj.cause };
  }

  // primitivos (string, number, boolean, symbol, bigint, undefined)
  return { message: String(err) };
}

export async function getPageContent<T>(
  pageKey: SupportedPageKey
): Promise<T | null> {
  try {
    const rows = (await withTimeout(
      sql`
      SELECT "content"
      FROM "PageContent"
      WHERE "pageKey" = ${pageKey}
      LIMIT 1
    `,
      7000 // timeout en ms
    )) as PageContentRow<T>[];

    return rows?.[0]?.content ?? null;
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("getPageContent: no fue posible leer Neon:", info.message);
    if (info.cause) console.error(" causa:", info.cause);
    return null;
  }
}

export async function upsertPageContent<T>(
  pageKey: SupportedPageKey,
  content: T
): Promise<T> {
  try {
    const serializedContent = JSON.stringify(content);

    const rows = (await sql`
      INSERT INTO "PageContent" ("id", "pageKey", "content", "createdAt", "updatedAt")
      VALUES (
        ${crypto.randomUUID()},
        ${pageKey},
        CAST(${serializedContent} AS jsonb),
        NOW(),
        NOW()
      )
      ON CONFLICT ("pageKey")
      DO UPDATE SET
        "content" = EXCLUDED."content",
        "updatedAt" = NOW()
      RETURNING "content"
    `) as PageContentRow<T>[];

    return rows[0].content;
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("upsertPageContent error:", info.message);
    if (info.cause) console.error(" causa:", info.cause);
    throw err;
  }
}