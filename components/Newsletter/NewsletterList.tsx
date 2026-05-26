"use client";

import { chimpType } from "@/clientTypes";
import Image from "next/image";
import { useMemo } from "react";

interface NewsletterListProps {
  newsletters: chimpType[];
}

export default function NewsletterList({ newsletters }: NewsletterListProps) {
  const items = useMemo(
    () =>
      newsletters.map((nl) => ({
        ...nl,
        formattedDate: nl.publishedAt
          ? new Date(nl.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : new Date(nl._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
      })),
    [newsletters]
  );

  if (!items.length) return null;

  return (
    <>
      <style>{`
        .nl-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .nl-card {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          background: linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%);
          border: 1px solid rgba(8, 145, 178, 0.1);
          border-radius: 5px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .nl-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(8, 145, 178, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: rgba(8, 145, 178, 0.3);
        }

        .nl-card:focus-visible {
          outline: 2px solid #0891b2;
          outline-offset: 2px;
        }

        .nl-image-wrapper {
          position: relative;
          flex: 0 0 200px;
          min-height: 160px;
          overflow: hidden;
        }

        .nl-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .nl-card:hover .nl-image {
          transform: scale(1.06);
        }

        .nl-image-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0e7490 0%, #155e75 60%, #083344 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nl-image-placeholder svg {
          width: 48px;
          height: 48px;
          color: rgba(255, 255, 255, 0.3);
        }

        .nl-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          padding: 24px 28px;
          min-width: 0;
        }

        .nl-date {
          font-size: 0.78rem;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .nl-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          transition: color 0.3s ease;
        }

        .nl-card:hover .nl-title {
          color: #0891b2;
        }

        .nl-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .nl-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #0891b2;
          letter-spacing: 0.02em;
          margin-top: 4px;
          transition: gap 0.3s ease;
        }

        .nl-card:hover .nl-cta {
          gap: 10px;
        }

        .nl-cta svg {
          transition: transform 0.3s ease;
        }

        .nl-card:hover .nl-cta svg {
          transform: translateX(3px);
        }

        /* Responsive: stack vertically on smaller screens */
        @media (max-width: 640px) {
          .nl-card {
            flex-direction: column;
          }

          .nl-image-wrapper {
            flex: none;
            width: 100%;
            height: 200px;
            min-height: unset;
          }

          .nl-body {
            padding: 20px 22px;
          }

          .nl-title {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="nl-list">
        {items.map((nl) => {
          const x = (nl.hotSpot?.x ?? 0.5) * 100;
          const y = (nl.hotSpot?.y ?? 0.5) * 100;

          return (
            <a
              key={nl._id}
              href={nl.chimpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nl-card"
              aria-label={`Read newsletter: ${nl.title || "Untitled"}`}
            >
              {/* Image */}
              <div className="nl-image-wrapper">
                {nl.mainImage ? (
                  <Image
                    src={nl.mainImage}
                    alt={nl.title || "Newsletter"}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="nl-image"
                    style={{ objectPosition: `${x}% ${y}%` }}
                    loading="lazy"
                  />
                ) : (
                  <div className="nl-image-placeholder">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 8l10 6 10-6" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="nl-body">
                <span className="nl-date">{nl.formattedDate}</span>
                <h3 className="nl-title">{nl.title || "Untitled Newsletter"}</h3>
                {nl.description && (
                  <p className="nl-desc">{nl.description}</p>
                )}
                <span className="nl-cta">
                  Read Newsletter
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
