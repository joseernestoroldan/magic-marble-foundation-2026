import Link from "next/link";
import styles from "./Infotext.module.css";

type InfoTextProps = {
  href: string;
  children: React.ReactNode;
};

const InfoText = ({ href, children }: InfoTextProps) => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </div>
  );
};

export default InfoText;
