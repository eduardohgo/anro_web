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

function ensureAdmin(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  if (!token) {
    return { ok: false as const, response: NextResponse.json({ message: "No autenticado." }, { status: 401 }) };
  }

  try {
    verifyAdminToken(token);
    return { ok: true as const };
  } catch {
    return { ok: false as const, response: NextResponse.json({ message: "Token inválido." }, { status: 401 }) };
  }
}

export async function GET(request: NextRequest) {
  const auth = ensureAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const episodes = await PodcastEpisodeModel.find({})
      .sort({ displayOrder: 1, publishedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(episodes.map((episode) => ({
      ...episode,
      id: String(episode._id),
      isFeatured: Boolean(episode.featured),
      shortDescription: episode.description,
      fullDescription: episode.description,
      status: String(episode.status).toUpperCase(),
      platform: String(episode.platform).toUpperCase(),
    })));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible listar episodios.", details: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = ensureAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const payload = normalizePayload((await request.json()) as IncomingPayload);

    if (!payload.title || !payload.description || !payload.externalUrl) {
      return NextResponse.json({ message: "title, description y externalUrl son obligatorios." }, { status: 400 });
    }

    await connectToDatabase();
    const created = await PodcastEpisodeModel.create(payload);

    return NextResponse.json({
      ...created.toJSON(),
      isFeatured: created.featured,
      shortDescription: created.description,
      fullDescription: created.description,
      status: created.status.toUpperCase(),
      platform: created.platform.toUpperCase(),
    }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible crear el episodio.", details: message }, { status: 500 });
  }
}
