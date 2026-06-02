import { getAllDiaries, getDiaryById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const revalidate = 3600;

// Pre-generate all diary detail pages at build time
export async function generateStaticParams() {
  const diaries = await getAllDiaries();
  if (!diaries) return [];
  return diaries.map((diary) => ({
    id: diary._id,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const diaryData = await getDiaryById(id);
  if (!diaryData || diaryData.length === 0) {
    return { title: "Diary Not Found" };
  }
  const diary = diaryData[0];
  return {
    title: `${diary.title} | Magic Diaries`,
    description: diary.description || "Read this diary entry from the Magic Marble Foundation.",
    openGraph: {
      title: diary.title,
      description: diary.description || undefined,
      images: diary.mainImage ? [diary.mainImage] : undefined,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function DiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const diaryData = await getDiaryById(id);

  if (!diaryData || diaryData.length === 0) {
    return notFound();
  }

  const diary = diaryData[0];

  // The diaryByIdQuery returns "hotSpot" (not "hotSpotMain")
  const hotSpot = (diary as any).hotSpot ?? diary.hotSpotMain;
  const x = (hotSpot?.x ?? 0.5) * 100;
  const y = (hotSpot?.y ?? 0.5) * 100;

  const formattedDate = new Date(diary._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
      <div className={styles.outerWrapper}>
        {/* Title */}
        <h1 className={styles.pageTitle}>
          {diary.title}
        </h1>

        {/* Two-column layout: Image | Separator | Content */}
        <div className={styles.layout}>
          {/* Image column + back link */}
          {diary.mainImage && (
            <div className={styles.imageColumnWrapper} style={{ flex: '0 0 45%' }}>
              <div className={styles.imageCol} style={{ width: '100%' }}>
                <Image
                  src={diary.mainImage}
                  alt={diary.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className={styles.image}
                  style={{ objectPosition: `${x}% ${y}%` }}
                  priority
                />
              </div>
            </div>
          )}

          {/* Vertical separator (desktop only) */}
          {diary.mainImage && <div className={styles.separator} />}

          {/* Content column */}
          <div className={styles.contentCol}>
            {/* Author + Date meta */}
            <div className={styles.meta}>
              {diary.authorImage && (
                <div className={styles.authorAvatar}>
                  <Image
                    src={diary.authorImage}
                    alt={diary.author || "Author"}
                    fill
                    sizes="40px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              {diary.author && (
                <span className={styles.authorName}>
                  {diary.author}
                </span>
              )}
              {diary.author && (
                <span className={styles.dot} aria-hidden="true" />
              )}
              <span className={styles.dateText}>{formattedDate}</span>
            </div>

            {/* Horizontal separator (mobile only — between image and content) */}
            <div className={styles.mobileSep} />

            {/* Description */}
            {diary.description && (
              <p className={styles.description}>
                {diary.description}
              </p>
            )}

            {/* Portable Text content */}
            {diary.contenido && (
              <div className={styles.portableText}>
                <PortableText value={diary.contenido as any} />
              </div>
            )}

            <Link
              href="/diaries"
              className={styles.backLink}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Diaries
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
