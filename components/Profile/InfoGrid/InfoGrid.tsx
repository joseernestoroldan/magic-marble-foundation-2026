import { FaGlobeAmericas, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import styles from "./InfoGrid.module.css";

interface InfoGridProps {
  data: {
    country: string | null;
    address: string | null;
    number: string | null;
    codeNumber: string | null;
  };
}

const fields = [
  { key: "country" as const, icon: FaGlobeAmericas, label: "Country", value: (d: InfoGridProps["data"]) => d.country },
  { key: "address" as const, icon: FaMapMarkerAlt, label: "Address", value: (d: InfoGridProps["data"]) => d.address },
  { key: "number" as const, icon: FaPhoneAlt, label: "Telephone", value: (d: InfoGridProps["data"]) => (
    d.number ? `${d.codeNumber ? `(${d.codeNumber}) ` : ""}${d.number}` : null
  )},
] as const;

const InfoGrid = ({ data }: InfoGridProps) => {
  const visible = fields.filter((f) => data[f.key]);
  if (visible.length === 0) return null;

  return (
    <div className={styles.grid}>
      {visible.map(({ icon: Icon, label, value }) => (
        <div key={label} className={styles.item}>
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} />
          </div>
          <div className={styles.content}>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value(data)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;
