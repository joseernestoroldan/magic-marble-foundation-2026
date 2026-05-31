"use client";

import { projectType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DonationButton from "../DonationButton/DonationButton";
import styles from "./ProjectsCarousel.module.css";

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
      className={styles.carousel}
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
            className={`${styles.slide} ${isActive ? styles.slideActive : styles.slideHidden}`}
          >
            {project.mainImage && (
              <Image
                src={project.mainImage}
                alt={project.title || "Project Image"}
                fill
                sizes="100vw"
                className={styles.image}
                style={{ objectPosition: `${x}% ${y}%` }}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}

            {/* Dark overlay for better text readability */}
            <div className={styles.overlay}></div>

            {/* Content overlay */}
            <div className={styles.content}>
              <h2 className={styles.title}>
                {project.title}
              </h2>

              {project.description && (
                <p className={styles.description}>
                  {project.description}
                </p>
              )}

              <div className={styles.actions}>
                <Link
                  href={`/projects/${project._id}`}
                  className={styles.readMoreBtn}
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
        className={`${styles.navArrow} ${styles.navArrowLeft}`}
        aria-label="Previous Slide"
      >
        <FaChevronLeft className={styles.arrowIcon} />
      </button>

      <button
        onClick={nextSlide}
        className={`${styles.navArrow} ${styles.navArrowRight}`}
        aria-label="Next Slide"
      >
        <FaChevronRight className={styles.arrowIcon} />
      </button>

      {/* Navigation Dots */}
      <div className={styles.navDots}>
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : styles.dotInactive}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
