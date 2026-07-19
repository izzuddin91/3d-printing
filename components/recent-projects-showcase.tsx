import Image from "next/image";
import { getRecentProjects } from "@/lib/projects-store";

export async function RecentProjectsShowcase() {
  const projects = await getRecentProjects(6);

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center">
        <p className="text-neutral-600">No projects available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-blue-100 bg-white transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-blue-950 line-clamp-2">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
              {project.description}
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              {project.date_created.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
