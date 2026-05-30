"use client";

import { useEffect, useState } from "react";
import styles from "./Heading.module.css";

const sizeMap: Record<string, string> = {
  default: styles.sizeDefault,
  hero: styles.sizeHero,
};

interface HeadingProps {
  text: string;
  initialDelay?: number;
  stagger?: number;
  size?: keyof typeof sizeMap;
  color?: string;
  className?: string;
}

const Heading = ({
  text,
  initialDelay = 200,
  stagger = 100,
  size = "default",
  color = "#ffffff",
  className = "",
}: HeadingProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, [initialDelay]);

  const letters = text.split("");

  return (
    <h2
      className={`${styles.heading} ${sizeMap[size] ?? styles.sizeDefault} ${className}`}
      style={{ color, textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)" }}
      aria-label={text}>
      {letters.map((letter, index) => {
        const isSpace = letter === " ";

        return (
          <span
            key={index}
            className={styles.letter}
            style={{
              transitionDelay: `${index * stagger}ms`,
              transform: isVisible ? "translateY(0)" : "translateY(100%)",
              opacity: isVisible ? 1 : 0,
            }}
            aria-hidden="true">
            {isSpace ? "\u00A0" : letter}
          </span>
        );
      })}
    </h2>
  );
};

export default Heading;
