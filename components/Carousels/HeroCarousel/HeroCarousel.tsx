"use client";

import CarouselDots from "@/components/Carousels/CarouselDots/CarouselDots";
import { HeroCarouselImages } from "@/utils/carrouselImages";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
      className="relative w-full h-full min-h-[calc(100vh-142px)] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div
        className="flex h-full min-h-[calc(100vh-142px)] transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {HeroCarouselImages.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full min-h-[calc(100vh-142px)] flex-shrink-0">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.id === 1}
              loading={slide.id <= 3 ? "eager" : "lazy"}
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-14 left-4 right-4 p-4 md:left-8 md:right-8 md:bottom-16 md:p-6 lg:left-auto lg:bottom-[100px] lg:right-[100px] lg:p-10 rounded-[5px] text-white group bg-black/20 hover:bg-black/40 transition-all delay-200 duration-500">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xs md:text-sm lg:text-lg max-w-3xl leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ease-in-out drop-shadow-md">
                {slide.description}
              </p>
              <Link
                href={`/projects/project/${slide.url}`}
                className="inline-block mt-2 md:mt-4 py-2 md:py-3 text-base md:text-xl lg:text-2xl text-cyan-600 font-semibold transition-all underline duration-500">
                Learn More
              </Link>
            </div>
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
