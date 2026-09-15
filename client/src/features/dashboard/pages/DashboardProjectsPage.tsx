import { useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2, ExternalLink, Code2 } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { resolveAssetUrl } from "../../../lib/assets"
import { Badge } from "../../../components/ui/Badge"
import { Button } from "../../../components/ui/Button"
import { Modal } from "../../../components/ui/Modal"
import { Spinner } from "../../../components/ui/Spinner"
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../projects/projectsApi"
import type { CreateProjectRequest, Project } from "../../projects/types"
import { ProjectForm } from "../components/ProjectForm"

export default function DashboardProjectsPage() {
  const { data: projects, isLoading } = useGetProjectsQuery()
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation()
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation()
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)

  const openCreate = () => {
    setActiveProject(null)
    setModalMode("create")
  }

  const openEdit = (project: Project) => {
    setActiveProject(project)
    setModalMode("edit")
  }

  const closeModal = () => {
    setModalMode(null)
    setActiveProject(null)
  }

  async function handleSubmit(data: CreateProjectRequest) {
    try {
      if (modalMode === "edit" && activeProject) {
        await updateProject({ id: activeProject.id, body: data }).unwrap()
        toast.success("Project updated.")
      } else {
        await createProject(data).unwrap()
        toast.success("Project created.")
      }
      closeModal()
    } catch {
      toast.error("Something went wrong saving this project. Please try again.")
    }
  }

  async function handleDelete() {
    if (!deletingProject) return
    try {
      await deleteProject(deletingProject.id).unwrap()
      toast.success("Project deleted.")
      setDeletingProject(null)
    } catch {
      toast.error("Couldn't delete this project. Please try again.")
      setDeletingProject(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage what shows up on the public Projects page.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-6 w-6 text-brand-600" />
        </div>
      )}

      {!isLoading && projects && projects.length === 0 && (
        <Card>
          <p className="text-slate-500 dark:text-slate-400">
            No projects yet. Create your first one.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {project.imageUrl && (
              <img
                src={resolveAssetUrl(project.imageUrl)}
                alt=""
                className="h-16 w-24 shrink-0 rounded object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">{project.name}</h3>
                <Badge variant={project.status === "completed" ? "success" : "accent"}>
                  {project.status === "completed" ? "Completed" : "In progress"}
                </Badge>
                {project.featured && <Badge variant="brand">Featured</Badge>}
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>/{project.slug}</span>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <Code2 className="h-3.5 w-3.5" /> Repo
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-2 self-end sm:self-center">
              <Button variant="outline" size="sm" onClick={() => openEdit(project)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDeletingProject(project)}>
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit project" : "New project"}
        className="max-w-lg"
      >
        <ProjectForm
          key={activeProject?.id ?? "create"}
          initialValue={activeProject ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={isCreating || isUpdating}
        />
      </Modal>

      <Modal
        open={deletingProject !== null}
        onClose={() => setDeletingProject(null)}
        title="Delete project"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {deletingProject?.name}
          </span>
          ? This can't be undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingProject(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
