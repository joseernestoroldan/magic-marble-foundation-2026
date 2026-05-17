import { Suspense } from "react";
import { Metadata } from "next";
import Projects from "@/components/Projects/Projects";

export const metadata: Metadata = {
  title: "Our Projects | Magic Marble Foundation",
  description:
    "Explore the projects and initiatives led by the Magic Marble Foundation to advance the lives of women, girls, and communities worldwide.",
};

const ProjectsPage = () => {
  return (
    <div className="w-full flex items-center gap-24">
      <Suspense
        fallback={
          <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-black animate-pulse" />
        }
      >
        <Projects />
      </Suspense>
    </div>
  );
};

export default ProjectsPage;