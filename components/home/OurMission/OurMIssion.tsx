import Container from "@/components/Layouts/Container/Container";
import SmokeText from "@/components/SmokeText/SmokeText";
import styles from "./OurMission.module.css";

const OurMIssion = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          Our Mission
        </h2>

        <SmokeText
          text="To Mobilize Empathy For All Species And The World We Share"
          staggerMs={55}
          initialDelayMs={100}
          className={styles.smokeText}
        />
      </div>
    </Container>
  );
};

export default OurMIssion;
