import Container from "@/components/Layouts/Container/Container";
import SmokeText from "@/components/SmokeText/SmokeText";
import Image from "next/image";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <Container>
      <div className={styles.section}>
        
        {/* Text Section */}
        <div className={styles.textSection}>
          <div className={styles.textWrapper}>
            <SmokeText
              text="About Magic Marble Foundation"
              className={styles.smokeHeading}
              staggerMs={40}
            />
          </div>
          <div className={styles.textWrapper}>
            <p className={styles.description}>
              Magic Marble Foundation works to alleviate the suffering of
              underprivileged human and non-human animal populations by
              providing planet-friendly support including food, housing, medical
              treatment, education, and the financial assistance required to
              procure these basic needs.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src="/logos/logo.jpg"
              fill
              alt="Magic Marble Foundation"
              priority={true}
            />
          </div>
        </div>

      </div>
    </Container>
  );
};

export default AboutUs;
