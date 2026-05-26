"use client";

import Image from "next/image";
import { useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface GalleryImage {
  src: string;
  alt: string;
  hotSpot?: any;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const activeImage = images[activeIndex];
  const x = (activeImage.hotSpot?.x ?? 0.5) * 100;
  const y = (activeImage.hotSpot?.y ?? 0.5) * 100;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Main Featured Image */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-[5px] bg-[#021f10]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover animate-in fade-in zoom-in-95 duration-700"
          style={{ objectPosition: `${x}% ${y}%` }}
          priority
        />
        <div className="absolute inset-0 border border-black/10 pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
          {images.map((img, index) => {
            const thumbX = (img.hotSpot?.x ?? 0.5) * 100;
            const thumbY = (img.hotSpot?.y ?? 0.5) * 100;
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-[5px] transition-all duration-500 outline-none
                  ${isActive ? 'ring-2 ring-[#10b981] ring-offset-4 ring-offset-[#f4fdf8] opacity-100 scale-95' : 'opacity-50 hover:opacity-100 hover:scale-95'}`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                  style={{ objectPosition: `${thumbX}% ${thumbY}%` }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
