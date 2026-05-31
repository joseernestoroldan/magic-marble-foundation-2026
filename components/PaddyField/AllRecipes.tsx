"use client";

import { recipesType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import styles from "./AllRecipes.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface AllRecipesProps {
  recipes: recipesType[];
}

export default function AllRecipes({ recipes }: AllRecipesProps) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.badge}>Complete Cookbook</span>
          <h1 className={`${playfair.className} ${styles.title}`}>
            Recipes Collection
          </h1>
          <p className={styles.subtitle}>
            Browse our entire collection of nourishing, wholesome recipes crafted from the freshest ingredients.
          </p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          {recipes.map((recipe, index) => {
            const x = (recipe.hotSpot?.x ?? 0.5) * 100;
            const y = (recipe.hotSpot?.y ?? 0.5) * 100;
            const formattedDate = new Date(recipe._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <Link
                key={recipe._id}
                href={`/paddyfield/recipes/${recipe._id}`}
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  {recipe.mainImage ? (
                    <Image
                      src={recipe.mainImage}
                      alt={recipe.title}
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
                  {recipe.title}
                </h3>
                
                {recipe.description && (
                  <p className={styles.description}>
                    {recipe.description}
                  </p>
                )}
                
                <span className={styles.cta}>
                  View Recipe
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
