export type PodcastStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type PodcastPlatform = "YOUTUBE" | "TIKTOK" | "SPOTIFY" | "OTHER";
export type PodcastContentType = "EPISODE" | "CLIP" | "INTERVIEW" | "SHORT";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  admin: AdminUser;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  contentType: PodcastContentType;
  platform: PodcastPlatform;
  externalUrl: string | null;
  embedUrl: string | null;
  thumbnailUrl: string | null;
  episodeNumber: number | null;
  seasonNumber: number | null;
  duration: string | null;
  guests: string | null;
  publishedAt: string | null;
  status: PodcastStatus;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PodcastEpisodePayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
  contentType: PodcastContentType;
  platform: PodcastPlatform;
  externalUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  episodeNumber: string;
  seasonNumber: string;
  duration: string;
  guests: string;
  publishedAt: string;
  status: PodcastStatus;
  isFeatured: boolean;
  displayOrder: string;
}
