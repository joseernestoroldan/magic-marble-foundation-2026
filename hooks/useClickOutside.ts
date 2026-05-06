import { useEffect, useRef, type RefObject } from "react";

/**
 * Custom hook that detects clicks outside of a referenced element
 * and executes a callback when it happens.
 *
 * @param onClickOutside - Callback function to execute when a click outside is detected.
 * @returns A ref object to attach to the container element.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  onClickOutside: () => void
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
}
