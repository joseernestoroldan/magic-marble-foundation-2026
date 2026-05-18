import { galleryType } from "@/clientTypes";
import Image from "next/image";
import Link from "next/link";
import { getGalleryDisplayDate } from "./formatGalleryDate";
import { getSanityObjectPosition } from "./sanityImageFrame";

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
      className="gallery-card group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      aria-label={`View gallery item: ${title}`}
    >
      <article className="relative aspect-[4/3] w-full overflow-hidden rounded-[5px] bg-slate-900 shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-cyan-900/20">
        {item.mainImage ? (
          <Image
            src={item.mainImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition }}
            priority={priority}
          />
        ) : (
          <ImagePlaceholder />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{title}</h3>
          {displayDate && (
            <time
              className="mt-1 block text-xs text-cyan-400 sm:text-sm"
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
    <div
      className="absolute inset-0 bg-gradient-to-br from-cyan-800 to-slate-900"
      aria-hidden
    />
  );
}
