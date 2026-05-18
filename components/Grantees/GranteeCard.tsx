import { granteesType } from "@/clientTypes";
import { getSanityObjectPosition } from "@/components/gallery/sanityImageFrame";
import Image from "next/image";

const ICON_SIZE = 150;

type GranteeCardProps = {
  grantee: granteesType;
  priority?: boolean;
};

export default function GranteeCard({ grantee, priority = false }: GranteeCardProps) {
  const objectPosition = getSanityObjectPosition(grantee.hotSpot, grantee.crop);
  const name = grantee.name?.trim() || "Grantee";

  return (
    <article className="group flex w-[150px] flex-col items-center gap-3">
      <div
        className="relative h-[150px] w-[150px] shrink-0 overflow-hidden rounded-lg bg-slate-100 shadow-md ring-1 ring-slate-200/80 transition-shadow duration-300 group-hover:shadow-lg group-hover:ring-cyan-500/40"
        aria-label={name}
      >
        {grantee.mainImage ? (
          <Image
            src={grantee.mainImage}
            alt={name}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="h-[150px] w-[150px] object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition }}
            priority={priority}
          />
        ) : (
          <GranteeImagePlaceholder name={name} />
        )}
      </div>

      <h3 className="max-w-[150px] text-center text-sm font-semibold leading-snug text-slate-700">
        {name}
      </h3>
    </article>
  );
}

function GranteeImagePlaceholder({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="flex h-[150px] w-[150px] items-center justify-center bg-gradient-to-br from-cyan-700 to-slate-800"
      aria-hidden
    >
      <span className="text-4xl font-bold text-white/90">{initial}</span>
    </div>
  );
}
