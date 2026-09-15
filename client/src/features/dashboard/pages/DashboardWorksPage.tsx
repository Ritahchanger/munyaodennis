import { useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2, ExternalLink, Code2, FileText } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/Badge"
import { Button } from "../../../components/ui/Button"
import { Modal } from "../../../components/ui/Modal"
import { Spinner } from "../../../components/ui/Spinner"
import { cn } from "../../../lib/utils"
import {
  useGetWorksQuery,
  useGetWorkCategoriesQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} from "../../works/worksApi"
import type { CreateWorkRequest, Work } from "../../works/types"
import { WorkForm } from "../components/WorkForm"

export default function DashboardWorksPage() {
  const [category, setCategory] = useState<string | undefined>(undefined)
  const { data: categories } = useGetWorkCategoriesQuery()
  const { data, isLoading } = useGetWorksQuery({ category, page: 1, pageSize: 100 })
  const [createWork, { isLoading: isCreating }] = useCreateWorkMutation()
  const [updateWork, { isLoading: isUpdating }] = useUpdateWorkMutation()
  const [deleteWork, { isLoading: isDeleting }] = useDeleteWorkMutation()

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null)
  const [activeWork, setActiveWork] = useState<Work | null>(null)
  const [deletingWork, setDeletingWork] = useState<Work | null>(null)

  const works = data?.items ?? []

  const openCreate = () => {
    setActiveWork(null)
    setModalMode("create")
  }

  const openEdit = (work: Work) => {
    setActiveWork(work)
    setModalMode("edit")
  }

  const closeModal = () => {
    setModalMode(null)
    setActiveWork(null)
  }

  async function handleSubmit(data: CreateWorkRequest) {
    try {
      if (modalMode === "edit" && activeWork) {
        await updateWork({ id: activeWork.id, body: data }).unwrap()
        toast.success("Work updated.")
      } else {
        await createWork(data).unwrap()
        toast.success("Work added.")
      }
      closeModal()
    } catch {
      toast.error("Something went wrong saving this entry. Please try again.")
    }
  }

  async function handleDelete() {
    if (!deletingWork) return
    try {
      await deleteWork(deletingWork.id).unwrap()
      toast.success("Work deleted.")
      setDeletingWork(null)
    } catch {
      toast.error("Couldn't delete this entry. Please try again.")
      setDeletingWork(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Works</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            GitHub repos, system design notes, and Dev.to articles shown on the Works page.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add work
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(undefined)}
          className={cn(
            "rounded px-3 py-1.5 text-sm font-medium transition-colors",
            category === undefined
              ? "bg-brand-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
          )}
        >
          All
        </button>
        {categories?.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-colors",
              category === c
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-6 w-6 text-brand-600" />
        </div>
      )}

      {!isLoading && works.length === 0 && (
        <Card>
          <p className="text-slate-500 dark:text-slate-400">Nothing here yet.</p>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {works.map((work) => {
          const Icon = work.type === "github" ? Code2 : FileText
          return (
            <Card key={work.id} className="flex items-center gap-4">
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-slate-900 dark:text-white">{work.name}</p>
                  <Badge variant="neutral">{work.category}</Badge>
                </div>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 truncate text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  {work.url}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(work)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDeletingWork(work)}>
                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit work" : "Add work"}
      >
        <WorkForm
          key={activeWork?.id ?? "create"}
          initialValue={activeWork ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={isCreating || isUpdating}
        />
      </Modal>

      <Modal open={deletingWork !== null} onClose={() => setDeletingWork(null)} title="Delete work">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Delete <span className="font-medium text-slate-900 dark:text-white">{deletingWork?.name}</span>?
          This can't be undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingWork(null)}>
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
