import HeroCarousel from "@/components/Carousels/HeroCarousel/HeroCarousel";
import Heading from "@/components/Heading/Heading";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headingOverlay}>
        <Heading
          text="Magic Marble Foundation"
          size="hero"
        />
      </div>
      <HeroCarousel />
    </div>
  );
};

export default HeroSection;
