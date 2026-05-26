"use client";

import { projectType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DonationButton from "../DonationButton/DonationButton";

interface ProjectsCarouselProps {
  projects: projectType[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, [projects.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  // Pre-compute hotspot positions once to avoid recalculating on every render
  const hotspotPositions = useMemo(
    () =>
      projects.map((project) => ({
        x: (project.hotSpot?.x ?? 0.5) * 100,
        y: (project.hotSpot?.y ?? 0.5) * 100,
      })),
    [projects]
  );

  // Only render the current slide, the previous, and the next for performance.
  // This avoids loading all images at once when there are many projects.
  const visibleIndices = useMemo(() => {
    const len = projects.length;
    if (len <= 3) return projects.map((_, i) => i);
    const prev = (currentIndex - 1 + len) % len;
    const next = (currentIndex + 1) % len;
    return [prev, currentIndex, next];
  }, [currentIndex, projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {projects.map((project, index) => {
        const isActive = index === currentIndex;
        const isVisible = visibleIndices.includes(index);

        // Skip rendering non-visible slides entirely to save DOM nodes & memory
        if (!isVisible) return null;

        const { x, y } = hotspotPositions[index];

        return (
          <div
            key={project._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {project.mainImage && (
              <Image
                src={project.mainImage}
                alt={project.title || "Project Image"}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: `${x}% ${y}%` }}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-12 space-y-6 z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg tracking-wide capitalize">
                {project.title}
              </h2>

              {project.description && (
                <p className="text-white text-base md:text-xl lg:text-2xl max-w-3xl drop-shadow-md line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center">
                <Link
                  href={`/projects/${project._id}`}
                  className="rounded-[5px] text-sm sm:text-base bg-gray-700 hover:bg-gray-600 text-white h-[40px] w-36 flex justify-center items-center font-bold transition-all duration-500 ease-in-out capitalize tracking-widest shadow-lg"
                  prefetch={true}
                >
                  Read More
                </Link>
                <DonationButton />
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition-all duration-300"
        aria-label="Previous Slide"
      >
        <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 transition-all duration-300"
        aria-label="Next Slide"
      >
        <FaChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
