"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HeroCarouselImages } from "@/utils/carrouselImages";
import Image from "next/image";
import CarouselDots from "@/components/Carousels/CarouselDots/CarouselDots";
import Link from "next/link";

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
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-[100px] right-[100px] p-10 rounded-[5px]  text-white group bg-black/20 hover:bg-black/40 transition-all delay-200 duration-500">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ease-in-out drop-shadow-md">
                {slide.description}
              </p>
              <Link
                href={`/projects/project/${slide.url}`}
                className="inline-block mt-4 py-3 text-xl sm:text-2xl text-cyan-500 font-semibold transition-all underline duration-500">
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
