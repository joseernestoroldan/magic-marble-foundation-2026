"use client";

import { portalPaddyFieldType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Playfair_Display } from "next/font/google";
import styles from "./PaddyFieldMosaicGallery.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface PaddyFieldMosaicGalleryProps {
  paddyFields: portalPaddyFieldType[];
}

type CellSpan = { colSpan: number; rowSpan: number };

function getMosaicLayout(count: number): CellSpan[] {
  switch (count) {
    case 1:
      return [{ colSpan: 3, rowSpan: 2 }];
    case 2:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 2 },
      ];
    case 3:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
      ];
    case 4:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 3, rowSpan: 1 },
      ];
    case 5:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 2, rowSpan: 1 },
      ];
    case 6:
    default:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
      ];
  }
}

interface MosaicCardProps {
  paddy: portalPaddyFieldType;
  span: CellSpan;
  priority: boolean;
  animDelay: number;
}

function MosaicCard({ paddy, span, priority, animDelay }: MosaicCardProps) {
  const x = (paddy.hotSpot?.x ?? 0.5) * 100;
  const y = (paddy.hotSpot?.y ?? 0.5) * 100;

  return (
    <Link
      href={`/paddyfield/paddy/${paddy._id}`}
      className={styles.card}
      style={{
        gridColumn: `span ${span.colSpan}`,
        gridRow: `span ${span.rowSpan}`,
        animationDelay: `${animDelay}ms`,
      }}
      aria-label={`Read paddy field: ${paddy.title}`}
    >
      {paddy.mainImage ? (
        <Image
          src={paddy.mainImage}
          alt={paddy.title}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          className={styles.cardImage}
          style={{ objectPosition: `${x}% ${y}%` }}
          priority={priority}
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      <div className={styles.baseOverlay}>
        <p className={`${playfair.className} ${styles.baseTitle}`}>
          {paddy.title}
        </p>
      </div>

      <div className={styles.hoverOverlay}>
        <h3 className={`${playfair.className} ${styles.hoverTitle}`}>
          {paddy.title}
        </h3>

        {paddy.description && (
          <p className={styles.hoverDescription}>
            {paddy.description}
          </p>
        )}

        <div className={styles.cta}>
          <span className={styles.ctaLine}>Read story</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.ctaArrow}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function PaddyFieldMosaicGallery({
  paddyFields,
}: PaddyFieldMosaicGalleryProps) {
  const items = useMemo(() => paddyFields.slice(0, 6), [paddyFields]);
  const layout = useMemo(() => getMosaicLayout(items.length), [items.length]);

  if (!items.length) return null;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${playfair.className} ${styles.headerTitle}`}>
          Latest Field Stories
        </h2>
        <Link href="/paddyfield/all-paddyfields" className={styles.archiveLink}>
          View Archive <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {items.map((paddy, index) => (
          <MosaicCard
            key={paddy._id}
            paddy={paddy}
            span={layout[index]}
            priority={index === 0}
            animDelay={index * 120}
          />
        ))}
      </div>
      
      <div className={styles.mobileLink}>
        <Link href="/paddyfield/all-paddyfields" className={styles.mobileLinkInner}>
          View Complete Archive
        </Link>
      </div>
    </div>
  );
}
