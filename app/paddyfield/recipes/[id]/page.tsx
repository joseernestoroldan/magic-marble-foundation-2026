import { getAllRecipes, getRecipeById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import ImageGallery from "@/components/PaddyField/ImageGallery";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import styles from "./page.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const revalidate = 3600;

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  if (!recipes) return [];
  return recipes.map((r) => ({
    id: r._id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getRecipeById(id);
  if (!data || data.length === 0) {
    return { title: "Recipe Not Found" };
  }
  const recipe = data[0];
  return {
    title: `${recipe.title} | Recipes`,
    description: recipe.description || "Learn more about this recipe.",
    openGraph: {
      title: recipe.title,
      description: recipe.description || undefined,
      images: recipe.mainImage ? [recipe.mainImage] : undefined,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getRecipeById(id);

  if (!data || data.length === 0) {
    return notFound();
  }

  const recipe = data[0];

  const formattedDate = new Date(recipe._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const images = [];
  if (recipe.mainImage) images.push({ src: recipe.mainImage, alt: `${recipe.title} - Image 1`, hotSpot: recipe.hotSpot });
  if (recipe.secondImage) images.push({ src: recipe.secondImage, alt: `${recipe.title} - Image 2`, hotSpot: recipe.hotSpotSecond });
  if (recipe.thirdImage) images.push({ src: recipe.thirdImage, alt: `${recipe.title} - Image 3`, hotSpot: recipe.hotSpotThird });
  if (recipe.fourthImage) images.push({ src: recipe.fourthImage, alt: `${recipe.title} - Image 4`, hotSpot: recipe.hotSpotFourth });

  return (
    <div className={styles.page}>
      {/* Editorial Header */}
      <div className={styles.hero}>
        {/* Subtle noise texture */}
        <div className={styles.noiseOverlay} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <Container>
          <div className={styles.heroInner}>
            <span className={styles.recipeBadge}>
              Field Recipe
            </span>
            <h1 className={`${playfair.className} ${styles.heroTitle}`}>
              {recipe.title}
            </h1>
            <div className={styles.heroDivider}></div>
            <p className={styles.heroDate}>
              {formattedDate}
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.contentWrapper}>
          
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className={styles.galleryWrapper}>
              <ImageGallery images={images} />
            </div>
          )}

          {/* Description (Editorial Intro) */}
          {recipe.description && (
            <p className={`${playfair.className} ${styles.description}`}>
              &ldquo;{recipe.description}&rdquo;
            </p>
          )}

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerDots}>•••</span>
          </div>

          {/* Content */}
          {recipe.contenido && (
            <div className={styles.content}>
              <PortableText value={recipe.contenido as any} />
            </div>
          )}

          {/* Video */}
          {recipe.youtubeLink && (
            <div className={styles.videoWrapper}>
              <iframe
                src={recipe.youtubeLink.replace("watch?v=", "embed/")}
                title={recipe.title}
                className={styles.iframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Back Link */}
          <div className={styles.backSection}>
            <Link
              href="/paddyfield"
              className={styles.backLink}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Return to Portal
            </Link>
          </div>

        </div>
      </Container>
    </div>
  );
}
