import { useState, type FormEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useGetWorkCategoriesQuery } from "../../works/worksApi"
import type { CreateWorkRequest, Work } from "../../works/types"

export interface WorkFormProps {
  initialValue?: Work
  onSubmit: (data: CreateWorkRequest) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function WorkForm({ initialValue, onSubmit, onCancel, isSubmitting }: WorkFormProps) {
  const { data: categories } = useGetWorkCategoriesQuery()
  const [category, setCategory] = useState(initialValue?.category ?? "")
  const [name, setName] = useState(initialValue?.name ?? "")
  const [url, setUrl] = useState(initialValue?.url ?? "")
  const [type, setType] = useState<Work["type"]>(initialValue?.type ?? "article")
  const [order, setOrder] = useState(String(initialValue?.order ?? 0))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({
      category: category.trim(),
      name: name.trim(),
      url: url.trim(),
      type,
      order: Number(order) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Category<span className="ml-0.5 text-red-500">*</span>
        </label>
        <input
          list="known-categories"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="System Design"
          className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
        <datalist id="known-categories">
          {categories?.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      <Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="URL" type="url" required value={url} onChange={(e) => setUrl(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Work["type"])}
            className="h-10 rounded border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="article">Article</option>
            <option value="github">GitHub</option>
          </select>
        </div>
        <Input label="Order" type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialValue ? "Save changes" : "Add work"}
        </Button>
      </div>
    </form>
  )
}
