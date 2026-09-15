import { Link } from "react-router-dom"
import { Badge } from "../../../components/ui/Badge"
import { cn } from "../../../lib/utils"
import { resolveAssetUrl } from "../../../lib/assets"
import type { Project } from "../types"

export function ProjectCard({ project }: { project: Project }) {
  const imageSrc = resolveAssetUrl(project.imageUrl)

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
      )}
    >
      {imageSrc && (
        <Link
          to={`/projects/${project.slug}`}
          className="block aspect-video w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800"
        >
          <img
            src={imageSrc}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {project.name}
          </h3>
          <Badge variant={project.status === "completed" ? "success" : "accent"}>
            {project.status === "completed" ? "Completed" : "In progress"}
          </Badge>
        </div>
        <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="neutral">
              {tech}
            </Badge>
          ))}
        </div>
        <Link
          to={`/projects/${project.slug}`}
          className="mt-auto pt-2 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          View details &rarr;
        </Link>
      </div>
    </div>
  )
}
