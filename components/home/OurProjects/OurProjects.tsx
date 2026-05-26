import { getAllProjects } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import Image from "next/image";
import Link from "next/link";

/**
 * Converts a Sanity hotspot (0-1 range, center of focus) and optional crop
 * into a CSS `object-position` value so next/image always shows the focal point.
 */
function getObjectPosition(
  hotspot: { x: number; y: number } | null,
  crop: { top: number; left: number; bottom: number; right: number } | null,
): string {
  if (!hotspot) return "center center";

  // When a crop exists, hotspot coordinates are relative to the cropped area.
  // We remap them back to the full-image coordinate space.
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
    <section className="w-full py-4">
      <Container>
        {/* Section header */}
        <div className="flex flex-col items-center gap-4 mb-14">
          <h2 className="text-cyan-600 font-bold text-4xl text-center">
            Our Projects
          </h2>
        </div>

        {projects.length === 0 ?
          <p className="text-slate-400 text-center py-12">
            No projects available yet.
          </p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const objectPosition = getObjectPosition(
                project.hotSpot,
                project.crop,
              );

              return (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-400 ease-out hover:-translate-y-1"
                  aria-label={`View project: ${project.title}`}>
                  {/* Image area */}
                  <div className="relative w-full h-56 overflow-hidden">
                    {
                      project.mainImage ?
                        <Image
                          src={project.mainImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ objectPosition }}
                        />
                        // Fallback placeholder when no image is available
                      : <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-slate-800 flex items-center justify-center">
                          <span className="text-slate-500 text-sm">
                            No image
                          </span>
                        </div>

                    }

                    {/* Gradient overlay — always present, intensifies on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-400" />
                  </div>

                  {/* Content area */}
                  <div className="flex flex-col flex-1 gap-3 p-5 bg-gray-800">
                    {/* Title */}
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description — 3 lines max */}
                    {project.description && (
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {project.description}
                      </p>
                    )}

                    {/* CTA row */}
                    <div className="flex items-center gap-1.5 mt-auto pt-2">
                      <span className="text-cyan-500 text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
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
                        className="text-cyan-500 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                        aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Left accent border — slides in on hover */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-cyan-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400 ease-out" />
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
