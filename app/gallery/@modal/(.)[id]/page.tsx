import { getGalleryById } from "@/client";
import GalleryDetail from "@/components/Gallery/GalleryDetail";
import GalleryModal from "@/components/Gallery/GalleryModal";
import { notFound } from "next/navigation";

import styles from "./page.module.css";

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
    <div className={styles.wrapper}>
      <GalleryModal>
        <GalleryDetail item={item} variant="modal" />
      </GalleryModal>
    </div>
  );
}
