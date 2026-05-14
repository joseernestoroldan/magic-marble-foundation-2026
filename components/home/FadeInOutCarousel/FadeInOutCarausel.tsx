"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FadeInCarouselImages } from "@/utils/carrouselImages";
import DonationButton from "@/components/DonationButton/DonationButton";

const SLIDE_DURATION = 8000; // ms each slide is visible
const FADE_DURATION = 300;  // ms for the fade transition

const FadeInOutCarausel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FadeInCarouselImages.length);

        setTimeout(() => {
          setIsFading(false);
        }, 50);
      }, FADE_DURATION);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const slide = FadeInCarouselImages[currentIndex];

  return (
    <section
      className="relative w-full min-h-[500px] overflow-hidden bg-white"
      style={{ height: "calc(100vh - 144px)" }}
      aria-label="Featured programs carousel"
    >
      {/* ── Background Images (stacked, only active one is visible) ── */}
      {FadeInCarouselImages.map((item, index) => (
        <div
          key={item.id}
          className="absolute inset-0"
          style={{
            opacity: index === currentIndex && !isFading ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.80) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Slide Content ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: isFading ? 0 : 1,
          transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {/* Decorative accent line */}
        <div
          className="w-[60px] h-[3px] rounded-sm mb-5"
          style={{
            background: "linear-gradient(90deg, #06b6d4, #0e7490)",
            boxShadow: "0 0 12px rgba(6,182,212,0.6)",
          }}
        />

        <h2
          className="font-extrabold text-white leading-tight max-w-[800px] mb-4 tracking-tight"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {slide.title}
        </h2>

        <p
          className="text-white/85 max-w-[600px] mb-8 leading-relaxed"
          style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {slide.message}
        </p>

        <DonationButton />
      </div>

      {/* ── Progress Dots ── */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-[10px]"
        aria-label="Carousel navigation dots"
      >
        {FadeInCarouselImages.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className="h-[10px] rounded-full border-none cursor-pointer p-0"
            style={{
              width: index === currentIndex ? "28px" : "10px",
              background:
                index === currentIndex
                  ? "linear-gradient(90deg, #06b6d4, #0e7490)"
                  : "rgba(255,255,255,0.4)",
              boxShadow:
                index === currentIndex
                  ? "0 0 10px rgba(6,182,212,0.7)"
                  : "none",
              transition:
                "width 400ms ease, background 400ms ease, box-shadow 400ms ease",
            }}
          />
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div
        className="absolute bottom-0 left-0 h-[3px] z-20"
        style={{
          background: "linear-gradient(90deg, #06b6d4, #0e7490)",
          animation: "fadeCarouselProgress 8s linear infinite",
          boxShadow: "0 0 8px rgba(6,182,212,0.5)",
        }}
      />

      <style>{`
        @keyframes fadeCarouselProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default FadeInOutCarausel;