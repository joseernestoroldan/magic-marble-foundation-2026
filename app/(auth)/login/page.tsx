import LoginCard from "@/components/auth/Login/LoginCard";
import DonationButton from "@/components/DonationButton/DonationButton";
import Image from "next/image";
import styles from "./page.module.css";

const imageOverlay = <div className={styles.imageOverlay} />;

const heroContent = (
  <div className={styles.heroContent}>
    <h2 className={styles.heroTitle}>
      Your Choices Can Change The World
    </h2>
    <DonationButton />
  </div>
);

const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <Image
            className={styles.image}
            src={"/sterilization.webp"}
            alt="Magic Marble Foundation"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 50vw"
          />
          {imageOverlay}
          {heroContent}
        </div>
        <div className={styles.formSection}>
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
