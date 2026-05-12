"use client";

import { useIsVisible } from "@/hooks/useIsVisible";

interface SmokeTextProps {
  text: string;
  /** Delay in ms between each character animation (default: 60ms) */
  staggerMs?: number;
  /** Initial delay in ms before the first character starts (default: 0ms) */
  initialDelayMs?: number;
  className?: string;
}

/**
 * Renders a text string where each character fades in sequentially
 * with a smoke-like opacity transition, triggered when the container
 * enters the viewport.
 */
const SmokeText = ({
  text,
  staggerMs = 60,
  initialDelayMs = 0,
  className = "",
}: SmokeTextProps) => {
  const { ref, isVisible } = useIsVisible<HTMLParagraphElement>({
    threshold: 0.3,
  });

  // Split preserving spaces as visible characters
  const characters = text.split("");

  return (
    <p
      ref={ref}
      aria-label={text}
      className={`flex flex-wrap justify-center leading-snug ${className}`}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : "blur(6px)",
            transform: isVisible ? "translateY(0)" : "translateY(6px)",
            transition: isVisible
              ? `opacity 0.9s ease ${initialDelayMs + index * staggerMs}ms,
                 filter 0.9s ease ${initialDelayMs + index * staggerMs}ms,
                 transform 0.7s ease ${initialDelayMs + index * staggerMs}ms`
              : "none",
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
};

export default SmokeText;
