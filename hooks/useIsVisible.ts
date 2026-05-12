import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Custom hook that uses the Intersection Observer API to detect
 * when a referenced element enters the browser viewport.
 *
 * @param options - Optional IntersectionObserver configuration:
 *   - `root`: The element used as the viewport (defaults to browser viewport).
 *   - `rootMargin`: Margin around the root, similar to CSS margin (defaults to "0px").
 *   - `threshold`: Fraction of the element that must be visible to trigger (0–1, defaults to 0).
 *
 * @returns An object containing:
 *   - `ref`: A ref to attach to the target DOM element.
 *   - `isVisible`: `true` once the element has entered the viewport.
 *
 * @example
 * const { ref, isVisible } = useIsVisible<HTMLDivElement>({ threshold: 0.2 });
 * return <div ref={ref} className={isVisible ? "animate-in" : "opacity-0"} />;
 */
export function useIsVisible<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): { ref: RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Update visibility on every intersection change (enter & exit)
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}
