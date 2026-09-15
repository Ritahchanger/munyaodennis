import { Link, useParams } from "react-router-dom"
import { Container } from "../../../components/ui/Container"
import { Card } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/Badge"
import { Spinner } from "../../../components/ui/Spinner"
import { buttonVariants } from "../../../components/ui/Button"
import { resolveAssetUrl } from "../../../lib/assets"
import { useGetProjectBySlugQuery } from "../projectsApi"

export default function ProjectDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>()
  const { data: project, isLoading, isError } = useGetProjectBySlugQuery(slug)

  if (isLoading) {
    return (
      <Container className="flex justify-center py-24">
        <Spinner className="h-8 w-8 text-brand-600" />
      </Container>
    )
  }

  if (isError || !project) {
    return (
      <Container className="py-24 text-center">
        <p className="text-red-600 dark:text-red-400">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block text-brand-600 hover:underline dark:text-brand-400">
          &larr; Back to projects
        </Link>
      </Container>
    )
  }

  const imageSrc = resolveAssetUrl(project.imageUrl)

  return (
    <Container className="max-w-5xl py-16">
      <Link
        to="/projects"
        className="mb-6 inline-block text-sm text-brand-600 hover:underline dark:text-brand-400"
      >
        &larr; Back to projects
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Sidebar: cover image + status/tech-stack/links — sticky on desktop, shown first on mobile */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1 lg:h-fit">
          {imageSrc && (
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
              <img src={imageSrc} alt={project.name} className="h-full w-full object-cover" />
            </div>
          )}
          <Card className="flex flex-col gap-4">
            <Badge variant={project.status === "completed" ? "success" : "accent"} className="w-fit">
              {project.status === "completed" ? "Completed" : "In progress"}
            </Badge>

            {project.techStack.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tech stack
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="brand">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(project.repoUrl || project.liveUrl) && (
              <div className="flex flex-col gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    View repo
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Live demo
                  </a>
                )}
              </div>
            )}
          </Card>
        </aside>

        {/* Main content */}
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{project.description}</p>

          {project.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Highlights</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
