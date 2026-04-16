import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getAuthTokenFromRequest, verifyAdminToken } from "@/lib/server-auth";
import { PodcastEpisodeModel } from "@/models/PodcastEpisode";

type IncomingPayload = {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  description?: string;
  platform?: string;
  externalUrl?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  status?: string;
  isFeatured?: boolean;
  featured?: boolean;
  displayOrder?: string | number;
  publishedAt?: string | null;
};

function ensureAuth(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  if (!token) return false;
  try {
    verifyAdminToken(token);
    return true;
  } catch {
    return false;
  }
}

function normalizePayload(payload: IncomingPayload) {
  const status = (payload.status ?? "draft").toString().toLowerCase();
  const platform = (payload.platform ?? "other").toString().toLowerCase();
  const description = payload.description ?? payload.fullDescription ?? payload.shortDescription ?? "";

  return {
    title: (payload.title ?? "").trim(),
    description: description.trim(),
    platform,
    externalUrl: (payload.externalUrl ?? "").trim(),
    embedUrl: (payload.embedUrl ?? "").trim(),
    thumbnailUrl: (payload.thumbnailUrl ?? "").trim(),
    status: status === "published" ? "published" : "draft",
    featured: payload.featured ?? payload.isFeatured ?? false,
    displayOrder: Number(payload.displayOrder ?? 0),
    publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null,
  };
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = normalizePayload((await request.json()) as IncomingPayload);

    await connectToDatabase();
    const updated = await PodcastEpisodeModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Episodio no encontrado." }, { status: 404 });
    }

    return NextResponse.json({
      ...updated.toJSON(),
      isFeatured: updated.featured,
      shortDescription: updated.description,
      fullDescription: updated.description,
      status: updated.status.toUpperCase(),
      platform: updated.platform.toUpperCase(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible actualizar el episodio.", details: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const deleted = await PodcastEpisodeModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Episodio no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ message: "Episodio eliminado correctamente." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible eliminar el episodio.", details: message }, { status: 500 });
  }
}
