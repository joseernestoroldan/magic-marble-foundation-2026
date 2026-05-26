import { getAllDiaries, getDiaryById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <>
      <style>{`
        .diary-detail-layout {
          display: flex;
          flex-direction: row;
          gap: 0;
          width: 100%;
          min-height: 60vh;
          align-items: stretch;
        }

        .diary-detail-image-col {
          flex: 0 0 45%;
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 5px;
          align-self: flex-start;
        }

        .diary-detail-separator {
          flex: 0 0 1px;
          background: rgba(203, 213, 225, 0.35);
          margin: 0 32px;
          align-self: stretch;
        }

        .diary-detail-content-col {
          flex: 1 1 55%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .diary-detail-layout {
            flex-direction: column;
            gap: 32px;
          }

          .diary-detail-image-col {
            flex: none;
            width: 100%;
            aspect-ratio: 3 / 4;
            max-height: 500px;
          }

          .diary-detail-separator {
            display: none;
          }

          .diary-detail-content-col {
            flex: none;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .diary-detail-image-col {
            max-height: 400px;
            border-radius: 5px;
          }
        }

        .diary-detail-img {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .diary-detail-image-col:hover .diary-detail-img {
          transform: scale(1.03);
        }

        .diary-detail-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .diary-detail-author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          border: 2px solid rgba(8, 145, 178, 0.4);
        }

        .diary-detail-author-name {
          color: #0891b2;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .diary-detail-date {
          color: #94a3b8;
          font-size: 0.82rem;
        }

        .diary-detail-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #94a3b8;
          flex-shrink: 0;
        }

        .diary-portable-text {
          font-size: 1.08rem;
          line-height: 1.8;
          color: #374151;
        }

        .diary-portable-text p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }

        .diary-portable-text h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #0891b2;
        }

        .diary-portable-text h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.6rem;
          color: #0891b2;
        }

        .diary-portable-text ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .diary-portable-text ul li {
          margin-bottom: 0.4rem;
        }

        .diary-portable-text ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .diary-portable-text ol li {
          margin-bottom: 0.4rem;
        }

        .diary-portable-text blockquote {
          border-left: 4px solid #0891b2;
          padding-left: 1rem;
          font-style: italic;
          margin: 1.5rem 0;
          color: #4b5563;
        }

        .diary-portable-text a {
          color: #0891b2;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .diary-portable-text a:hover {
          color: #155e75;
        }

        .diary-portable-text strong {
          font-weight: 700;
        }

        .diary-portable-text em {
          font-style: italic;
        }

        /* Mobile separator — horizontal line shown only on stacked layout */
        .diary-detail-mobile-sep {
          display: none;
          width: 100%;
          height: 1px;
          background: rgba(203, 213, 225, 0.35);
        }

        @media (max-width: 900px) {
          .diary-detail-mobile-sep {
            display: block;
          }
        }
      `}</style>

      <Container>
        <div className="flex flex-col items-center w-full gap-10 pt-24 pb-16">
          {/* Title */}
          <h1 className="text-cyan-600 font-bold text-3xl md:text-4xl text-center capitalize max-w-4xl">
            {diary.title}
          </h1>

          {/* Two-column layout: Image | Separator | Content */}
          <div className="diary-detail-layout">
            {/* Image column + back link */}
            {diary.mainImage && (
              <div className="flex flex-col items-start" style={{ flex: '0 0 45%' }}>
                <div className="diary-detail-image-col" style={{ width: '100%' }}>
                  <Image
                    src={diary.mainImage}
                    alt={diary.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    className="diary-detail-img"
                    style={{ objectPosition: `${x}% ${y}%` }}
                    priority
                  />
                </div>
              </div>
            )}

            {/* Vertical separator (desktop only) */}
            {diary.mainImage && <div className="diary-detail-separator" />}

            {/* Content column */}
            <div className="diary-detail-content-col">
              {/* Author + Date meta */}
              <div className="diary-detail-meta">
                {diary.authorImage && (
                  <div className="diary-detail-author-avatar">
                    <Image
                      src={diary.authorImage}
                      alt={diary.author || "Author"}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                )}
                {diary.author && (
                  <span className="diary-detail-author-name">
                    {diary.author}
                  </span>
                )}
                {diary.author && (
                  <span className="diary-detail-dot" aria-hidden="true" />
                )}
                <span className="diary-detail-date">{formattedDate}</span>
              </div>

              {/* Horizontal separator (mobile only — between image and content) */}
              <div className="diary-detail-mobile-sep" />

              {/* Description */}
              {diary.description && (
                <p className="text-slate-500 text-base md:text-lg leading-relaxed italic">
                  {diary.description}
                </p>
              )}

              {/* Portable Text content */}
              {diary.contenido && (
                <div className="diary-portable-text">
                  <PortableText value={diary.contenido as any} />
                </div>
              )}

              <Link
                href="/diaries"
                className="inline-flex items-center gap-2 mt-8 text-cyan-600 hover:text-cyan-800 font-semibold text-sm transition-colors duration-300"
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
    </>
  );
}
