"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default bg-black/80"
        onClick={onDismiss}
        aria-label="Close gallery preview"
      />
      <div
        className="relative z-10 flex h-[min(94vh,100%)] w-[min(96vw,100%)] flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-gray-800/90 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
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
        <div className="h-full min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
