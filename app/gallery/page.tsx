import { getAllGallery } from "@/client";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Magic Marble Foundation",
  description:
    "Explore photos and moments from the Magic Marble Foundation community.",
};

export default async function GalleryPage() {
  const items = await getAllGallery();

  return (
    <div className="flex w-full flex-col items-center gap-12 pt-12">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">Gallery</h2>

      {items && items.length > 0 ?
        <GalleryGrid items={items} />
      : <p className="px-4 py-12 text-center text-slate-400">
          No gallery items available yet.
        </p>
      }
    </div>
  );
}
