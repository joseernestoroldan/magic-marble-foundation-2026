import Container from "@/components/Layouts/Container/Container";
import SmokeText from "../../SmokeText/SmokeText";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <SmokeText
          text="At the Magic Marble Foundation, we are a dedicated team of individuals striving to create a better world through empathy and action. Our organization is committed to empowering underserved communities, promoting animal welfare, and championing environmental activism. Together, we work diligently to cultivate a compassionate global community that respects and values all living beings and the environment we share."
          staggerMs={20}
          initialDelayMs={20}
          className={styles.smokeText}
        />
      </div>
    </Container>
  );
};

export default Banner;
