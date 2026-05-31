"use client";

import { useIsVisible } from "@/hooks/useIsVisible";
import styles from "./SmokeText.module.css";

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
 *
 * Words are grouped in `whitespace-nowrap` wrappers so the browser
 * never breaks a line in the middle of a word.
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

  // Split into words, tracking the global character index for stagger timing
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <p
      ref={ref}
      aria-label={text}
      className={`${styles.wrapper} ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordStartIndex = globalCharIndex;
        globalCharIndex += word.length + 1; // +1 accounts for the space

        return (
          // whitespace-nowrap prevents the browser from breaking mid-word
          <span
            key={wordIndex}
            className={styles.word}
            // Small right margin replaces the space character between words
            style={{ marginRight: wordIndex < words.length - 1 ? "0.3em" : 0 }}
          >
            {word.split("").map((char, charIndex) => {
              const delay = initialDelayMs + (wordStartIndex + charIndex) * staggerMs;
              return (
                <span
                  key={charIndex}
                  aria-hidden="true"
                  className={styles.char}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    filter: isVisible ? "blur(0px)" : "blur(6px)",
                    transform: isVisible ? "translateY(0)" : "translateY(6px)",
                    transition: isVisible
                      ? `opacity 0.9s ease ${delay}ms,
                         filter 0.9s ease ${delay}ms,
                         transform 0.7s ease ${delay}ms`
                      : "none",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default SmokeText;
