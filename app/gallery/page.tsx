import { getAllGallery } from "@/client";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Magic Marble Foundation",
  description:
    "Explore photos and moments from the Magic Marble Foundation community.",
};

import styles from "./page.module.css";

export default async function GalleryPage() {
  const items = await getAllGallery();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Gallery</h2>

      {items && items.length > 0 ?
        <GalleryGrid items={items} />
      : <p className={styles.emptyState}>
          No gallery items available yet.
        </p>
      }
    </div>
  );
}
