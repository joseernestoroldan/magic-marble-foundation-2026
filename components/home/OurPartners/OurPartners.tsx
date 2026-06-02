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
            src={"/partners/help-animals-india.webp"}
            alt="help animals india"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/partners/vegan-group.webp"}
            alt="vegan group"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/partners/well-fed.webp"}
            alt="well fed"
            fill
            sizes="200px"
          />
        </div>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logoImage}
            src={"/partners/thrive.webp"}
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
