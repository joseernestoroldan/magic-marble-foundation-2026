"use client";

import { diariesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
    <>
      <style>{`
        .diaries-full-mosaic {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 200px;
          gap: 10px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .diaries-full-mosaic {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 190px;
          }
        }

        @media (max-width: 768px) {
          .diaries-full-mosaic {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
          }
        }

        @media (max-width: 480px) {
          .diaries-full-mosaic {
            grid-template-columns: 1fr;
            grid-auto-rows: 260px;
          }
        }

        .dfm-card {
          position: relative;
          overflow: hidden;
          border-radius: 5px;
          cursor: pointer;
          background: #0f172a;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }

        .dfm-card:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow:
            0 16px 48px rgba(8, 145, 178, 0.3),
            0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .dfm-card:focus-visible {
          outline: 2px solid #22d3ee;
          outline-offset: 2px;
        }

        .dfm-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            filter 0.6s ease;
          filter: brightness(0.78) saturate(1.15);
          object-fit: cover;
        }

        .dfm-card:hover .dfm-img {
          transform: scale(1.1);
          filter: brightness(0.5) saturate(1.3);
        }

        /* Always-visible base overlay with title */
        .dfm-base-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.78) 0%,
            rgba(3, 20, 40, 0.15) 45%,
            transparent 75%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px 20px;
          transition: opacity 0.4s ease;
        }

        .dfm-card:hover .dfm-base-overlay {
          opacity: 0;
        }

        .dfm-base-title {
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
        }

        .dfm-base-date {
          color: rgba(148, 163, 184, 0.9);
          font-size: 0.72rem;
          margin-top: 4px;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        /* Hover overlay with full info */
        .dfm-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.95) 0%,
            rgba(3, 20, 40, 0.55) 55%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 22px 20px;
        }

        .dfm-card:hover .dfm-hover-overlay {
          opacity: 1;
        }

        .dfm-hover-title {
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1.35;
          margin-bottom: 6px;
          transform: translateY(12px);
          transition: transform 0.4s ease 0.05s;
        }

        .dfm-card:hover .dfm-hover-title {
          transform: translateY(0);
        }

        .dfm-hover-author {
          color: #67e8f9;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 6px;
          transform: translateY(10px);
          opacity: 0;
          transition: transform 0.4s ease 0.08s, opacity 0.4s ease 0.08s;
        }

        .dfm-card:hover .dfm-hover-author {
          transform: translateY(0);
          opacity: 1;
        }

        .dfm-hover-desc {
          color: rgba(203, 213, 225, 0.9);
          font-size: 0.8rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transform: translateY(10px);
          opacity: 0;
          transition: transform 0.4s ease 0.12s, opacity 0.4s ease 0.12s;
        }

        .dfm-card:hover .dfm-hover-desc {
          transform: translateY(0);
          opacity: 1;
        }

        .dfm-hover-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 12px;
          color: #22d3ee;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.4s ease 0.18s, opacity 0.4s ease 0.18s;
        }

        .dfm-card:hover .dfm-hover-cta {
          transform: translateY(0);
          opacity: 1;
        }

        .dfm-hover-cta svg {
          transition: transform 0.25s ease;
        }

        .dfm-card:hover .dfm-hover-cta svg {
          transform: translateX(4px);
        }
      `}</style>

      <div className="diaries-full-mosaic">
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
              className="dfm-card"
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
                  className="dfm-img"
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
              <div className="dfm-base-overlay">
                <p className="dfm-base-title">{diary.title}</p>
                <span className="dfm-base-date">{formattedDate}</span>
              </div>

              {/* Hover overlay — appears on hover with staggered animations */}
              <div className="dfm-hover-overlay">
                <h3 className="dfm-hover-title">{diary.title}</h3>
                {diary.author && (
                  <span className="dfm-hover-author">By {diary.author}</span>
                )}
                {diary.description && (
                  <p className="dfm-hover-desc">{diary.description}</p>
                )}
                <span className="dfm-hover-cta">
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
    </>
  );
}
