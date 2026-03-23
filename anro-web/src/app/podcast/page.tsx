"use client";

import { podcastPublicApi } from "@/lib/api";
import { formatPodcastDate, getFeaturedEpisode } from "@/lib/podcast";
import { PodcastEpisode } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, ExternalLink, LoaderCircle, Mic2, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function buildEpisodeHref(externalUrl: string | null, embedUrl: string | null) {
  return externalUrl || embedUrl || "#episodios";
}

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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
        setLoadError(error instanceof Error ? error.message : "No fue posible cargar el podcast.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredEpisode = useMemo(() => getFeaturedEpisode(episodes), [episodes]);

  return (
    <main className="bg-[#F2F1EC]">
      <section className="relative overflow-hidden px-4 pb-12 pt-16 md:px-6 md:pb-16 md:pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#F2F1EC_0%,#EEECE6_55%,#F2F1EC_100%)]" />
          <div className="absolute left-[-80px] top-10 h-80 w-80 rounded-full bg-[#D9D3C7]/18 blur-3xl" />
          <div className="absolute bottom-0 right-[-60px] h-80 w-80 rounded-full bg-[#E4DED3]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1680px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-10">
            <div className="max-w-[700px] pt-2 md:pt-4">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#FAF8F4] px-5 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B78B4E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A45]">Podcast ANRO</span>
              </div>

              <h1 className="max-w-[650px] text-4xl leading-[0.98] text-[#4B392D] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px]">
                Ideas, visión y conversaciones que
                <span className="mt-2 block text-[#B78B4E]">construyen valor</span>
              </h1>

              <div className="mt-7 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

              <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#67584B] md:text-[17px]">
                Un espacio de ANRO para compartir perspectivas, experiencias, entrevistas y temas clave sobre desarrollo,
                construcción, inversión y visión empresarial.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="#episodios" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B78B4E] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(183,139,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#A67A3E]">
                  Ver episodios
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link href="#destacado" className="inline-flex items-center justify-center rounded-full border border-[#D3CCC0] bg-[#FAF8F4] px-8 py-3.5 text-sm font-semibold text-[#6E5C4C] transition duration-300 hover:bg-white">
                  Escuchar destacado
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.08)] md:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#8B6A45]">Episodio destacado</p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#4B392D] md:text-[34px]">
                      {featuredEpisode ? featuredEpisode.title : isLoading ? "Cargando contenido destacado..." : "Próximamente contenido destacado"}
                    </h2>
                  </div>

                  <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#F1ECE4] text-[#B78B4E] md:flex">
                    <Mic2 className="h-6 w-6" />
                  </div>
                </div>

                <p className="max-w-[560px] text-sm leading-7 text-[#67584B]">
                  {featuredEpisode?.shortDescription ||
                    "Publica y destaca episodios desde el panel administrativo para reflejarlos automáticamente aquí."}
                </p>

                <div id="destacado" className="mt-6 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="overflow-hidden rounded-[26px] border border-[#E3DDD2] bg-[linear-gradient(135deg,#E6D8C5_0%,#D9C2A0_100%)] p-5">
                    {featuredEpisode?.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={featuredEpisode.thumbnailUrl} alt={featuredEpisode.title} className="h-full min-h-[220px] w-full rounded-[22px] object-cover" />
                    ) : (
                      <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[22px] border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_100%)] p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#221B18]/10 text-[#4A3525]">
                          <Play className="ml-0.5 h-5 w-5" />
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A3525]">Podcast / Video</p>
                          <h3 className="mt-3 text-2xl font-semibold leading-snug text-[#221B18]">
                            {featuredEpisode ? featuredEpisode.platform : "Portada del episodio"}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">Título</p>
                      <p className="mt-3 text-xl font-semibold text-[#221B18]">{featuredEpisode?.title || "Sin episodio destacado"}</p>
                    </div>

                    <div className="rounded-[24px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">Resumen</p>
                      <p className="mt-3 text-sm leading-7 text-[#67584B]">
                        {featuredEpisode?.fullDescription || featuredEpisode?.shortDescription ||
                          "Cuando publiques contenido desde admin, esta sección mostrará automáticamente el episodio destacado y su resumen."}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-[#E3DDD2] bg-[#F7F4EE] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">Duración</p>
                        <p className="mt-2 text-lg font-semibold text-[#221B18]">{featuredEpisode?.duration || "Por definir"}</p>
                      </div>

                      <div className="rounded-[22px] border border-[#E3DDD2] bg-[#F7F4EE] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">Publicación</p>
                        <p className="mt-2 text-lg font-semibold text-[#221B18]">{featuredEpisode ? formatPodcastDate(featuredEpisode.publishedAt || featuredEpisode.createdAt) : "Próximamente"}</p>
                      </div>
                    </div>

                    {featuredEpisode && (
                      <Link href={buildEpisodeHref(featuredEpisode.externalUrl, featuredEpisode.embedUrl)} target={featuredEpisode.externalUrl || featuredEpisode.embedUrl ? "_blank" : undefined} rel={featuredEpisode.externalUrl || featuredEpisode.embedUrl ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#221B18] px-7 py-3 text-sm font-semibold text-[#F7F3EC] transition duration-300 hover:bg-[#2E2520]">
                        Reproducir episodio
                        <Play className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-[#D8D2C6] bg-[#F1ECE4] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#9A7647]">Conectado al backend</p>
                  <p className="mt-3 text-sm leading-7 text-[#67584B]">
                    Esta ventana ya consume los episodios publicados desde el backend. El contenido destacado y el listado se
                    alimentan desde lo administrado en el panel de Podcast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="episodios" className="px-4 pb-16 md:px-6 md:pb-20">
        <div className="mx-auto max-w-[1680px] rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.06)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#8B6A45]">Episodios publicados</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#4B392D]">Listado público conectado</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#67584B]">
                Esta sección ya está enlazada al backend y lista para evolucionar hacia un diseño más premium sin rehacer la base funcional.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E3DDD2] bg-[#F7F4EE] px-4 py-3 text-sm text-[#67584B]">
              {isLoading ? "Cargando episodios..." : `${episodes.length} episodio${episodes.length === 1 ? "" : "s"} publicado${episodes.length === 1 ? "" : "s"}`}
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
          ) : episodes.length === 0 ? (
            <div className="mt-8 rounded-[24px] border border-dashed border-[#D8D2C6] bg-[#F7F4EE] px-6 py-10 text-center text-[#67584B]">
              Aún no hay episodios publicados. En cuanto publiques contenido desde el panel admin, aparecerá aquí.
            </div>
          ) : (
            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {episodes.map((episode) => {
                const href = buildEpisodeHref(episode.externalUrl, episode.embedUrl);
                return (
                  <article key={episode.id} className="flex h-full flex-col rounded-[28px] border border-[#E3DDD2] bg-[#F7F4EE] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="overflow-hidden rounded-[22px] bg-[#E9E2D5]">
                      {episode.thumbnailUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={episode.thumbnailUrl} alt={episode.title} className="h-52 w-full object-cover" />
                      ) : (
                        <div className="flex h-52 items-center justify-center text-[#8B6A45]">
                          <Mic2 className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6A45]">
                        <span>{episode.platform}</span>
                        <span>•</span>
                        <span>{formatPodcastDate(episode.publishedAt || episode.createdAt)}</span>
                        {episode.isFeatured && (
                          <>
                            <span>•</span>
                            <span>Destacado</span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold text-[#221B18]">{episode.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#67584B]">{episode.shortDescription || episode.fullDescription || "Contenido sin resumen disponible."}</p>

                      <div className="mt-5 grid gap-3 text-sm text-[#67584B] sm:grid-cols-2">
                        <div className="rounded-[18px] border border-[#E3DDD2] bg-white px-4 py-3">
                          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#9A7647]">Duración</span>
                          <span className="mt-2 block font-medium text-[#221B18]">{episode.duration || "Por definir"}</span>
                        </div>
                        <div className="rounded-[18px] border border-[#E3DDD2] bg-white px-4 py-3">
                          <span className="block text-[11px] uppercase tracking-[0.22em] text-[#9A7647]">Invitados</span>
                          <span className="mt-2 block font-medium text-[#221B18]">{episode.guests || "Sin invitados"}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        {href !== "#episodios" ? (
                          <Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#221B18] px-5 py-3 text-sm font-semibold text-[#F7F3EC] transition hover:bg-[#2E2520]">
                            Ver episodio
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
  );
}
