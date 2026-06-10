"use client";

import { VideoFrameProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoFrame.module.css";

const VideoFrame = ({ src }: VideoFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const preconnectedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preconnectObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !preconnectedRef.current) {
          preconnectedRef.current = true;
          const domains = [
            "https://www.youtube.com",
            "https://www.youtube-nocookie.com",
            "https://i.ytimg.com",
          ];
          domains.forEach((href) => {
            if (
              !document.querySelector(`link[rel="preconnect"][href="${href}"]`)
            ) {
              const link = document.createElement("link");
              link.rel = "preconnect";
              link.href = href;
              link.crossOrigin = "anonymous";
              document.head.appendChild(link);
            }
          });
          preconnectObserver.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          visibilityObserver.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.1 },
    );

    preconnectObserver.observe(container);
    visibilityObserver.observe(container);

    return () => {
      preconnectObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  // Garantiza autoplay + mute en la URL sin importar lo que venga en src
  const finalSrc = (() => {
    try {
      const url = new URL(src);
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("mute", "1");
      url.searchParams.set("playsinline", "1");
      url.searchParams.set("rel", "0");
      return url.toString();
    } catch {
      return src;
    }
  })();

  return (
    <>
      <div
        ref={containerRef}
        className={styles.container}>
        <div
            className={`${styles.loadingOverlay} ${isVisible ? styles.loadingHidden : styles.loadingVisible}`}
            >

          <div className={styles.spinner} />
        </div>

        {/* iframe — solo se monta cuando el componente entra al viewport */}
        {isVisible && (
          <iframe
            src={finalSrc}
            title="Magic Marble Foundation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
    </>
  );
};

export default VideoFrame;
