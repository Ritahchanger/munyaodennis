export type ProjectStatus = "completed" | "in-progress"

export interface Project {
  id: string
  slug: string
  name: string
  description: string
  techStack: string[]
  highlights: string[]
  repoUrl?: string
  liveUrl?: string
  imageUrl?: string
  status: ProjectStatus
  featured: boolean
  order: number
}

export type CreateProjectRequest = Omit<Project, "id">
export type UpdateProjectRequest = Partial<CreateProjectRequest>
