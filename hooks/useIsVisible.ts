import { useEffect, useRef, useState, type RefObject } from "react";

export function useIsVisible<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): { ref: RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, optionsRef.current);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
