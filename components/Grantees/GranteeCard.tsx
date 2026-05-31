import { granteesType } from "@/clientTypes";
import { getSanityObjectPosition } from "@/components/Gallery/sanityImageFrame";
import Image from "next/image";
import styles from "./GranteeCard.module.css";

const ICON_SIZE = 150;

type GranteeCardProps = {
  grantee: granteesType;
  priority?: boolean;
};

export default function GranteeCard({
  grantee,
  priority = false,
}: GranteeCardProps) {
  const objectPosition = getSanityObjectPosition(grantee.hotSpot, grantee.crop);
  const name = grantee.name?.trim() || "Grantee";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper} aria-label={name}>
        {grantee.mainImage ?
          <Image
            src={grantee.mainImage}
            alt={name}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className={styles.image}
            style={{ objectPosition }}
            priority={priority}
          />
        : <GranteeImagePlaceholder name={name} />}
      </div>

      <h3 className={styles.name}>
        {name}
      </h3>
    </article>
  );
}

function GranteeImagePlaceholder({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={styles.placeholder} aria-hidden>
      <span className={styles.initial}>{initial}</span>
    </div>
  );
}
