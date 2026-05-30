import styles from "./page.module.css";
import Projects from "@/components/Projects/Projects";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Projects | Magic Marble Foundation",
  description:
    "Explore the projects and initiatives led by the Magic Marble Foundation to advance the lives of women, girls, and communities worldwide.",
};

const ProjectsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Suspense
        fallback={
          <div className={styles.skeleton} />
        }
      >
        <Projects />
      </Suspense>
    </div>
  );
};

export default ProjectsPage;