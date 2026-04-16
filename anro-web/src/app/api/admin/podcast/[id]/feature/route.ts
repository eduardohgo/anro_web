import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getAuthTokenFromRequest, verifyAdminToken } from "@/lib/server-auth";
import { PodcastEpisodeModel } from "@/models/PodcastEpisode";

function isAuthorized(request: NextRequest) {
  const token = getAuthTokenFromRequest(request);
  if (!token) return false;
  try {
    verifyAdminToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  try {
    const { isFeatured } = (await request.json()) as { isFeatured?: boolean };
    const { id } = await context.params;

    await connectToDatabase();
    const episode = await PodcastEpisodeModel.findByIdAndUpdate(
      id,
      { featured: Boolean(isFeatured) },
      { new: true }
    );

    if (!episode) {
      return NextResponse.json({ message: "Episodio no encontrado." }, { status: 404 });
    }

    return NextResponse.json({
      ...episode.toJSON(),
      isFeatured: episode.featured,
      shortDescription: episode.description,
      fullDescription: episode.description,
      status: episode.status.toUpperCase(),
      platform: episode.platform.toUpperCase(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ message: "No fue posible actualizar destacado.", details: message }, { status: 500 });
  }
}
