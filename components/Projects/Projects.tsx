import { getAllProjects } from "@/client";
import { projectType } from "@/clientTypes";
import ProjectsCarousel from "./ProjectsCarousel";
import styles from "./Projects.module.css";

const Projects = async () => {
    const projects: projectType[] | null = await getAllProjects();
   
  return (
    <section className={styles.section}>
      {projects && projects.length > 0 ? (
        <ProjectsCarousel projects={projects} />
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No projects available at the moment.</p>
        </div>
      )}
    </section>
  )
}

export default Projects