import { getBoard } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import Tabs from "./Tabs";
import styles from "./OurTeam.module.css";

const OurTeam = async () => {
  const board = await getBoard();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Our Team</h2>
      <Container>
        <Tabs board={board} />
      </Container>
    </div>
  );
};

export default OurTeam;
