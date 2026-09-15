import { useEffect, useState } from "react"
import { Code2, FileText, ArrowUpRight } from "lucide-react"
import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Card } from "../../../components/ui/Card"
import { Spinner } from "../../../components/ui/Spinner"
import { Pagination } from "../../../components/ui/Pagination"
import { SearchInput } from "../../../components/ui/SearchInput"
import { useDebouncedValue } from "../../../hooks/useDebouncedValue"
import { cn } from "../../../lib/utils"
import { useGetWorksQuery, useGetWorkCategoriesQuery } from "../worksApi"
import type { Work } from "../types"

function WorkRow({ work }: { work: Work }) {
  const Icon = work.type === "github" ? Code2 : FileText

  return (
    <a
      href={work.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-3 rounded border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700 dark:hover:bg-brand-900/20"
    >
      <Icon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
      <span className="flex-1 font-medium text-slate-700 group-hover:text-brand-700 dark:text-slate-300 dark:group-hover:text-brand-300">
        {work.name}
      </span>
      <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        {work.category}
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
    </a>
  )
}

export default function WorksPage() {
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(search, 400)

  const { data: categories } = useGetWorkCategoriesQuery()
  const { data, isLoading, isFetching } = useGetWorksQuery({
    category,
    search: debouncedSearch,
    page,
    pageSize: 8,
  })
  const works = data?.items ?? []

  const selectCategory = (next: string | undefined) => {
    setCategory(next)
    setPage(1)
  }

  // Debounced value changed (a fresh search term settled) — jump back to page 1.
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  return (
    <Container className="max-w-3xl py-16">
      <SectionHeading
        eyebrow="Writing & references"
        title="Works"
        subtitle="System design notes, interview prep, and articles published on Medium and Dev.to."
        align="left"
      />

      <div className="mb-4 flex max-w-sm items-center gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search works…"
          aria-label="Search works"
          className="flex-1"
        />
        {isFetching && !isLoading && <Spinner className="h-4 w-4 shrink-0 text-brand-600" />}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => selectCategory(undefined)}
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
            onClick={() => selectCategory(c)}
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
        <p className="text-slate-500 dark:text-slate-400">
          {debouncedSearch ? "No works match your search." : "Nothing in this category yet."}
        </p>
      )}

      {works.length > 0 && (
        <Card className="flex flex-col gap-2 p-3">
          {works.map((work) => (
            <WorkRow key={work.id} work={work} />
          ))}
        </Card>
      )}

      {data && (
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
      )}
    </Container>
  )
}
