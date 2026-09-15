import { useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Badge } from "../../../components/ui/Badge"
import { Button } from "../../../components/ui/Button"
import { Modal } from "../../../components/ui/Modal"
import { Spinner } from "../../../components/ui/Spinner"
import { cn } from "../../../lib/utils"
import { resolveAssetUrl } from "../../../lib/assets"
import {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "../../medium/articlesApi"
import type { Article, ArticleSource, CreateArticleRequest } from "../../medium/types"
import { ArticleForm } from "../components/ArticleForm"

const FILTERS: { label: string; value: ArticleSource | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Medium", value: "medium" },
  { label: "Substack", value: "substack" },
]

export default function DashboardArticlesPage() {
  const [source, setSource] = useState<ArticleSource | undefined>(undefined)
  const { data, isLoading } = useGetArticlesQuery({ source, page: 1, pageSize: 100 })
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation()
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation()
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation()

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null)
  const [activeArticle, setActiveArticle] = useState<Article | null>(null)
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null)

  const articles = data?.items ?? []

  const openCreate = () => {
    setActiveArticle(null)
    setModalMode("create")
  }

  const openEdit = (article: Article) => {
    setActiveArticle(article)
    setModalMode("edit")
  }

  const closeModal = () => {
    setModalMode(null)
    setActiveArticle(null)
  }

  async function handleSubmit(data: CreateArticleRequest) {
    try {
      if (modalMode === "edit" && activeArticle) {
        await updateArticle({ id: activeArticle.id, body: data }).unwrap()
        toast.success("Article updated.")
      } else {
        await createArticle(data).unwrap()
        toast.success("Article added.")
      }
      closeModal()
    } catch {
      toast.error("Something went wrong saving this article. Please try again.")
    }
  }

  async function handleDelete() {
    if (!deletingArticle) return
    try {
      await deleteArticle(deletingArticle.id).unwrap()
      toast.success("Article deleted.")
      setDeletingArticle(null)
    } catch {
      toast.error("Couldn't delete this article. Please try again.")
      setDeletingArticle(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Articles</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Powers the Medium and Substack pages. (Dev.to links live under Works.)
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add article
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => setSource(filter.value)}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-colors",
              source === filter.value
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-6 w-6 text-brand-600" />
        </div>
      )}

      {!isLoading && articles.length === 0 && (
        <Card>
          <p className="text-slate-500 dark:text-slate-400">No articles yet.</p>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {article.imageUrl && (
              <img
                src={resolveAssetUrl(article.imageUrl)}
                alt=""
                className="h-16 w-24 shrink-0 rounded object-cover"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">{article.title}</h3>
                <Badge variant={article.source === "medium" ? "brand" : "accent"}>
                  {article.source === "medium" ? "Medium" : "Substack"}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                {article.excerpt}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View
                </a>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 self-end sm:self-center">
              <Button variant="outline" size="sm" onClick={() => openEdit(article)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setDeletingArticle(article)}>
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        title={modalMode === "edit" ? "Edit article" : "Add article"}
        className="max-w-lg"
      >
        <ArticleForm
          key={activeArticle?.id ?? "create"}
          initialValue={activeArticle ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={isCreating || isUpdating}
        />
      </Modal>

      <Modal
        open={deletingArticle !== null}
        onClose={() => setDeletingArticle(null)}
        title="Delete article"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Delete{" "}
          <span className="font-medium text-slate-900 dark:text-white">
            {deletingArticle?.title}
          </span>
          ? This can't be undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingArticle(null)}>
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
