"use client";

import { useMemo, useState } from "react";
import PodcastEpisodeCard, {
  type PodcastEpisodeCardData,
} from "@/components/podcast/PodcastEpisodeCard";
import PodcastVideoModal from "@/components/podcast/PodcastVideoModal";
import styles from "./PodcastPage.module.css";

const episodesMock: PodcastEpisodeCardData[] = [
  {
    id: "1",
    title: "Plática con mi esposa Karen Eliza",
    description:
      "Una plática con mi esposa en donde hemos ido trabajando en aquello para que ANRO vaya creciendo.",
    platform: "YOUTUBE",
    thumbnailUrl: "/images/podcast-youtube-thumb.jpg",
    embedUrl: "https://www.youtube.com/embed/qjzMNcG11YY?autoplay=1",
    guest: "Presidenta de ANRO Karen Eliza",
    duration: "32:10 minutos",
    publishedAt: "29 mar 2025",
  },
  {
    id: "2",
    title: "Mi infancia",
    description:
      "Reflexión en formato breve sobre experiencias personales y visión de vida.",
    platform: "TIKTOK",
    thumbnailUrl: "/images/podcast-tiktok-thumb.jpg",
    embedUrl: "https://www.tiktok.com/embed/v2/7484636302363598126",
    guest: "Sin invitado",
    duration: "06:37",
    publishedAt: "29 mar 2025",
  },
];

export default function PodcastPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisodeCardData | null>(null);

  const featuredEpisodes = useMemo(() => episodesMock.slice(0, 2), []);

  return (
    <>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroIntro}>
            <span className={styles.kicker}>Podcast · ANRO</span>
            <h1 className={styles.heroTitle}>
              Ideas, visión y conversaciones que <span>construyen valor</span>
            </h1>
            <p className={styles.heroText}>
              Un espacio de ANRO para compartir perspectivas, experiencias,
              entrevistas y temas clave sobre desarrollo, construcción,
              inversión y visión empresarial.
            </p>

            <div className={styles.heroActions}>
              <button className={styles.primaryBtn}>Ver episodio destacado</button>
              <button className={styles.secondaryBtn}>Ver destacados</button>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Publicados</span>
                <strong className={styles.statValue}>2</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Destacados visibles</span>
                <strong className={styles.statValue}>2/2</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Experiencia</span>
                <strong className={styles.statValue}>Video integrado</strong>
              </div>
            </div>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.sectionHeading}>
              <span className={styles.sectionKicker}>Episodios destacados</span>
              <h2>Hasta 2 episodios principales</h2>
              <p>
                Dos contenidos relevantes en una vista uniforme y mucho más
                limpia visualmente.
              </p>
            </div>

            <div className={styles.featuredGrid}>
              {featuredEpisodes.map((episode, index) => (
                <PodcastEpisodeCard
                  key={episode.id}
                  episode={episode}
                  onOpen={setSelectedEpisode}
                  featuredLabel={index === 0 ? "Destacado principal" : "Destacado secundario"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.listSection}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionKicker}>Biblioteca pública</span>
            <h2>Todos los episodios publicados</h2>
            <p>
              Aquí aparecerán todos los episodios publicados, filtrados por plataforma.
            </p>
          </div>

          <div className={styles.listGrid}>
            {episodesMock.map((episode) => (
              <PodcastEpisodeCard
                key={episode.id}
                episode={episode}
                onOpen={setSelectedEpisode}
              />
            ))}
          </div>
        </section>
      </main>

      <PodcastVideoModal
        isOpen={!!selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
        title={selectedEpisode?.title ?? ""}
        platform={selectedEpisode?.platform ?? "YOUTUBE"}
        embedUrl={selectedEpisode?.embedUrl ?? ""}
        description={selectedEpisode?.description}
      />
    </>
  );
}