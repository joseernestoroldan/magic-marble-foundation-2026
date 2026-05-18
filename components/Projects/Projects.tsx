import { getAllProjects } from "@/client";
import { projectType } from "@/clientTypes";
import ProjectsCarousel from "./ProjectsCarousel";

const Projects = async () => {
    const projects: projectType[] | null = await getAllProjects();
   
  return (
    <section className="w-full">
      {projects && projects.length > 0 ? (
        <ProjectsCarousel projects={projects} />
      ) : (
        <div className="flex justify-center items-center h-[600px] bg-black text-white">
          <p className="text-xl">No projects available at the moment.</p>
        </div>
      )}
    </section>
  )
}

export default Projects