"use client";

import { diariesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface DiaryMosaicGalleryProps {
  diaries: diariesType[];
}

/**
 * Mosaic layout patterns for 1–6 items.
 * Each pattern is an array of CSS grid placements:
 * { col: "col-span-X", row: "row-span-X" }
 *
 * Grid is always 3 columns wide. Rows auto-size via `grid-auto-rows`.
 */
type CellSpan = { colSpan: number; rowSpan: number };

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

export default function DiaryMosaicGallery({ diaries }: DiaryMosaicGalleryProps) {
  const items = useMemo(() => diaries.slice(0, 6), [diaries]);
  const layout = useMemo(() => getMosaicLayout(items.length), [items.length]);

  if (!items.length) return null;

  return (
    <>
      <style>{`
        .diary-mosaic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 220px;
          gap: 12px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .diary-mosaic-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 180px;
          }
        }

        @media (max-width: 480px) {
          .diary-mosaic-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 260px;
          }
        }

        .diary-mosaic-card {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          cursor: pointer;
          background: #0f172a;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }

        .diary-mosaic-card:hover {
          transform: translateY(-4px) scale(1.012);
          box-shadow: 0 12px 40px rgba(8, 145, 178, 0.35), 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .diary-mosaic-img {
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            filter 0.55s ease;
          filter: brightness(0.82) saturate(1.1);
          object-fit: cover;
        }

        .diary-mosaic-card:hover .diary-mosaic-img {
          transform: scale(1.08);
          filter: brightness(0.55) saturate(1.25);
        }

        .diary-mosaic-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.92) 0%,
            rgba(3, 20, 40, 0.45) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px 18px;
        }

        .diary-mosaic-card:hover .diary-mosaic-overlay {
          opacity: 1;
        }

        .diary-mosaic-title {
          color: #fff;
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.35;
          margin-bottom: 6px;
          transform: translateY(10px);
          transition: transform 0.4s ease 0.05s;
        }

        .diary-mosaic-card:hover .diary-mosaic-title {
          transform: translateY(0);
        }

        .diary-mosaic-description {
          color: rgba(203, 213, 225, 0.9);
          font-size: 0.82rem;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transform: translateY(10px);
          opacity: 0;
          transition: transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s;
        }

        .diary-mosaic-card:hover .diary-mosaic-description {
          transform: translateY(0);
          opacity: 1;
        }

        .diary-mosaic-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          color: #22d3ee;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.4s ease 0.15s, opacity 0.4s ease 0.15s;
        }

        .diary-mosaic-card:hover .diary-mosaic-cta {
          transform: translateY(0);
          opacity: 1;
        }

        .diary-mosaic-cta svg {
          transition: transform 0.25s ease;
        }

        .diary-mosaic-card:hover .diary-mosaic-cta svg {
          transform: translateX(4px);
        }

        /* Always-visible bottom gradient for titles on non-hover state */
        .diary-mosaic-base-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.72) 0%,
            rgba(3, 20, 40, 0.1) 40%,
            transparent 70%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px 18px;
          transition: opacity 0.4s ease;
        }

        .diary-mosaic-card:hover .diary-mosaic-base-overlay {
          opacity: 0;
        }

        .diary-mosaic-base-title {
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        /* Focus ring for accessibility */
        .diary-mosaic-card:focus-visible {
          outline: 2px solid #22d3ee;
          outline-offset: 2px;
        }
      `}</style>

      <div className="diary-mosaic-grid">
        {items.map((diary, index) => {
          const span = layout[index];

          return (
            <Link
              key={diary._id}
              href={`/diaries/${diary._id}`}
              className="diary-mosaic-card"
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
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="diary-mosaic-img"
                  priority={index === 0}
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

              {/* Base overlay — always visible, hides on hover */}
              <div className="diary-mosaic-base-overlay">
                <p className="diary-mosaic-base-title">{diary.title}</p>
              </div>

              {/* Hover overlay — appears on hover */}
              <div className="diary-mosaic-overlay">
                <h3 className="diary-mosaic-title">{diary.title}</h3>
                {diary.description && (
                  <p className="diary-mosaic-description">{diary.description}</p>
                )}
                <span className="diary-mosaic-cta">
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
