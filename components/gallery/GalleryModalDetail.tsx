"use client";

import { Crop, HotSpot } from "@/clientTypes";
import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import {
  getModalFrameWidth,
  getSanityImageFrame,
} from "./sanityImageFrame";

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
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-[5px] bg-gray-900 shadow-2xl">
      {mainImage ? (
        <div
          className="relative max-h-[94vh] max-w-[96vw]"
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
            className="object-cover"
            style={{ objectPosition }}
            priority
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] w-full max-w-[96vw] bg-gradient-to-br from-cyan-900 to-gray-900"
          aria-hidden
        />
      )}

      {description && (
        <div className="absolute left-3 top-3 z-20 sm:left-4 sm:top-4" data-gallery-info>
          <button
            type="button"
            onClick={() => setInfoOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              infoOpen ? "ring-2 ring-white/40" : ""
            }`}
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
            className={`absolute left-0 top-12 w-[min(20rem,calc(96vw-2rem))] rounded-[5px] border border-white/10 bg-gray-800/95 p-4 text-sm leading-relaxed text-white shadow-xl backdrop-blur-md transition-opacity duration-300 ease-in-out ${
              infoOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Description
            </p>
            <p>{description}</p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-8">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
          {title}
        </h2>
        {displayDate && (
          <time className="mt-2 block text-sm text-slate-300 sm:text-base" dateTime={dateTime}>
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
