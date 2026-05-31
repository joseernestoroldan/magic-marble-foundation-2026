"use client";

import { Crop, HotSpot } from "@/clientTypes";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import {
  getModalFrameWidth,
  getSanityImageFrame,
} from "./sanityImageFrame";
import styles from "./GalleryModalDetail.module.css";

type GalleryModalDetailProps = {
  title: string;
  displayDate: string | null;
  dateTime: string;
  description: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
};

export default function GalleryModalDetail({
  title,
  displayDate,
  dateTime,
  description,
  mainImage,
  hotSpot,
  crop,
}: GalleryModalDetailProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const panelId = useId();
  const { objectPosition, aspectRatio } = getSanityImageFrame(hotSpot, crop);

  const closeInfo = useCallback(() => setInfoOpen(false), []);

  useEffect(() => {
    if (!infoOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-gallery-info]")) {
        closeInfo();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [infoOpen, closeInfo]);

  return (
    <div className={styles.container}>
      {mainImage ? (
        <div
          className={styles.imageFrame}
          style={{
            aspectRatio,
            width: getModalFrameWidth(aspectRatio),
          }}
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            sizes="96vw"
            className={styles.image}
            style={{ objectPosition }}
            priority
          />
        </div>
      ) : (
        <div className={styles.placeholder} aria-hidden />
      )}

      {description && (
        <div className={styles.infoGroup} data-gallery-info>
          <button
            type="button"
            onClick={() => setInfoOpen((open) => !open)}
            className={infoOpen ? styles.infoButtonActive : styles.infoButton}
            aria-expanded={infoOpen}
            aria-controls={panelId}
            aria-label={infoOpen ? "Hide description" : "Show description"}
          >
            <InfoIcon />
          </button>

          <div
            id={panelId}
            role="region"
            aria-label="Description"
            aria-hidden={!infoOpen}
            className={infoOpen ? styles.infoPanelVisible : styles.infoPanelHidden}
          >
            <p className={styles.infoLabel}>
              Description
            </p>
            <p>{description}</p>
          </div>
        </div>
      )}

      <div className={styles.bottomGradient}>
        <h2 className={styles.modalTitle}>
          {title}
        </h2>
        {displayDate && (
          <time className={styles.modalDate} dateTime={dateTime}>
            {displayDate}
          </time>
        )}
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
