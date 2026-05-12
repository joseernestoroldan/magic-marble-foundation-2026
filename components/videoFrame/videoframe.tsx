"use client";

import { VideoFrameProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";

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
      <style>{`
        @keyframes vf-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes vf-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-gray-800 overflow-hidden">
        <div
          style={{
            background:
              "linear-gradient(135deg, #020c1b 0%, #0a1a2e 50%, #020c1b 100%)",
            transition: "opacity 0.6s ease",
          }}
            className=  {`absolute inset-0 flex items-center justify-center z-10 pointer-events-none ${isVisible ? "opacity-0" : "opacity-100"} transition-all duration-500 ease-linear`}
            >

          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "2px solid rgba(34, 211, 238, 0.15)",
              borderTopColor: "#22d3ee",
              animation: "vf-spin 1s linear infinite",
            }}
          />
        </div>

        {/* iframe — solo se monta cuando el componente entra al viewport */}
        {isVisible && (
          <iframe
            src={finalSrc}
            title="Magic Marble Foundation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              animation: "vf-fadein 0.8s ease forwards",
              zIndex: 2,
            }}
          />
        )}
      </div>
    </>
  );
};

export default VideoFrame;
