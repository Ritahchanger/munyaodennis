import { useState, type FormEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Textarea } from "../../../components/ui/Textarea"
import { Button } from "../../../components/ui/Button"
import type { CreateProjectRequest, Project, ProjectStatus } from "../../projects/types"

export interface ProjectFormProps {
  initialValue?: Project
  onSubmit: (data: CreateProjectRequest) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function ProjectForm({ initialValue, onSubmit, onCancel, isSubmitting }: ProjectFormProps) {
  const [name, setName] = useState(initialValue?.name ?? "")
  const [slug, setSlug] = useState(initialValue?.slug ?? "")
  const [description, setDescription] = useState(initialValue?.description ?? "")
  const [techStack, setTechStack] = useState(initialValue?.techStack.join(", ") ?? "")
  const [highlights, setHighlights] = useState(initialValue?.highlights.join("\n") ?? "")
  const [repoUrl, setRepoUrl] = useState(initialValue?.repoUrl ?? "")
  const [liveUrl, setLiveUrl] = useState(initialValue?.liveUrl ?? "")
  const [imageUrl, setImageUrl] = useState(initialValue?.imageUrl ?? "")
  const [imageError, setImageError] = useState(false)
  const [status, setStatus] = useState<ProjectStatus>(initialValue?.status ?? "in-progress")
  const [featured, setFeatured] = useState(initialValue?.featured ?? false)
  const [order, setOrder] = useState(String(initialValue?.order ?? 0))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
      highlights: highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      repoUrl: repoUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      status,
      featured,
      order: Number(order) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
      <Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        label="Slug"
        required
        placeholder="my-project"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <Textarea
        label="Description"
        required
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Tech stack (comma-separated)"
        placeholder="React, Node.js, MongoDB"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />
      <Textarea
        label="Highlights (one per line)"
        rows={4}
        value={highlights}
        onChange={(e) => setHighlights(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Repo URL"
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Input
          label="Live URL"
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Input
          label="Cover image URL"
          type="url"
          placeholder="https://… or /uploads/projects/…"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value)
            setImageError(false)
          }}
        />
        <p className="text-xs text-slate-400">
          Shown at the top of the project card and detail page. Leave blank for a text-only card.
        </p>
        {imageUrl && (
          <div className="mt-1 aspect-video w-full overflow-hidden rounded border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
            {imageError ? (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                Couldn't load this image
              </div>
            ) : (
              <img
                src={imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <Input
          label="Order"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        Featured on the homepage
      </label>

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValue ? "Save changes" : "Create project"}
        </Button>
      </div>
    </form>
  )
}
