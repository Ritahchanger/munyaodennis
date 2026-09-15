import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-4 pt-4", className)}
    >
      <button
        type="button"
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <span className="text-sm text-slate-600 dark:text-slate-400">
        Page <span className="font-medium text-slate-900 dark:text-white">{page}</span> of{" "}
        {totalPages}
      </span>

      <button
        type="button"
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
