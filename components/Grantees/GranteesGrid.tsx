import { granteesType } from "@/clientTypes";
import GranteeCard from "./GranteeCard";
import styles from "./GranteesGrid.module.css";

type GranteesGridProps = {
  grantees: granteesType[];
};

export default function GranteesGrid({ grantees }: GranteesGridProps) {
  if (!grantees.length) return null;

  return (
    <div className={styles.grid}>
      {grantees.map((grantee, index) => (
        <GranteeCard key={grantee._id} grantee={grantee} priority={index < 8} />
      ))}
    </div>
  );
}
