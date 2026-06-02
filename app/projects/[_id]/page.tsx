import styles from "./page.module.css";
import { getAllProjects, getProjectById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 3600;

// Pre-generate all project detail pages at build time
export async function generateStaticParams() {
  const projects = await getAllProjects();
  if (!projects) return [];
  return projects.map((project) => ({
    _id: project._id,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ _id: string }>;
}): Promise<Metadata> {
  const { _id } = await params;
  const projectData = await getProjectById(_id);
  if (!projectData || projectData.length === 0) {
    return { title: "Project Not Found" };
  }
  const project = projectData[0];
  return {
    title: `${project.title} | Magic Marble Foundation`,
    description: project.description || "Learn more about this project.",
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const projectData = await getProjectById(_id);

  if (!projectData || projectData.length === 0) {
    return notFound();
  }

  const project = projectData[0];

  const x = (project.hotSpot?.x ?? 0.5) * 100;
  const y = (project.hotSpot?.y ?? 0.5) * 100;

  return (
    <Container>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {project.title}
        </h2>

        {project.mainImage && (
          <div className={styles.imageWrapper}>
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={styles.image}
              style={{ objectPosition: `${x}% ${y}%` }}
              priority
            />
          </div>
        )}

        {project.contenido && (
          <div className={styles.content}>
            <PortableText value={project.contenido as any} />
          </div>
        )}
      </div>
    </Container>
  );
}
