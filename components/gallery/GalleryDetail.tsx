import { galleryType } from "@/clientTypes";
import Image from "next/image";
import { getGalleryDisplayDate } from "./formatGalleryDate";
import GalleryModalDetail from "./GalleryModalDetail";
import { getSanityImageFrame } from "./sanityImageFrame";

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
    <div className="flex w-full flex-col gap-8 md:flex-row md:gap-12">
      {item.mainImage && (
        <div
          className="relative w-full overflow-hidden rounded-xl md:w-1/2 md:max-w-xl"
          style={{ aspectRatio }}
        >
          <Image
            src={item.mainImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
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
    <div className="flex flex-1 flex-col justify-center gap-5">
      <h2 className="text-3xl font-bold text-cyan-600 md:text-4xl">{title}</h2>

      {displayDate && (
        <time className="text-sm font-medium text-slate-500" dateTime={dateTime}>
          {displayDate}
        </time>
      )}

      {description && (
        <p className="text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
      )}
    </div>
  );
}
