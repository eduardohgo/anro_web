import { prisma } from "@/lib/prisma";

export type SupportedPageKey = "home" | "desarrollo" | "servicios" | "contacto" | "nosotros";

export async function getPageContent<T>(pageKey: SupportedPageKey): Promise<T | null> {
  const row = await prisma.pageContent.findUnique({ where: { pageKey } });
  return (row?.content as T | undefined) ?? null;
}

export async function upsertPageContent<T>(pageKey: SupportedPageKey, content: T): Promise<T> {
  const row = await prisma.pageContent.upsert({
    where: { pageKey },
    update: { content: content as object },
    create: { pageKey, content: content as object },
  });

  return row.content as T;
}
