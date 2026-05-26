"use client";

import { diariesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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

/**
 * Mosaic layout patterns for 1–6 items.
 * Grid is always 3 columns wide. Rows auto-size via `grid-auto-rows`.
 */
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

/** Arrow icon for the CTA */
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
      className="mosaic-cta-arrow transition-transform [transition-duration:250ms] ease-in-out"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/** Fallback gradient when no image is available */
function PlaceholderGradient() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-700 to-cyan-800" />
  );
}

/** Always-visible overlay with the title (hides on hover) */
function BaseOverlay({ title }: { title: string }) {
  return (
    <div className="mosaic-base-overlay absolute inset-0 flex flex-col justify-end p-4 transition-opacity [transition-duration:400ms] ease-in-out">
      <p className="text-white font-bold text-[0.95rem] leading-[1.3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        {title}
      </p>
    </div>
  );
}

/** Hover overlay with title, description, and CTA */
function HoverOverlay({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mosaic-hover-overlay absolute inset-0 flex flex-col justify-end px-[18px] py-5 opacity-0 transition-opacity [transition-duration:400ms] ease-in-out">
      <h3 className="mosaic-title text-white font-bold text-[1.05rem] leading-[1.35] mb-1.5 translate-y-2.5 transition-transform [transition-duration:400ms] ease-in-out [transition-delay:50ms]">
        {title}
      </h3>

      {description && (
        <p className="mosaic-description text-slate-300/90 text-[0.82rem] leading-[1.45] line-clamp-3 translate-y-2.5 opacity-0 transition-all [transition-duration:400ms] ease-in-out delay-100">
          {description}
        </p>
      )}

      <span className="mosaic-cta inline-flex items-center gap-[5px] mt-2.5 text-cyan-300 text-[0.78rem] font-semibold tracking-wide uppercase translate-y-2 opacity-0 transition-all [transition-duration:400ms] ease-in-out delay-150">
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
      className="mosaic-card group relative overflow-hidden rounded-[5px] cursor-pointer bg-slate-900 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] [transition-duration:350ms] ease-in-out hover:-translate-y-1 hover:scale-[1.012] hover:shadow-[0_12px_40px_rgba(8,145,178,0.35),0_4px_16px_rgba(0,0,0,0.4)] focus-visible:outline-2 focus-visible:outline-cyan-300 focus-visible:outline-offset-2"
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
          className="mosaic-img object-cover brightness-[0.82] saturate-[1.1] transition-[transform,filter] [transition-duration:550ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08] group-hover:brightness-[0.55] group-hover:saturate-[1.25]"
          priority={priority}
        />
      ) : (
        <PlaceholderGradient />
      )}

      {/* Base overlay — always visible, hides on hover */}
      <BaseOverlay title={diary.title} />

      {/* Hover overlay — appears on hover */}
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
    <>
      {/*
        Minimal scoped styles for effects that Tailwind v3 cannot express:
        - Parent-hover → child transform/opacity transitions
        - Responsive grid-auto-rows with custom pixel values
        - Gradient overlays with specific rgba stops
      */}
      <style>{`
        .mosaic-grid {
          grid-auto-rows: 220px;
        }

        @media (max-width: 768px) {
          .mosaic-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
          }
        }

        @media (max-width: 480px) {
          .mosaic-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 260px;
          }
        }

        .mosaic-base-overlay {
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.72) 0%,
            rgba(3, 20, 40, 0.1) 40%,
            transparent 70%
          );
        }

        .mosaic-card:hover .mosaic-base-overlay {
          opacity: 0;
        }

        .mosaic-hover-overlay {
          background: linear-gradient(
            to top,
            rgba(3, 20, 40, 0.92) 0%,
            rgba(3, 20, 40, 0.45) 50%,
            transparent 100%
          );
        }

        .mosaic-card:hover .mosaic-hover-overlay {
          opacity: 1;
        }

        .mosaic-card:hover .mosaic-title {
          transform: translateY(0);
        }

        .mosaic-card:hover .mosaic-description {
          transform: translateY(0);
          opacity: 1;
        }

        .mosaic-card:hover .mosaic-cta {
          transform: translateY(0);
          opacity: 1;
        }

        .mosaic-card:hover .mosaic-cta-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <div className="mosaic-grid grid w-full grid-cols-3 gap-3">
        {items.map((diary, index) => (
          <MosaicCard
            key={diary._id}
            diary={diary}
            span={layout[index]}
            priority={index === 0}
          />
        ))}
      </div>
    </>
  );
}
