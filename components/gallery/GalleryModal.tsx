"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import styles from "./GalleryModal.module.css";

type GalleryModalProps = {
  children: ReactNode;
};

export default function GalleryModal({ children }: GalleryModalProps) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onDismiss]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onDismiss}
        aria-label="Close gallery preview"
      />
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDismiss}
          className={styles.closeButton}
          aria-label="Close"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    </div>
  );
}
