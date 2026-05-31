import { galleryType } from "@/clientTypes";
import Image from "next/image";
import { getGalleryDisplayDate } from "./formatGalleryDate";
import GalleryModalDetail from "./GalleryModalDetail";
import { getSanityImageFrame } from "./sanityImageFrame";
import styles from "./GalleryDetail.module.css";

type GalleryDetailProps = {
  item: galleryType;
  variant?: "modal" | "page";
};

export default function GalleryDetail({ item, variant = "modal" }: GalleryDetailProps) {
  const displayDate = getGalleryDisplayDate(item);
  const title = item.title ?? "Untitled";
  const { objectPosition, aspectRatio } = getSanityImageFrame(item.hotSpot, item.crop);

  if (variant === "modal") {
    return (
      <GalleryModalDetail
        title={title}
        displayDate={displayDate}
        dateTime={item.publishedAt ?? item._createdAt}
        description={item.description}
        mainImage={item.mainImage}
        hotSpot={item.hotSpot}
        crop={item.crop}
      />
    );
  }

  return (
    <div className={styles.layout}>
      {item.mainImage && (
        <div
          className={styles.imageWrapper}
          style={{ aspectRatio }}
        >
          <Image
            src={item.mainImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
            style={{ objectPosition }}
            priority
          />
        </div>
      )}

      <GalleryDetailContent
        title={title}
        displayDate={displayDate}
        dateTime={item.publishedAt ?? item._createdAt}
        description={item.description}
      />
    </div>
  );
}

type ContentProps = {
  title: string;
  displayDate: string | null;
  dateTime: string;
  description: string | null;
};

function GalleryDetailContent({ title, displayDate, dateTime, description }: ContentProps) {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>

      {displayDate && (
        <time className={styles.date} dateTime={dateTime}>
          {displayDate}
        </time>
      )}

      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
