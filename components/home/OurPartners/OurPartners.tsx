import Image from "next/image";
import styles from "./OurPartners.module.css";

const OurPartners = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Our Partners
      </h2>
      <div className={styles.logos}>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/helpAnimalsIndia.webp"}
            alt="help animals india"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/veganGroup.webp"}
            alt="vegan group"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/wellFed.webp"}
            alt="well fed"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/thrive.webp"}
            alt="thrive"
            fill
            sizes="200px"
          />
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
