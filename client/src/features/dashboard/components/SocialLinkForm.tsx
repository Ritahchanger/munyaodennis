import { useState, type FormEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import type { CreateSocialLinkRequest, SocialLink } from "../../social-links/types"

const KNOWN_PLATFORMS = [
  "whatsapp",
  "linkedin",
  "github",
  "medium",
  "substack",
  "devto",
  "youtube",
  "tiktok",
]

export interface SocialLinkFormProps {
  initialValue?: SocialLink
  onSubmit: (data: CreateSocialLinkRequest) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function SocialLinkForm({ initialValue, onSubmit, onCancel, isSubmitting }: SocialLinkFormProps) {
  const [platform, setPlatform] = useState(initialValue?.platform ?? "")
  const [label, setLabel] = useState(initialValue?.label ?? "")
  const [url, setUrl] = useState(initialValue?.url ?? "")
  const [handle, setHandle] = useState(initialValue?.handle ?? "")
  const [order, setOrder] = useState(String(initialValue?.order ?? 0))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      platform: platform.trim().toLowerCase(),
      label: label.trim(),
      url: url.trim(),
      handle: handle.trim() || undefined,
      order: Number(order) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Platform<span className="ml-0.5 text-red-500">*</span>
        </label>
        <input
          list="known-platforms"
          required
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="linkedin"
          className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
        <datalist id="known-platforms">
          {KNOWN_PLATFORMS.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </div>
      <Input label="Label" required value={label} onChange={(e) => setLabel(e.target.value)} />
      <Input
        label="URL"
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Input
        label="Handle (optional)"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Input label="Order" type="number" value={order} onChange={(e) => setOrder(e.target.value)} />

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValue ? "Save changes" : "Add link"}
        </Button>
      </div>
    </form>
  )
}
