"use client";

import DonationButton from "@/components/DonationButton/DonationButton";
import { FadeInCarouselImages } from "@/utils/carrouselImages";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./FadeInOutCarausel.module.css";

const SLIDE_DURATION = 8000;
const FADE_DURATION = 300;

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
      className={styles.section}
      style={{ height: "calc(100vh - 144px)" }}
      aria-label="Featured programs carousel"
    >
      {FadeInCarouselImages.map((item, index) => (
        <div
          key={item.id}
          className={styles.slideLayer}
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
            className={styles.slideImage}
          />
          <div
            className={styles.gradientOverlay}
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.80) 100%)",
            }}
          />
        </div>
      ))}

      <div
        className={styles.content}
        style={{
          opacity: isFading ? 0 : 1,
          transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        <div
          className={styles.accentLine}
          style={{
            background: "linear-gradient(90deg, #06b6d4, #0e7490)",
            boxShadow: "0 0 12px rgba(6,182,212,0.6)",
          }}
        />

        <h2
          className={styles.slideTitle}
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {slide.title}
        </h2>

        <p
          className={styles.slideDescription}
          style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {slide.message}
        </p>

        <DonationButton />
      </div>

      <div className={styles.dots} aria-label="Carousel navigation dots">
        {FadeInCarouselImages.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={styles.dot}
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

      <div
        className={styles.progressBar}
        style={{
          background: "linear-gradient(90deg, #06b6d4, #0e7490)",
          animation: "progressBar 8s linear infinite",
          boxShadow: "0 0 8px rgba(6,182,212,0.5)",
        }}
      />
    </section>
  );
};

export default FadeInOutCarausel;