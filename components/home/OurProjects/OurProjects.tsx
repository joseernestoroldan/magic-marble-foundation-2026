import { getAllProjects } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import Image from "next/image";
import Link from "next/link";
import styles from "./OurProjects.module.css";

function getObjectPosition(
  hotspot: { x: number; y: number } | null,
  crop: { top: number; left: number; bottom: number; right: number } | null,
): string {
  if (!hotspot) return "center center";

  let x = hotspot.x;
  let y = hotspot.y;

  if (crop) {
    const cropW = 1 - crop.left - crop.right;
    const cropH = 1 - crop.top - crop.bottom;
    x = crop.left + hotspot.x * cropW;
    y = crop.top + hotspot.y * cropH;
  }

  return `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%`;
}

const OurProjects = async () => {
  const allProjects = await getAllProjects();
  const projects = allProjects?.slice(0, 6) ?? [];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            Our Projects
          </h2>
        </div>

        {projects.length === 0 ?
          <p className={styles.empty}>
            No projects available yet.
          </p>
        : <div className={styles.grid}>
            {projects.map((project) => {
              const objectPosition = getObjectPosition(
                project.hotSpot,
                project.crop,
              );

              return (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className={styles.card}
                  aria-label={`View project: ${project.title}`}>
                  <div className={styles.imageArea}>
                    {
                      project.mainImage ?
                        <Image
                          src={project.mainImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.cardImage}
                          style={{ objectPosition }}
                        />
                      : <div className={styles.imagePlaceholder}>
                          <span className={styles.noImageText}>
                            No image
                          </span>
                        </div>
                    }

                    <div className={styles.imageOverlay} />
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className={styles.cardDescription}>
                        {project.description}
                      </p>
                    )}

                    <div className={styles.ctaRow}>
                      <span className={styles.ctaText}>
                        Learn more
                      </span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.ctaArrow}
                        aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.accentBorder} />
                </Link>
              );
            })}
          </div>
        }
      </Container>
    </section>
  );
};

export default OurProjects;
