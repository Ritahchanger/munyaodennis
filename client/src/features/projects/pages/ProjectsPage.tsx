import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Spinner } from "../../../components/ui/Spinner"
import { useGetProjectsQuery } from "../projectsApi"
import { ProjectCard } from "../components/ProjectCard"

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery()

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Work"
        title="Projects"
        subtitle="A selection of things I've built, from freelance platforms to system-design exploration."
      />
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-brand-600" />
        </div>
      )}
      {isError && (
        <p className="text-red-600 dark:text-red-400">Couldn't load projects right now.</p>
      )}
      {projects && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Container>
  )
}
