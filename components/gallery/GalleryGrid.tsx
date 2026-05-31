import { galleryType } from "@/clientTypes";
import GalleryCard from "./GalleryCard";
import styles from "./GalleryGrid.module.css";

type GalleryGridProps = {
  items: galleryType[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (!items.length) return null;

  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <GalleryCard key={item._id} item={item} priority={index < 4} />
      ))}
    </div>
  );
}
