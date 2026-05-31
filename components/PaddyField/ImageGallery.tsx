"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ImageGallery.module.css";

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
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className={styles.mainImg}
          style={{ objectPosition: `${x}% ${y}%` }}
          priority
        />
        <div className={styles.borderOverlay} />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((img, index) => {
            const thumbX = (img.hotSpot?.x ?? 0.5) * 100;
            const thumbY = (img.hotSpot?.y ?? 0.5) * 100;
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`${styles.thumb} ${isActive ? styles.thumbActive : styles.thumbInactive}`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="128px"
                  className={styles.thumbImg}
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
