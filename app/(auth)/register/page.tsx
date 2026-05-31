import RegisterCard from "@/components/auth/Register/RegisterCard";
import DonationButton from "@/components/DonationButton/DonationButton";
import Image from "next/image";
import styles from "./page.module.css";

const imageOverlay = (
  <div className={styles.imageOverlay} />
);

const heroContent = (
  <div className={styles.heroContent}>
    <DonationButton />
    <h2 className={styles.heroTitle}>
      Your Choices Can Change The World
    </h2>
  </div>
);

const RegisterPage = async () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <Image
            className={styles.image}
            src={"/sanctuary.webp"}
            alt="Magic Marble Foundation"
            fill
            priority
          />
          {imageOverlay}
          {heroContent}
        </div>
        <div className={styles.formSection}>
          <RegisterCard />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
