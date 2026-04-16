import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PodcastEpisodeModel } from "@/models/PodcastEpisode";

export async function GET() {
  try {
    await connectToDatabase();
    const episodes = await PodcastEpisodeModel.find({ status: "published" })
      .sort({ featured: -1, displayOrder: 1, publishedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      episodes.map((episode) => ({
        ...episode,
        id: String(episode._id),
        isFeatured: Boolean(episode.featured),
        shortDescription: episode.description,
        fullDescription: episode.description,
        status: "PUBLISHED",
        platform: String(episode.platform).toUpperCase(),
      }))
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { message: "No fue posible obtener episodios públicos.", details: message },
      { status: 500 }
    );
  }
}
