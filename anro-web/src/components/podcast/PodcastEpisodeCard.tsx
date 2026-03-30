"use client";

import styles from "./PodcastEpisodeCard.module.css";

type Platform = "YOUTUBE" | "TIKTOK";

export interface PodcastEpisodeCardData {
  id: string;
  title: string;
  description?: string;
  platform: Platform;
  thumbnailUrl: string;
  embedUrl: string;
  guest?: string;
  duration?: string;
  publishedAt?: string;
}

interface PodcastEpisodeCardProps {
  episode: PodcastEpisodeCardData;
  onOpen: (episode: PodcastEpisodeCardData) => void;
  featuredLabel?: string;
}

export default function PodcastEpisodeCard({
  episode,
  onOpen,
  featuredLabel,
}: PodcastEpisodeCardProps) {
  return (
    <article className={styles.card} onClick={() => onOpen(episode)}>
      <div className={styles.thumbnailWrap}>
        <img
          src={episode.thumbnailUrl}
          alt={episode.title}
          className={styles.thumbnail}
        />

        <div className={styles.overlay} />

        <div className={styles.topBadges}>
          <span className={styles.platformBadge}>
            {episode.platform === "YOUTUBE" ? "YouTube" : "TikTok"}
          </span>

          {featuredLabel ? (
            <span className={styles.featuredBadge}>{featuredLabel}</span>
          ) : null}
        </div>

        <div className={styles.playButton}>
          <span className={styles.playTriangle} />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{episode.title}</h3>

        {episode.description ? (
          <p className={styles.description}>{episode.description}</p>
        ) : null}

        <div className={styles.metaGrid}>
          {episode.duration ? (
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Duración</span>
              <span className={styles.metaValue}>{episode.duration}</span>
            </div>
          ) : null}

          {episode.guest ? (
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Invitado</span>
              <span className={styles.metaValue}>{episode.guest}</span>
            </div>
          ) : null}

          {episode.publishedAt ? (
            <div className={styles.metaBox}>
              <span className={styles.metaLabel}>Publicación</span>
              <span className={styles.metaValue}>{episode.publishedAt}</span>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className={styles.action}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(episode);
          }}
        >
          Ver episodio
        </button>
      </div>
    </article>
  );
}