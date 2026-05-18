import { galleryType } from "@/clientTypes";
import GalleryCard from "./GalleryCard";

type GalleryGridProps = {
  items: galleryType[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  if (!items.length) return null;

  return (
    <div className="gallery-grid w-full grid grid-cols-1 gap-1 px-4 sm:grid-cols-2 sm:gap-2 sm:px-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <GalleryCard key={item._id} item={item} priority={index < 4} />
      ))}
    </div>
  );
}
