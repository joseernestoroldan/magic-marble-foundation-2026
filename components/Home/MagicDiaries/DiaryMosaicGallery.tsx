"use client";

import { diariesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./DiaryMosaicGallery.module.css";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DiaryMosaicGalleryProps {
  diaries: diariesType[];
}

type CellSpan = { colSpan: number; rowSpan: number };

/* ------------------------------------------------------------------ */
/*  Mosaic layout helper                                               */
/* ------------------------------------------------------------------ */

function getMosaicLayout(count: number): CellSpan[] {
  switch (count) {
    case 1:
      return [{ colSpan: 3, rowSpan: 2 }];
    case 2:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 2 },
      ];
    case 3:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
      ];
    case 4:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 3, rowSpan: 1 },
      ];
    case 5:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 2, rowSpan: 1 },
      ];
    case 6:
    default:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
      ];
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.ctaArrow}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PlaceholderGradient() {
  return (
    <div className={styles.placeholderGradient} />
  );
}

function BaseOverlay({ title }: { title: string }) {
  return (
    <div className={styles.baseOverlay}>
      <p className={styles.baseTitle}>
        {title}
      </p>
    </div>
  );
}

function HoverOverlay({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.hoverOverlay}>
      <h3 className={styles.hoverTitle}>
        {title}
      </h3>

      {description && (
        <p className={styles.hoverDescription}>
          {description}
        </p>
      )}

      <span className={styles.cta}>
        Read story
        <ArrowIcon />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mosaic card                                                        */
/* ------------------------------------------------------------------ */

interface MosaicCardProps {
  diary: diariesType;
  span: CellSpan;
  priority: boolean;
}

function MosaicCard({ diary, span, priority }: MosaicCardProps) {
  return (
    <Link
      href={`/diaries/${diary._id}`}
      className={styles.card}
      style={{
        gridColumn: `span ${span.colSpan}`,
        gridRow: `span ${span.rowSpan}`,
      }}
      aria-label={`Read diary: ${diary.title}`}
    >
      {diary.mainImage ? (
        <Image
          src={diary.mainImage}
          alt={diary.title}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          className={styles.cardImage}
          priority={priority}
        />
      ) : (
        <PlaceholderGradient />
      )}

      <BaseOverlay title={diary.title} />

      <HoverOverlay title={diary.title} description={diary.description} />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main gallery component                                             */
/* ------------------------------------------------------------------ */

export default function DiaryMosaicGallery({
  diaries,
}: DiaryMosaicGalleryProps) {
  const items = useMemo(() => diaries.slice(0, 6), [diaries]);
  const layout = useMemo(() => getMosaicLayout(items.length), [items.length]);

  if (!items.length) return null;

  return (
    <div className={styles.grid}>
      {items.map((diary, index) => (
        <MosaicCard
          key={diary._id}
          diary={diary}
          span={layout[index]}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
