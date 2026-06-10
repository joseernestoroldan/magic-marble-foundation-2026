"use client";

import CarouselDots from "@/components/Carousels/CarouselDots/CarouselDots";
import { HeroCarouselImages } from "@/utils/carrouselImages";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroInfoCard from "./HeroInfoCard";
import styles from "./HeroCarousel.module.css";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = HeroCarouselImages.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, nextSlide]);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {HeroCarouselImages.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className={styles.image}
              priority={slide.id === 1}
              loading={slide.id <= 3 ? "eager" : "lazy"}
              sizes="100vw"
            />

            <div className={styles.overlay} />

            <HeroInfoCard
              title={slide.title}
              description={slide.description}
              url={slide.url}
            />
          </div>
        ))}
      </div>

      <CarouselDots
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onDotClick={goToSlide}
      />
    </div>
  );
};

export default HeroCarousel;
