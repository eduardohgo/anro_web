import { API_URL } from "@/lib/api";
import { PodcastEpisode } from "@/lib/types";

export async function getPublishedPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const response = await fetch(`${API_URL}/podcast/episodes`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No fue posible cargar los episodios públicos.");
  }

  return response.json();
}

export function getFeaturedEpisode(episodes: PodcastEpisode[]) {
  return episodes.find((episode) => episode.isFeatured) || episodes[0] || null;
}

export function formatPodcastDate(date: string | null, fallback = "Sin fecha") {
  if (!date) return fallback;
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
  }).format(new Date(date));
}