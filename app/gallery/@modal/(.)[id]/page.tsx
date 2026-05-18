import { getGalleryById } from "@/client";
import GalleryDetail from "@/components/gallery/GalleryDetail";
import GalleryModal from "@/components/gallery/GalleryModal";
import { notFound } from "next/navigation";

export default async function GalleryPhotoModal({
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
    <GalleryModal>
      <GalleryDetail item={item} variant="modal" />
    </GalleryModal>
  );
}
