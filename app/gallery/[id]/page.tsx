import { getAllGallery, getGalleryById } from "@/client";
import GalleryDetail from "@/components/Gallery/GalleryDetail";
import Container from "@/components/Layouts/Container/Container";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const items = await getAllGallery();
  if (!items) return [];
  return items.map((item) => ({ id: item._id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getGalleryById(id);

  if (!data || data.length === 0) {
    return { title: "Gallery Item Not Found" };
  }

  const item = data[0];
  return {
    title: `${item.title ?? "Gallery"} | Magic Marble Foundation`,
    description:
      item.description ??
      "View this gallery item from the Magic Marble Foundation.",
    openGraph: {
      title: item.title ?? undefined,
      description: item.description ?? undefined,
      images: item.mainImage ? [item.mainImage] : undefined,
      type: "article",
    },
  };
}

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getGalleryById(id);

  if (!data || data.length === 0) {
    notFound();
  }

  const item = data[0];

  return (
    <Container>
      <div className="flex w-full flex-col gap-10 pb-16 pt-24">
        <GalleryDetail item={item} variant="page" />
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-800">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </Link>
      </div>
    </Container>
  );
}
