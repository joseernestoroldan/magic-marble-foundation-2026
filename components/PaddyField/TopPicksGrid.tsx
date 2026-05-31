"use client";

import { portalPaddyFieldType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import styles from "./TopPicksGrid.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

interface TopPicksGridProps {
  topPicks: portalPaddyFieldType[];
}

export default function TopPicksGrid({ topPicks }: TopPicksGridProps) {
  if (!topPicks || topPicks.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.bgNoise} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Curated Selection</span>
          <h2 className={`${playfair.className} ${styles.title}`}>
            Editor&apos;s Top Picks
          </h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.grid}>
          {topPicks.map((pick, index) => {
            const x = (pick.hotSpot?.x ?? 0.5) * 100;
            const y = (pick.hotSpot?.y ?? 0.5) * 100;
            
            return (
              <Link
                key={pick._id}
                href={`/paddyfield/paddy/${pick._id}`}
                className={styles.card}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={styles.imageWrap}>
                  {pick.mainImage ? (
                    <Image
                      src={pick.mainImage}
                      alt={pick.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.image}
                      style={{ objectPosition: `${x}% ${y}%` }}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder} />
                  )}
                  
                  <div className={styles.badgeLabel}>
                    Top Pick
                  </div>
                </div>
                
                <div className={styles.body}>
                  <div className={styles.bodyDivider}></div>
                  
                  <h3 className={`${playfair.className} ${styles.cardTitle}`}>
                    {pick.title}
                  </h3>
                  
                  {pick.description && (
                    <p className={styles.description}>
                      {pick.description}
                    </p>
                  )}
                  
                  <div className={styles.footer}>
                    <span className={styles.cta}>
                      Read Article
                    </span>
                    <span className={styles.arrowCircle}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
