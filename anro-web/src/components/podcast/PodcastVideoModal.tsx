"use client";

import { useEffect } from "react";
import styles from "./PodcastVideoModal.module.css";

type Platform = "YOUTUBE" | "TIKTOK";

interface PodcastVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  platform: Platform;
  embedUrl: string;
  description?: string;
}

export default function PodcastVideoModal({
  isOpen,
  onClose,
  title,
  platform,
  embedUrl,
  description,
}: PodcastVideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isTikTok = platform === "TIKTOK";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${isTikTok ? styles.tiktokModal : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar video">
          ✕
        </button>

        <div className={styles.header}>
          <span className={styles.badge}>
            {platform === "YOUTUBE" ? "YouTube" : "TikTok"}
          </span>
          <h3 className={styles.title}>{title}</h3>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>

        <div className={`${styles.playerWrapper} ${isTikTok ? styles.playerWrapperTikTok : ""}`}>
          <iframe
            src={embedUrl}
            title={title}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}