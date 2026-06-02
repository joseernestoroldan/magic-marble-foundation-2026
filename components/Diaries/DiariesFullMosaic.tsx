"use client";

import { diariesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./DiariesFullMosaic.module.css";

interface DiariesFullMosaicProps {
  diaries: diariesType[];
}

/**
 * Repeating mosaic patterns for a 4-column grid.
 * Each "cycle" of 6 items uses a unique arrangement so
 * the gallery feels organic, not repetitive.
 *
 * Pattern A:  ██░  →  2-col×2-row hero + two 1×1 stacked on the right + one 3-wide banner
 * Pattern B:  ░██  →  mirrored: two 1×1 on left + 2-col×2-row hero on right + one 3-wide banner
 *
 * We alternate A→B→A→B… so consecutive groups look different.
 */
type CellSpan = { colSpan: number; rowSpan: number };

const PATTERN_A: CellSpan[] = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
];

const PATTERN_B: CellSpan[] = [
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

function getSpanForItem(index: number): CellSpan {
  const cycleIndex = Math.floor(index / 6);
  const posInCycle = index % 6;
  const pattern = cycleIndex % 2 === 0 ? PATTERN_A : PATTERN_B;
  return pattern[posInCycle];
}

/**
 * Helper to get the remaining items layout when the total count
 * is not a multiple of 6.
 */
function getRemainderSpan(posInCycle: number, remaining: number): CellSpan {
  switch (remaining) {
    case 1:
      return { colSpan: 4, rowSpan: 2 };
    case 2:
      return posInCycle === 0
        ? { colSpan: 2, rowSpan: 2 }
        : { colSpan: 2, rowSpan: 2 };
    case 3:
      if (posInCycle === 0) return { colSpan: 2, rowSpan: 2 };
      return { colSpan: 1, rowSpan: 2 };
    case 4:
      if (posInCycle === 0) return { colSpan: 2, rowSpan: 2 };
      if (posInCycle === 1) return { colSpan: 2, rowSpan: 1 };
      return { colSpan: 1, rowSpan: 1 };
    case 5:
      return PATTERN_A[posInCycle];
    default:
      return { colSpan: 1, rowSpan: 1 };
  }
}

function getLayout(total: number): CellSpan[] {
  const fullCycles = Math.floor(total / 6);
  const remainder = total % 6;
  const spans: CellSpan[] = [];

  for (let i = 0; i < fullCycles * 6; i++) {
    spans.push(getSpanForItem(i));
  }

  for (let i = 0; i < remainder; i++) {
    spans.push(getRemainderSpan(i, remainder));
  }

  return spans;
}

export default function DiariesFullMosaic({ diaries }: DiariesFullMosaicProps) {
  const layout = useMemo(() => getLayout(diaries.length), [diaries.length]);

  if (!diaries.length) return null;

  return (
    <div className={styles.mosaic}>
        {diaries.map((diary, index) => {
          const span = layout[index];
          const formattedDate = new Date(diary._createdAt).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          );

          return (
            <Link
              key={diary._id}
              href={`/diaries/${diary._id}`}
              className={styles.card}
              style={{
                gridColumn: `span ${span.colSpan}`,
                gridRow: `span ${span.rowSpan}`,
              }}
              aria-label={`Read diary: ${diary.title}`}
            >
              {/* Image */}
              {diary.mainImage ? (
                <Image
                  src={diary.mainImage}
                  alt={diary.title}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={styles.img}
                  loading={index < 4 ? "eager" : "lazy"}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, #0e7490 0%, #155e75 100%)",
                  }}
                />
              )}

              {/* Base overlay — always visible, fades out on hover */}
              <div className={styles.baseOverlay}>
                <p className={styles.baseTitle}>{diary.title}</p>
                <span className={styles.baseDate}>{formattedDate}</span>
              </div>

              {/* Hover overlay — appears on hover with staggered animations */}
              <div className={styles.hoverOverlay}>
                <h3 className={styles.hoverTitle}>{diary.title}</h3>
                {diary.author && (
                  <span className={styles.hoverAuthor}>By {diary.author}</span>
                )}
                {diary.description && (
                  <p className={styles.hoverDesc}>{diary.description}</p>
                )}
                <span className={styles.hoverCta}>
                  Read story
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
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
  );
}
