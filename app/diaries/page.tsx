import { getAllDiaries } from "@/client";
import DiariesFullMosaic from "@/components/Diaries/DiariesFullMosaic";
import Container from "@/components/Layouts/Container/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic Diaries | Magic Marble Foundation",
  description:
    "Browse all the Magic Diaries from the Magic Marble Foundation — stories, experiences, and updates from our community.",
};

import styles from "./page.module.css";

const DiariesPage = async () => {
  const diaries = await getAllDiaries();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Magic Diaries
      </h2>
      <Container>
        {diaries && diaries.length > 0 ? (
          <DiariesFullMosaic diaries={diaries} />
        ) : (
          <p className={styles.emptyState}>
            No diaries available yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default DiariesPage;
