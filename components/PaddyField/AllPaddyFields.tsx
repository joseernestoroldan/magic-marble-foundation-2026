"use client";

import { portalPaddyFieldType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import styles from "./AllPaddyFields.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface AllPaddyFieldsProps {
  paddyFields: portalPaddyFieldType[];
}

export default function AllPaddyFields({ paddyFields }: AllPaddyFieldsProps) {
  if (!paddyFields || paddyFields.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.badge}>Complete Archive</span>
          <h1 className={`${playfair.className} ${styles.title}`}>
            Paddy Field Stories
          </h1>
          <p className={styles.subtitle}>
            Explore our entire collection of field stories, updates, and deep dives into the heart of our foundation&apos;s work.
          </p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {paddyFields.map((paddy, index) => {
            const x = (paddy.hotSpot?.x ?? 0.5) * 100;
            const y = (paddy.hotSpot?.y ?? 0.5) * 100;
            const formattedDate = new Date(paddy._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <Link
                key={paddy._id}
                href={`/paddyfield/paddy/${paddy._id}`}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  {paddy.mainImage ? (
                    <Image
                      src={paddy.mainImage}
                      alt={paddy.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.image}
                      style={{ objectPosition: `${x}% ${y}%` }}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                  
                  <div className={styles.hoverOverlay} />
                </div>
                
                <span className={styles.date}>
                  {formattedDate}
                </span>
                
                <h3 className={`${playfair.className} ${styles.cardTitle}`}>
                  {paddy.title}
                </h3>
                
                {paddy.description && (
                  <p className={styles.description}>
                    {paddy.description}
                  </p>
                )}
                
                <span className={styles.cta}>
                  Read Article
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
