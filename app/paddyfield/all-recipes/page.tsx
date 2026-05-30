import { getAllRecipes } from "@/client";
import { recipesType } from "@/clientTypes";
import AllRecipes from "@/components/PaddyField/AllRecipes";
import Link from "next/link";

export const metadata = {
  title: "All Recipes | Magic Marble Foundation",
  description: "Browse our entire collection of nourishing recipes.",
};

import styles from "./page.module.css";

export default async function AllRecipesPage() {
  const recipes: recipesType[] = await getAllRecipes() || [];
  
  const sortedRecipes = recipes.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());

  return (
    <div className={styles.wrapper}>
      <div className={styles.navWrapper}>
        <Link
          href="/paddyfield"
          className={styles.backLink}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portal
        </Link>
      </div>
      
      <AllRecipes recipes={sortedRecipes} />
    </div>
  );
}
