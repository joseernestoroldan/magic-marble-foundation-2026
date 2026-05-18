import { getAllProjects, getProjectById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

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
  params: { _id: string };
}): Promise<Metadata> {
  const projectData = await getProjectById(params._id);
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
  params: { _id: string };
}) {
  const projectData = await getProjectById(params._id);

  if (!projectData || projectData.length === 0) {
    return notFound();
  }

  const project = projectData[0];

  const x = (project.hotSpot?.x ?? 0.5) * 100;
  const y = (project.hotSpot?.y ?? 0.5) * 100;

  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center w-full gap-24 pt-24">
        <h2 className="text-cyan-600 font-bold text-3xl capitalize">
          {project.title}
        </h2>

        {project.mainImage && (
          <div className="w-full relative h-[400px] md:h-[500px] rounded-[5px] overflow-hidden shadow-lg">
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              style={{ objectPosition: `${x}% ${y}%` }}
              priority
            />
          </div>
        )}

        {project.contenido && (
          <div
            className="w-full text-lg text-gray-700 space-y-6 
          [&>p]:mb-6 [&>p]:leading-relaxed 
          [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-cyan-600 
          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-cyan-600
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
          [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-600 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
          [&_a]:text-cyan-600 [&_a]:underline [&_a:hover]:text-cyan-800 transition-colors">
            <PortableText value={project.contenido as any} />
          </div>
        )}
      </div>
    </Container>
  );
}
