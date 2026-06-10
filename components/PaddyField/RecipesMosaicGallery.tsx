"use client";

import { recipesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Playfair_Display } from "next/font/google";
import styles from "./RecipesMosaicGallery.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface RecipesMosaicGalleryProps {
  recipes: recipesType[];
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
    default:
      return [
        { colSpan: 2, rowSpan: 2 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 1, rowSpan: 1 },
        { colSpan: 3, rowSpan: 1 },
      ];
  }
}

interface MosaicCardProps {
  recipe: recipesType;
  span: CellSpan;
  priority: boolean;
  animDelay: number;
}

function MosaicCard({ recipe, span, priority, animDelay }: MosaicCardProps) {
  const x = (recipe.hotSpot?.x ?? 0.5) * 100;
  const y = (recipe.hotSpot?.y ?? 0.5) * 100;

  return (
    <Link
      href={`/paddyfield/recipes/${recipe._id}`}
      className={styles.card}
      style={{
        gridColumn: `span ${span.colSpan}`,
        gridRow: `span ${span.rowSpan}`,
        animationDelay: `${animDelay}ms`,
      }}
      aria-label={`View recipe: ${recipe.title}`}
    >
      {recipe.mainImage ? (
        <Image
          src={recipe.mainImage}
          alt={recipe.title}
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
          {recipe.title}
        </p>
      </div>

      <div className={styles.hoverOverlay}>
        <h3 className={`${playfair.className} ${styles.hoverTitle}`}>
          {recipe.title}
        </h3>

        {recipe.description && (
          <p className={styles.hoverDescription}>
            {recipe.description}
          </p>
        )}

        <div className={styles.cta}>
          <span className={styles.ctaLine}>Read recipe</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.ctaArrow}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function RecipesMosaicGallery({
  recipes,
}: RecipesMosaicGalleryProps) {
  const items = useMemo(() => recipes.slice(0, 4), [recipes]);
  const layout = useMemo(() => getMosaicLayout(items.length), [items.length]);

  if (!items.length) return null;

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${playfair.className} ${styles.headerTitle}`}>
          Latest Recipes
        </h2>
        <Link href="/paddyfield/all-recipes" className={styles.archiveLink}>
          View Cookbook <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {items.map((recipe, index) => (
          <MosaicCard
            key={recipe._id}
            recipe={recipe}
            span={layout[index]}
            priority={index === 0}
            animDelay={index * 150}
          />
        ))}
      </div>
      
      <div className={styles.mobileLink}>
        <Link href="/paddyfield/all-recipes" className={styles.mobileLinkInner}>
          View Complete Cookbook
        </Link>
      </div>
    </div>
  );
}
