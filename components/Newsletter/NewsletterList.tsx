"use client";

import { chimpType } from "@/clientTypes";
import Image from "next/image";
import { useMemo } from "react";
import styles from "./NewsletterList.module.css";

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
    <div className={styles.list}>
      {items.map((nl) => {
        const x = (nl.hotSpot?.x ?? 0.5) * 100;
        const y = (nl.hotSpot?.y ?? 0.5) * 100;

        return (
          <a
            key={nl._id}
            href={nl.chimpLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            aria-label={`Read newsletter: ${nl.title || "Untitled"}`}
          >
            <div className={styles.imageWrap}>
              {nl.mainImage ? (
                <Image
                  src={nl.mainImage}
                  alt={nl.title || "Newsletter"}
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className={styles.image}
                  style={{ objectPosition: `${x}% ${y}%` }}
                  loading="lazy"
                />
              ) : (
                <div className={styles.imagePlaceholder}>
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

            <div className={styles.body}>
              <span className={styles.date}>{nl.formattedDate}</span>
              <h3 className={styles.cardTitle}>{nl.title || "Untitled Newsletter"}</h3>
              {nl.description && (
                <p className={styles.description}>{nl.description}</p>
              )}
              <span className={styles.cta}>
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
  );
}
