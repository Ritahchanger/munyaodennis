import { useState } from "react"
import toast from "react-hot-toast"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Button } from "../../../components/ui/Button"
import { Modal } from "../../../components/ui/Modal"
import { Spinner } from "../../../components/ui/Spinner"
import { getSocialIcon } from "../../../components/ui/SocialIconLink"
import {
  useGetSocialLinksQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} from "../../social-links/socialLinksApi"
import type { CreateSocialLinkRequest, SocialLink } from "../../social-links/types"
import { SocialLinkForm } from "../components/SocialLinkForm"

export default function DashboardSocialLinksPage() {
  const { data: links, isLoading } = useGetSocialLinksQuery()
  const [createLink, { isLoading: isCreating }] = useCreateSocialLinkMutation()
  const [updateLink, { isLoading: isUpdating }] = useUpdateSocialLinkMutation()
  const [deleteLink, { isLoading: isDeleting }] = useDeleteSocialLinkMutation()

  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null)
  const [activeLink, setActiveLink] = useState<SocialLink | null>(null)
  const [deletingLink, setDeletingLink] = useState<SocialLink | null>(null)

  const openCreate = () => {
    setActiveLink(null)
    setModalMode("create")
  }

  const openEdit = (link: SocialLink) => {
    setActiveLink(link)
    setModalMode("edit")
  }

  const closeModal = () => {
    setModalMode(null)
    setActiveLink(null)
  }

  async function handleSubmit(data: CreateSocialLinkRequest) {
    try {
      if (modalMode === "edit" && activeLink) {
        await updateLink({ id: activeLink.id, body: data }).unwrap()
        toast.success("Social link updated.")
      } else {
        await createLink(data).unwrap()
        toast.success("Social link added.")
      }
      closeModal()
    } catch {
      toast.error("Something went wrong saving this link. Please try again.")
    }
  }

  async function handleDelete() {
    if (!deletingLink) return
    try {
      await deleteLink(deletingLink.id).unwrap()
      toast.success("Social link removed.")
      setDeletingLink(null)
    } catch {
      toast.error("Couldn't delete this link. Please try again.")
      setDeletingLink(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Social links</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Shown in the footer, the WhatsApp button, and the GitHub/LinkedIn pages.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add link
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-6 w-6 text-brand-600" />
        </div>
      )}

      <div className="flex flex-col gap-3">
        {links?.map((link) => {
          const Icon = getSocialIcon(link.platform)
          return (
            <Card key={link.id} className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{link.label}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 truncate text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                >
                  {link.url}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(link)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDeletingLink(link)}>
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
        title={modalMode === "edit" ? "Edit social link" : "Add social link"}
      >
        <SocialLinkForm
          key={activeLink?.id ?? "create"}
          initialValue={activeLink ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={isCreating || isUpdating}
        />
      </Modal>

      <Modal open={deletingLink !== null} onClose={() => setDeletingLink(null)} title="Remove link">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Remove{" "}
          <span className="font-medium text-slate-900 dark:text-white">{deletingLink?.label}</span>{" "}
          from the site?
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeletingLink(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  )
}
