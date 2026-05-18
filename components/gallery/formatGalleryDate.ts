import { galleryType } from "@/clientTypes";

export function getGalleryDisplayDate(item: Pick<galleryType, "publishedAt" | "_createdAt">): string | null {
  const raw = item.publishedAt ?? item._createdAt;
  if (!raw) return null;

  return new Date(raw).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
