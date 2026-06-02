import { getAllPaddyField, getAllRecipes } from "@/client";
import { portalPaddyFieldType, recipesType } from "@/clientTypes";
import Container from "@/components/Layouts/Container/Container";
import PaddyFieldMosaicGallery from "@/components/PaddyField/PaddyFieldMosaicGallery";
import RecipesMosaicGallery from "@/components/PaddyField/RecipesMosaicGallery";
import TopPicksGrid from "@/components/PaddyField/TopPicksGrid";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import styles from "./page.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Portal Paddy Field | Magic Marble Foundation",
  description: "Discover our latest paddy fields and recipes.",
};

const PortalPaddyFieldPage = async () => {
  const [paddyfieldsResult, recipesResult] = await Promise.all([
    getAllPaddyField(),
    getAllRecipes(),
  ]);
  const paddyfields: portalPaddyFieldType[] = paddyfieldsResult ?? [];
  const recipes: recipesType[] = recipesResult ?? [];

  // Sort them if not already sorted by query
  const sortedPaddy = [...paddyfields].sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
  const sortedRecipes = [...recipes].sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());

  // Top picks
  const topPicks = sortedPaddy.filter(p => p.topPick);

  return (
    <div className={styles.page}>
      {/* Editorial Hero Header */}
      <div className={styles.hero}>
        {/* Subtle noise texture */}
        <div className={styles.noiseOverlay} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>
            Magic Marble Foundation
          </span>
          <h1 className={`${playfair.className} ${styles.heroTitle}`}>
            Paddy Field
          </h1>
          <p className={styles.heroSubtitle}>
            Explore our latest stories, nourishing recipes, and editor&apos;s top picks straight from the fields.
          </p>
          <div className={styles.heroDivider}></div>
        </div>
      </div>

      <Container>
        <div className={styles.content}>
          
          {/* Latest Paddy Fields Mosaic */}
          {sortedPaddy.length > 0 && (
            <section>
              <PaddyFieldMosaicGallery paddyFields={sortedPaddy} />
            </section>
          )}

          {/* Top Picks Grid (Breaks out of container for full width background) */}
          {topPicks.length > 0 && (
            <section className={styles.topPicksSection}>
              <TopPicksGrid topPicks={topPicks} />
            </section>
          )}

          {/* Latest Recipes Mosaic */}
          {sortedRecipes.length > 0 && (
            <section>
              <RecipesMosaicGallery recipes={sortedRecipes} />
            </section>
          )}

          {/* Editorial Footer Links */}
          <section className={styles.footerLinks}>
            <div className={styles.footerCard}>
              <h3 className={`${playfair.className} ${styles.footerCardTitle}`}>All Field Stories</h3>
              <p className={styles.footerCardText}>Dive deep into our complete archive of paddy field updates and stories.</p>
              <Link href="/paddyfield/all-paddyfields" className={styles.footerLink}>
                View Archive <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className={styles.footerCard}>
              <h3 className={`${playfair.className} ${styles.footerCardTitle}`}>Full Cookbook</h3>
              <p className={styles.footerCardText}>Browse our entire collection of nourishing recipes crafted from fresh ingredients.</p>
              <Link href="/paddyfield/all-recipes" className={styles.footerLink}>
                View Recipes <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
};

export default PortalPaddyFieldPage;
