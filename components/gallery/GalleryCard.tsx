import { galleryType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { getGalleryDisplayDate } from "./formatGalleryDate";
import { getSanityObjectPosition } from "./sanityImageFrame";
import styles from "./GalleryCard.module.css";

type GalleryCardProps = {
  item: galleryType;
  priority?: boolean;
};

export default function GalleryCard({ item, priority = false }: GalleryCardProps) {
  const objectPosition = getSanityObjectPosition(item.hotSpot, item.crop);
  const displayDate = getGalleryDisplayDate(item);
  const title = item.title ?? "Untitled";

  return (
    <Link
      href={`/gallery/${item._id}`}
      scroll={false}
      className={styles.link}
      aria-label={`View gallery item: ${title}`}
    >
      <article className={styles.card}>
        {item.mainImage ? (
          <Image
            src={item.mainImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={styles.image}
            style={{ objectPosition }}
            priority={priority}
          />
        ) : (
          <ImagePlaceholder />
        )}

        <div className={styles.gradientOverlay} aria-hidden />
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{title}</h3>
          {displayDate && (
            <time
              className={styles.date}
              dateTime={item.publishedAt ?? item._createdAt}
            >
              {displayDate}
            </time>
          )}
        </div>
      </article>
    </Link>
  );
}

function ImagePlaceholder() {
  return (
    <div className={styles.placeholder} aria-hidden />
  );
}
