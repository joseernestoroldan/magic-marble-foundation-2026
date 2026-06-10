import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.wrapper}>
      <Link href={"/"}>
        <div className={styles.imageBox}>
          <Image
            fill
            src="/logos/navlogo.png"
            alt="magic marble foundation"
            sizes="70px"
            priority
          />
        </div>
      </Link>
      <div className={styles.textGroup}>
        <span className={styles.brandText}>
          Magic
        </span>
        <span className={styles.brandHighlight}>
          Marble
        </span>
        <span className={styles.brandText}>
          Foundation
        </span>
      </div>
    </div>
  );
};

export default Logo;
