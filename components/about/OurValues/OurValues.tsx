import Container from "@/components/Layouts/Container/Container";
import SmokeText from "@/components/SmokeText/SmokeText";
import styles from "./OurValues.module.css";

const OurValues = () => {
  return (
    <Container>
      <div className={styles.section}>
        <h2 className={styles.title}>
          Our Values
        </h2>

        <SmokeText
          text="At Magic Marble Foundation, our values are anchored in equality, holistic care, and a commitment to providing help without causing harm. Rooted in the belief that every action has a profound impact, we embrace veganism as a cornerstone of our dedication to compassionate practices and environmental stewardship. We envision a world where all sentient beings, both humans and non-humans, can thrive without experiencing harm. Join us in shaping a future where support is synonymous with sustainability, empathy, and the well-being of all."
          staggerMs={55}
          initialDelayMs={100}
          className={styles.smokeText}
        />
      </div>
    </Container>
  );
};

export default OurValues;
