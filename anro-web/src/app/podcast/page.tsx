"use client";

import { podcastPublicApi } from "@/lib/api";
import { formatPodcastDate } from "@/lib/podcast";
import { PodcastEpisode } from "@/lib/types";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  LoaderCircle,
  Mic2,
  Play,
  PlayCircle,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function buildEpisodeHref(externalUrl: string | null, embedUrl: string | null) {
  return externalUrl || embedUrl || "#episodios";
}

function extractYouTubeId(value: string | null | undefined) {
  if (!value) return null;

  const raw = value.trim();
  if (!raw) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const parsed = new URL(raw);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.includes("/embed/")) {
        const parts = parsed.pathname.split("/embed/");
        const id = parts[1]?.split(/[?&/]/)[0];
        return id || null;
      }

      const id = parsed.searchParams.get("v");
      return id || null;
    }

    if (parsed.hostname.includes("img.youtube.com")) {
      const parts = parsed.pathname.split("/");
      const viIndex = parts.findIndex((part) => part === "vi");
      if (viIndex !== -1 && parts[viIndex + 1]) {
        return parts[viIndex + 1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

function extractTikTokId(value: string | null | undefined) {
  if (!value) return null;

  const raw = value.trim();
  if (!raw) return null;

  const directIdMatch = raw.match(/^\d{8,25}$/);
  if (directIdMatch) return directIdMatch[0];

  try {
    const parsed = new URL(raw);
    const match = parsed.pathname.match(/\/video\/(\d{8,25})/);
    if (match?.[1]) return match[1];

    if (parsed.pathname.includes("/embed/v2/")) {
      const embedMatch = parsed.pathname.match(/\/embed\/v2\/(\d{8,25})/);
      if (embedMatch?.[1]) return embedMatch[1];
    }

    if (parsed.pathname.includes("/player/v1/")) {
      const playerMatch = parsed.pathname.match(/\/player\/v1\/(\d{8,25})/);
      if (playerMatch?.[1]) return playerMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

function buildTikTokEmbedUrl(episode: PodcastEpisode) {
  if (episode.embedUrl?.trim()) return episode.embedUrl.trim();

  const id = extractTikTokId(episode.externalUrl);
  if (!id) return null;

  return `https://www.tiktok.com/player/v1/${id}`;
}

function buildYouTubeEmbedUrl(episode: PodcastEpisode) {
  const fromEmbed = normalizeEmbedUrl(episode.embedUrl, episode.externalUrl);
  if (fromEmbed) return fromEmbed;

  const id =
    extractYouTubeId(episode.embedUrl) ||
    extractYouTubeId(episode.externalUrl) ||
    extractYouTubeId(episode.thumbnailUrl);

  return id ? `https://www.youtube.com/embed/${id}` : null;
}

function buildYouTubeThumbnailUrl(episode: PodcastEpisode) {
  if (episode.thumbnailUrl?.trim()) return episode.thumbnailUrl.trim();

  const id =
    extractYouTubeId(episode.embedUrl) ||
    extractYouTubeId(episode.externalUrl) ||
    extractYouTubeId(episode.thumbnailUrl);

  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function normalizeEmbedUrl(embedUrl: string | null, externalUrl: string | null) {
  const raw = embedUrl || externalUrl;
  if (!raw) return null;

  const clean = raw.trim();
  if (!clean) return null;

  if (clean.includes("youtube.com/embed/")) return clean;
  if (clean.includes("tiktok.com/embed")) return clean;

  try {
    const parsed = new URL(clean);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    return clean;
  } catch {
    return null;
  }
}

function getEpisodeEmbedUrl(episode: PodcastEpisode) {
  if (episode.platform === "YOUTUBE") {
    return buildYouTubeEmbedUrl(episode);
  }

  if (episode.platform === "TIKTOK") {
    return buildTikTokEmbedUrl(episode);
  }

  return normalizeEmbedUrl(episode.embedUrl, episode.externalUrl);
}

function getEpisodeThumbnailUrl(episode: PodcastEpisode) {
  if (episode.platform === "YOUTUBE") {
    return buildYouTubeThumbnailUrl(episode);
  }

  return episode.thumbnailUrl?.trim() || null;
}

function getEpisodeSeason(episode: PodcastEpisode) {
  const possibleSeason =
    (episode as PodcastEpisode & { season?: number | string }).season ??
    (episode as PodcastEpisode & { temporada?: number | string }).temporada;

  if (
    possibleSeason !== undefined &&
    possibleSeason !== null &&
    `${possibleSeason}`.trim()
  ) {
    return `${possibleSeason}`.trim();
  }

  const title = episode.title || "";
  const shortDescription = episode.shortDescription || "";
  const fullDescription = episode.fullDescription || "";
  const combined = `${title} ${shortDescription} ${fullDescription}`;

  const match =
    combined.match(/temporada\s*(\d+)/i) ||
    combined.match(/\bseason\s*(\d+)/i) ||
    combined.match(/\bT\s*(\d+)\b/i);

  return match?.[1] || null;
}

function hasEpisodeGuests(episode: PodcastEpisode) {
  const guestsValue = (episode.guests || "").trim().toLowerCase();

  if (!guestsValue) return false;

  const emptyLabels = [
    "sin invitados",
    "ninguno",
    "ninguna",
    "no",
    "n/a",
    "na",
    "por definir",
  ];

  return !emptyLabels.includes(guestsValue);
}

function EpisodeMedia({
  episode,
  onOpen,
  aspectClass = "aspect-[16/9]",
}: {
  episode: PodcastEpisode;
  onOpen: (episode: PodcastEpisode) => void;
  aspectClass?: string;
}) {
  const thumbnailUrl = getEpisodeThumbnailUrl(episode);

  return (
    <button
      type="button"
      onClick={() => onOpen(episode)}
      className="group relative block w-full overflow-hidden rounded-[28px] border border-[#DDD3C2] bg-[#E9E2D5] text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
    >
      <div className={`relative w-full overflow-hidden bg-black ${aspectClass}`}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={episode.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#8B6A45]">
            <div className="flex flex-col items-center gap-3">
              <PlayCircle className="h-12 w-12" />
              <span className="text-sm font-medium">Vista previa no disponible</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.52)_100%)]" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#16233A]">
            {episode.platform}
          </span>

          {episode.isFeatured && (
            <span className="rounded-full bg-[#C79A2C] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#101522]">
              Destacado
            </span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/18 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-white/24">
            <Play className="ml-1 h-8 w-8 fill-white text-white" />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="max-w-[70%]">
            <p className="line-clamp-2 text-lg font-semibold leading-tight text-white md:text-[22px]">
              {episode.title}
            </p>
          </div>

          <span className="rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            Ver episodio
          </span>
        </div>
      </div>
    </button>
  );
}

function VideoModal({
  episode,
  onClose,
}: {
  episode: PodcastEpisode | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!episode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [episode, onClose]);

  if (!episode) return null;

  const embedUrl = getEpisodeEmbedUrl(episode);
  const thumbnailUrl = getEpisodeThumbnailUrl(episode);
  const isTikTok = episode.platform === "TIKTOK";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(7,10,18,0.72)] px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full overflow-hidden rounded-[30px] border border-[#D9CFBF] bg-[linear-gradient(180deg,#FFFCF7_0%,#F7F1E7_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.28)] ${
          isTikTok ? "max-w-[820px]" : "max-w-[1180px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#16233A] shadow-md transition hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-5 md:p-7">
          <div className="mb-5 pr-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#16233A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                {episode.platform}
              </span>

              {episode.isFeatured && (
                <span className="rounded-full bg-[#E8D19A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5814]">
                  Destacado
                </span>
              )}
            </div>

            <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#16233A] md:text-[34px]">
              {episode.title}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5448] md:text-[15px]">
              {episode.fullDescription ||
                episode.shortDescription ||
                "Contenido sin descripción disponible."}
            </p>
          </div>

          {isTikTok ? (
            <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
              <div className="overflow-hidden rounded-[26px] border border-[#DDD3C2] bg-black shadow-sm">
                {embedUrl ? (
                  <iframe
                    src={
                      embedUrl.includes("?")
                        ? `${embedUrl}&autoplay=1`
                        : `${embedUrl}?autoplay=1`
                    }
                    title={episode.title}
                    className="h-full min-h-[520px] w-full"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={episode.title}
                    className="h-full min-h-[260px] w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center text-[#67584B]">
                    Vista previa no disponible
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between rounded-[26px] border border-[#E3DDD2] bg-white p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B6862A]">
                    TikTok
                  </p>
                  <h4 className="mt-3 text-2xl font-semibold text-[#16233A]">
                    Ver episodio en su plataforma original
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-[#67584B]">
                    Para mantener una experiencia visual más limpia dentro del sitio, los episodios
                    de TikTok se muestran aquí con su portada y detalles, y se abren directamente
                    en TikTok al momento de reproducirse.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <InfoBox label="Duración" value={episode.duration || "Por definir"} />
                    <InfoBox label="Invitados" value={episode.guests || "Sin invitados"} />
                    <InfoBox
                      label="Publicación"
                      value={formatPodcastDate(episode.publishedAt || episode.createdAt)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  {episode.externalUrl || embedUrl ? (
                    <Link
                      href={episode.externalUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16233A] px-6 py-3 text-sm font-semibold text-[#F7F3EC] transition hover:bg-[#1D2F4D]"
                    >
                      Ver en TikTok
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-[#D8D2C6] bg-[#F9F5EE] px-5 py-3 text-sm font-medium text-[#67584B]">
                      Enlace externo no disponible
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : embedUrl ? (
            <>
              <div className="overflow-hidden rounded-[26px] border border-[#DDD3C2] bg-black shadow-sm">
                <div className="aspect-video w-full">
                  <iframe
                    src={
                      embedUrl.includes("?")
                        ? `${embedUrl}&autoplay=1`
                        : `${embedUrl}?autoplay=1`
                    }
                    title={episode.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <InfoBox label="Duración" value={episode.duration || "Por definir"} />
                <InfoBox label="Invitados" value={episode.guests || "Sin invitados"} />
                <InfoBox
                  label="Publicación"
                  value={formatPodcastDate(episode.publishedAt || episode.createdAt)}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {episode.externalUrl && (
                  <Link
                    href={episode.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16233A] px-6 py-3 text-sm font-semibold text-[#F7F3EC] transition hover:bg-[#1D2F4D]"
                  >
                    Ver en plataforma
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-[26px] border border-dashed border-[#D8CCB7] bg-white/70 text-center text-[#67584B]">
              Este episodio aún no cuenta con reproducción integrada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const [platformFilter, setPlatformFilter] = useState<"ALL" | "YOUTUBE" | "TIKTOK" | "OTHER">(
    "ALL"
  );
  const [sortFilter, setSortFilter] = useState<"RECENT" | "OLDEST">("RECENT");
  const [seasonFilter, setSeasonFilter] = useState<string>("ALL");
  const [guestFilter, setGuestFilter] = useState<
    "ALL" | "WITH_GUESTS" | "WITHOUT_GUESTS"
  >("ALL");

  useEffect(() => {
    let isMounted = true;

    podcastPublicApi
      .list()
      .then((response) => {
        if (!isMounted) return;
        setEpisodes(response);
      })
      .catch((error) => {
        if (!isMounted) return;
        setLoadError(
          error instanceof Error ? error.message : "No fue posible cargar el podcast."
        );
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const publishedEpisodes = useMemo(() => {
    return episodes.filter((episode) => episode.status === "PUBLISHED");
  }, [episodes]);

  const featuredEpisodes = useMemo(() => {
    return [...publishedEpisodes]
      .filter((episode) => episode.isFeatured)
      .sort((a, b) => {
        const orderDiff = Number(a.displayOrder ?? 9999) - Number(b.displayOrder ?? 9999);
        if (orderDiff !== 0) return orderDiff;

        const aDate = new Date(a.publishedAt || a.createdAt).getTime();
        const bDate = new Date(b.publishedAt || b.createdAt).getTime();
        return bDate - aDate;
      })
      .slice(0, 2);
  }, [publishedEpisodes]);

  const mainFeatured = featuredEpisodes[0] ?? null;
  const secondaryFeatured = featuredEpisodes[1] ?? null;

  const availableSeasons = useMemo(() => {
    const seasons = Array.from(
      new Set(
        publishedEpisodes
          .map((episode) => getEpisodeSeason(episode))
          .filter((value): value is string => Boolean(value))
      )
    );

    return seasons.sort((a, b) => Number(a) - Number(b));
  }, [publishedEpisodes]);

  const filteredPublishedEpisodes = useMemo(() => {
    return [...publishedEpisodes]
      .filter((episode) => {
        const matchesPlatform =
          platformFilter === "ALL" || episode.platform === platformFilter;

        const episodeSeason = getEpisodeSeason(episode);
        const matchesSeason = seasonFilter === "ALL" || episodeSeason === seasonFilter;

        const hasGuests = hasEpisodeGuests(episode);
        const matchesGuests =
          guestFilter === "ALL" ||
          (guestFilter === "WITH_GUESTS" && hasGuests) ||
          (guestFilter === "WITHOUT_GUESTS" && !hasGuests);

        return matchesPlatform && matchesSeason && matchesGuests;
      })
      .sort((a, b) => {
        const aDate = new Date(a.publishedAt || a.createdAt).getTime();
        const bDate = new Date(b.publishedAt || b.createdAt).getTime();

        if (sortFilter === "OLDEST") return aDate - bDate;
        return bDate - aDate;
      });
  }, [publishedEpisodes, platformFilter, seasonFilter, guestFilter, sortFilter]);

  return (
    <>
      <main className="bg-[linear-gradient(180deg,#F7F4EE_0%,#F2EEE7_55%,#EFE9DE_100%)]">
        <section className="relative overflow-hidden px-4 pb-14 pt-16 md:px-6 md:pb-18 md:pt-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,238,1)_0%,rgba(241,236,228,0.88)_60%,rgba(247,244,238,1)_100%)]" />
            <div className="absolute left-[-70px] top-4 h-72 w-72 rounded-full bg-[#D7B36A]/15 blur-3xl" />
            <div className="absolute right-[-40px] top-24 h-80 w-80 rounded-full bg-[#102345]/12 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#C8B08A]/18 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-[1780px]">
            <div className="grid gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
              <div className="max-w-[720px] pt-2">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8CFBF] bg-white/70 px-5 py-2 shadow-sm backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#C79A2C]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A45]">
                    Podcast ANRO
                  </span>
                </div>

                <h1 className="max-w-[680px] text-4xl leading-[0.97] text-[#16233A] sm:text-5xl md:text-6xl lg:text-[74px] xl:text-[80px]">
                  Ideas, visión y conversaciones que
                  <span className="mt-2 block text-[#C79A2C]">construyen valor</span>
                </h1>

                <div className="mt-7 h-[2px] w-24 rounded-full bg-[#C7A25A]" />

                <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#5C5145] md:text-[17px]">
                  Un espacio de ANRO para compartir perspectivas, experiencias, entrevistas y
                  temas clave sobre desarrollo, construcción, inversión y visión empresarial.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="#episodios"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C79A2C] px-8 py-3.5 text-sm font-semibold text-[#101522] shadow-[0_16px_34px_rgba(199,154,44,0.26)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B6891E]"
                  >
                    Ver episodios
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#destacados"
                    className="inline-flex items-center justify-center rounded-full border border-[#D5CCBF] bg-white/70 px-8 py-3.5 text-sm font-semibold text-[#5D4F43] transition duration-300 hover:bg-white"
                  >
                    Ver destacados
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <InfoMiniCard label="Publicados" value={`${publishedEpisodes.length}`} />
                  <InfoMiniCard label="Destacados visibles" value={`${featuredEpisodes.length}/2`} />
                  <InfoMiniCard label="Experiencia" value="Video en modal" />
                </div>
              </div>

              <div
                id="destacados"
                className="rounded-[36px] border border-[#D9CFBF] bg-[linear-gradient(180deg,#FFFCF7_0%,#F8F2E8_100%)] p-5 shadow-[0_28px_80px_rgba(16,35,69,0.08)] md:p-6 lg:p-7"
              >
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#B6862A]">
                      Selección destacada
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-[#16233A] md:text-[40px]">
                      Hasta 2 episodios principales
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#635648]">
                      Esta área muestra únicamente los dos episodios destacados con mayor prioridad
                      visual. Ahora ambos usan el mismo formato visual y se reproducen en una
                      ventana flotante.
                    </p>
                  </div>

                  <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#16233A] text-[#E7C87C] md:flex">
                    <Mic2 className="h-6 w-6" />
                  </div>
                </div>

                {mainFeatured ? (
                  <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                    <article className="rounded-[30px] border border-[#E4DAC9] bg-white p-4 shadow-[0_18px_50px_rgba(16,35,69,0.06)] md:p-5">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#16233A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                          <Star className="h-3.5 w-3.5 text-[#E7C87C]" />
                          Destacado principal
                        </span>
                        <span className="rounded-full border border-[#E1D8C9] bg-[#FAF6EE] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A45]">
                          Prioridad {mainFeatured.displayOrder ?? 0}
                        </span>
                      </div>

                      <EpisodeMedia
                        episode={mainFeatured}
                        onOpen={setSelectedEpisode}
                        aspectClass="aspect-[16/9]"
                      />

                      <div className="mt-5">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A45]">
                          <span>{mainFeatured.platform}</span>
                          <span>•</span>
                          <span>
                            {formatPodcastDate(mainFeatured.publishedAt || mainFeatured.createdAt)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-[30px] font-semibold leading-tight text-[#16233A] md:text-[38px]">
                          {mainFeatured.title}
                        </h3>

                        <p className="mt-4 text-sm leading-8 text-[#5F5448]">
                          {mainFeatured.fullDescription ||
                            mainFeatured.shortDescription ||
                            "Contenido destacado sin descripción disponible."}
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          <InfoBox label="Duración" value={mainFeatured.duration || "Por definir"} />
                          <InfoBox label="Invitados" value={mainFeatured.guests || "Sin invitados"} />
                          <InfoBox
                            label="Publicación"
                            value={formatPodcastDate(
                              mainFeatured.publishedAt || mainFeatured.createdAt
                            )}
                          />
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedEpisode(mainFeatured)}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16233A] px-7 py-3 text-sm font-semibold text-[#F7F3EC] transition duration-300 hover:bg-[#1D2F4D]"
                          >
                            Reproducir episodio
                            <Play className="h-4 w-4 fill-current" />
                          </button>

                          {mainFeatured.externalUrl && (
                            <Link
                              href={mainFeatured.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8D2C6] bg-[#F9F5EE] px-7 py-3 text-sm font-semibold text-[#67584B] transition duration-300 hover:bg-white"
                            >
                              Ver en plataforma
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>

                    <div className="flex flex-col gap-5">
                      {secondaryFeatured ? (
                        <article className="rounded-[28px] border border-[#E4DAC9] bg-white p-4 shadow-[0_18px_50px_rgba(16,35,69,0.06)]">
                          <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#F4E7C7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B641D]">
                              <Sparkles className="h-3.5 w-3.5" />
                              Destacado secundario
                            </span>
                            <span className="rounded-full border border-[#E1D8C9] bg-[#FAF6EE] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A45]">
                              Prioridad {secondaryFeatured.displayOrder ?? 0}
                            </span>
                          </div>

                          <EpisodeMedia
                            episode={secondaryFeatured}
                            onOpen={setSelectedEpisode}
                            aspectClass="aspect-[16/9]"
                          />

                          <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#16233A]">
                            {secondaryFeatured.title}
                          </h3>

                          <p className="mt-3 text-sm leading-7 text-[#5F5448]">
                            {secondaryFeatured.shortDescription ||
                              secondaryFeatured.fullDescription ||
                              "Contenido sin resumen disponible."}
                          </p>

                          <div className="mt-5 grid gap-3">
                            <InfoBox
                              label="Duración"
                              value={secondaryFeatured.duration || "Por definir"}
                            />
                            <InfoBox
                              label="Invitados"
                              value={secondaryFeatured.guests || "Sin invitados"}
                            />
                          </div>

                          <div className="mt-5">
                            <button
                              type="button"
                              onClick={() => setSelectedEpisode(secondaryFeatured)}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16233A] px-6 py-3 text-sm font-semibold text-[#F7F3EC] transition duration-300 hover:bg-[#1D2F4D]"
                            >
                              Reproducir episodio
                              <Play className="h-4 w-4 fill-current" />
                            </button>
                          </div>
                        </article>
                      ) : (
                        <article className="flex min-h-[320px] flex-col justify-between rounded-[28px] border border-dashed border-[#D9CCB6] bg-[linear-gradient(180deg,#FFF9EF_0%,#F8F2E7_100%)] p-5">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#16233A]/10 text-[#16233A]">
                            <Play className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B6862A]">
                              Segundo espacio destacado
                            </p>
                            <h3 className="mt-3 text-2xl font-semibold text-[#16233A]">
                              Disponible para otro episodio
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-[#635648]">
                              Marca otro episodio como destacado y ajusta su prioridad desde el panel
                              administrativo para que aparezca aquí automáticamente.
                            </p>
                          </div>
                        </article>
                      )}

                      <article className="rounded-[28px] border border-[#D8D2C6] bg-[#16233A] p-5 text-white">
                        <p className="text-[11px] uppercase tracking-[0.30em] text-[#E7C87C]">
                          Conectado al backend
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">
                          Esta ventana consume episodios publicados desde el backend. Los dos
                          destacados visibles se definen por `isFeatured` y por el orden de prioridad.
                        </p>
                      </article>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-dashed border-[#D8CCB7] bg-white/70 px-6 py-12 text-center text-[#67584B]">
                    {isLoading
                      ? "Cargando episodios destacados..."
                      : "Aún no hay episodios destacados publicados."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="episodios" className="px-4 pb-16 md:px-6 md:pb-20">
          <div className="mx-auto max-w-[1780px] rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.06)] md:p-8 lg:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#B6862A]">
                  Biblioteca pública
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#16233A]">
                  Todos los episodios publicados
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#67584B]">
                  Aquí aparecen todos los episodios publicados. Puedes filtrarlos por plataforma,
                  temporada, invitados y orden de publicación.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E3DDD2] bg-[#F7F4EE] px-4 py-3 text-sm text-[#67584B]">
                {isLoading
                  ? "Cargando episodios..."
                  : `${filteredPublishedEpisodes.length} episodio${
                      filteredPublishedEpisodes.length === 1 ? "" : "s"
                    } en listado`}
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-[#E7DFD2] bg-[#F9F6F0] p-4 md:p-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5B4E43]">
                    Ordenar por
                  </span>
                  <select
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value as "RECENT" | "OLDEST")}
                    className="w-full rounded-[18px] border border-[#DED5C8] bg-white px-4 py-3.5 text-sm text-[#221B18] outline-none transition focus:border-[#C79A2C] focus:ring-4 focus:ring-[rgba(199,154,44,0.12)]"
                  >
                    <option value="RECENT">Más recientes</option>
                    <option value="OLDEST">Más antiguos</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5B4E43]">
                    Temporada
                  </span>
                  <select
                    value={seasonFilter}
                    onChange={(e) => setSeasonFilter(e.target.value)}
                    className="w-full rounded-[18px] border border-[#DED5C8] bg-white px-4 py-3.5 text-sm text-[#221B18] outline-none transition focus:border-[#C79A2C] focus:ring-4 focus:ring-[rgba(199,154,44,0.12)]"
                  >
                    <option value="ALL">Todas</option>
                    {availableSeasons.map((season) => (
                      <option key={season} value={season}>
                        Temporada {season}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5B4E43]">
                    Invitados
                  </span>
                  <select
                    value={guestFilter}
                    onChange={(e) =>
                      setGuestFilter(
                        e.target.value as "ALL" | "WITH_GUESTS" | "WITHOUT_GUESTS"
                      )
                    }
                    className="w-full rounded-[18px] border border-[#DED5C8] bg-white px-4 py-3.5 text-sm text-[#221B18] outline-none transition focus:border-[#C79A2C] focus:ring-4 focus:ring-[rgba(199,154,44,0.12)]"
                  >
                    <option value="ALL">Todos</option>
                    <option value="WITH_GUESTS">Con invitados</option>
                    <option value="WITHOUT_GUESTS">Sin invitados</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5B4E43]">
                    Plataforma
                  </span>
                  <select
                    value={platformFilter}
                    onChange={(e) =>
                      setPlatformFilter(
                        e.target.value as "ALL" | "YOUTUBE" | "TIKTOK" | "OTHER"
                      )
                    }
                    className="w-full rounded-[18px] border border-[#DED5C8] bg-white px-4 py-3.5 text-sm text-[#221B18] outline-none transition focus:border-[#C79A2C] focus:ring-4 focus:ring-[rgba(199,154,44,0.12)]"
                  >
                    <option value="ALL">Todas</option>
                    <option value="YOUTUBE">YouTube</option>
                    <option value="TIKTOK">TikTok</option>
                    <option value="OTHER">Otra</option>
                  </select>
                </label>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-8 flex min-h-52 flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-[#D8D2C6] bg-[#F7F4EE] px-6 py-10 text-center text-[#67584B]">
                <LoaderCircle className="h-8 w-8 animate-spin text-[#8B6A45]" />
                <p>Cargando episodios publicados...</p>
              </div>
            ) : loadError ? (
              <div className="mt-8 rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                {loadError}
              </div>
            ) : filteredPublishedEpisodes.length === 0 ? (
              <div className="mt-8 rounded-[24px] border border-dashed border-[#D8D2C6] bg-[#F7F4EE] px-6 py-10 text-center text-[#67584B]">
                No hay episodios que coincidan con los filtros.
              </div>
            ) : (
              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                {filteredPublishedEpisodes.map((episode) => {
                  const href = buildEpisodeHref(episode.externalUrl, episode.embedUrl);

                  return (
                    <article
                      key={episode.id}
                      className="flex h-full flex-col rounded-[30px] border border-[#E3DDD2] bg-[#F7F4EE] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.08)]"
                    >
                      <EpisodeMedia
                        episode={episode}
                        onOpen={setSelectedEpisode}
                        aspectClass="aspect-[16/9]"
                      />

                      <div className="mt-5 flex flex-1 flex-col">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A45]">
                          <span>{episode.platform}</span>
                          <span>•</span>
                          <span>
                            {formatPodcastDate(episode.publishedAt || episode.createdAt)}
                          </span>
                          {episode.isFeatured && (
                            <>
                              <span>•</span>
                              <span>Destacado</span>
                            </>
                          )}
                        </div>

                        <h3 className="mt-4 text-[30px] font-semibold leading-tight text-[#16233A]">
                          {episode.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-[#67584B]">
                          {episode.shortDescription ||
                            episode.fullDescription ||
                            "Contenido sin resumen disponible."}
                        </p>

                        <div className="mt-5 grid gap-3 text-sm text-[#67584B] sm:grid-cols-2">
                          <div className="rounded-[18px] border border-[#E3DDD2] bg-white px-4 py-3">
                            <span className="block text-[11px] uppercase tracking-[0.22em] text-[#9A7647]">
                              Duración
                            </span>
                            <span className="mt-2 block font-medium text-[#221B18]">
                              {episode.duration || "Por definir"}
                            </span>
                          </div>

                          <div className="rounded-[18px] border border-[#E3DDD2] bg-white px-4 py-3">
                            <span className="block text-[11px] uppercase tracking-[0.22em] text-[#9A7647]">
                              Invitados
                            </span>
                            <span className="mt-2 block font-medium text-[#221B18]">
                              {episode.guests || "Sin invitados"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedEpisode(episode)}
                            className="inline-flex items-center gap-2 rounded-full bg-[#16233A] px-5 py-3 text-sm font-semibold text-[#F7F3EC] transition hover:bg-[#1D2F4D]"
                          >
                            Reproducir
                            <Play className="h-4 w-4 fill-current" />
                          </button>

                          {episode.externalUrl ? (
                            <Link
                              href={episode.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#F9F5EE] px-5 py-3 text-sm font-semibold text-[#67584B] transition hover:bg-white"
                            >
                              Ver en plataforma
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          ) : href !== "#episodios" ? (
                            <Link
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#F9F5EE] px-5 py-3 text-sm font-semibold text-[#67584B] transition hover:bg-white"
                            >
                              Abrir contenido
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-[#D8D2C6] px-5 py-3 text-sm font-medium text-[#67584B]">
                              Enlace pendiente
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <VideoModal episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />
    </>
  );
}

function InfoMiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[#DDD3C3] bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B6862A]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[#16233A]">{value}</p>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-[#E3DDD2] bg-[#FAF7F1] p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">{label}</p>
      <p className="mt-2 text-base font-semibold text-[#16233A]">{value}</p>
    </div>
  );
}