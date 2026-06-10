import { getAllPaddyField, getPortalPaddyFieldById } from "@/client";
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
  const paddyFields = await getAllPaddyField();
  if (!paddyFields) return [];
  return paddyFields.map((p) => ({
    id: p._id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getPortalPaddyFieldById(id);
  if (!data || data.length === 0) {
    return { title: "Paddy Field Not Found" };
  }
  const paddy = data[0];
  return {
    title: `${paddy.title} | Paddy Field`,
    description: paddy.description || "Learn more about this paddy field.",
    openGraph: {
      title: paddy.title,
      description: paddy.description || undefined,
      images: paddy.mainImage ? [paddy.mainImage] : undefined,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function PaddyFieldDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPortalPaddyFieldById(id);

  if (!data || data.length === 0) {
    return notFound();
  }

  const paddy = data[0];

  const formattedDate = new Date(paddy._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const images = [];
  if (paddy.mainImage) images.push({ src: paddy.mainImage, alt: `${paddy.title} - Image 1`, hotSpot: paddy.hotSpot });
  if (paddy.secondImage) images.push({ src: paddy.secondImage, alt: `${paddy.title} - Image 2`, hotSpot: paddy.hotSpotSecond });
  if (paddy.thirdImage) images.push({ src: paddy.thirdImage, alt: `${paddy.title} - Image 3`, hotSpot: paddy.hotSpotThird });
  if (paddy.fourthImage) images.push({ src: paddy.fourthImage, alt: `${paddy.title} - Image 4`, hotSpot: paddy.hotSpotFourth });

  return (
    <div className={styles.page}>
      {/* Editorial Header */}
      <div className={styles.hero}>
        {/* Subtle noise texture */}
        <div className={styles.noiseOverlay} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <Container>
          <div className={styles.heroInner}>
            {paddy.topPick && (
               <span className={styles.topPickBadge}>
                 Editor&apos;s Top Pick
               </span>
            )}
            <h1 className={`${playfair.className} ${styles.heroTitle}`}>
              {paddy.title}
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
          {paddy.description && (
            <p className={`${playfair.className} ${styles.description}`}>
              &ldquo;{paddy.description}&rdquo;
            </p>
          )}

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerDots}>•••</span>
          </div>

          {/* Content */}
          {paddy.contenido && (
            <div className={styles.content}>
              <PortableText value={paddy.contenido as any} />
            </div>
          )}

          {/* Video */}
          {paddy.youtubeLink && (
            <div className={styles.videoWrapper}>
              <iframe
                src={paddy.youtubeLink.replace("watch?v=", "embed/")}
                title={paddy.title}
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
