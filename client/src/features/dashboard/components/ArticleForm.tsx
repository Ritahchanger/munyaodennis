import { useState, type FormEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Textarea } from "../../../components/ui/Textarea"
import { Button } from "../../../components/ui/Button"
import type { Article, ArticleSource, CreateArticleRequest } from "../../medium/types"

function toDateInputValue(iso?: string) {
  const date = iso ? new Date(iso) : new Date()
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10)
}

export interface ArticleFormProps {
  initialValue?: Article
  onSubmit: (data: CreateArticleRequest) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function ArticleForm({ initialValue, onSubmit, onCancel, isSubmitting }: ArticleFormProps) {
  const [source, setSource] = useState<ArticleSource>(initialValue?.source ?? "medium")
  const [title, setTitle] = useState(initialValue?.title ?? "")
  const [url, setUrl] = useState(initialValue?.url ?? "")
  const [excerpt, setExcerpt] = useState(initialValue?.excerpt ?? "")
  const [imageUrl, setImageUrl] = useState(initialValue?.imageUrl ?? "")
  const [imageError, setImageError] = useState(false)
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(initialValue?.publishedAt))
  const [tags, setTags] = useState(initialValue?.tags.join(", ") ?? "")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      source,
      title: title.trim(),
      url: url.trim(),
      excerpt: excerpt.trim(),
      imageUrl: imageUrl.trim() || undefined,
      publishedAt: new Date(publishedAt).toISOString(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-1">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Source</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value as ArticleSource)}
          className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="medium">Medium</option>
          <option value="substack">Substack</option>
        </select>
      </div>
      <Input label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input label="URL" type="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
      <Textarea
        label="Excerpt"
        required
        rows={3}
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />
      <div className="flex flex-col gap-1.5">
        <Input
          label="Cover image URL"
          type="url"
          placeholder="https://… or /uploads/articles/…"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value)
            setImageError(false)
          }}
        />
        <p className="text-xs text-slate-400">
          Shown at the top of the article card. Leave blank for a text-only card.
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
      <Input
        label="Published date"
        type="date"
        required
        value={publishedAt}
        onChange={(e) => setPublishedAt(e.target.value)}
      />
      <Input
        label="Tags (comma-separated)"
        placeholder="React, System Design"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValue ? "Save changes" : "Add article"}
        </Button>
      </div>
    </form>
  )
}
