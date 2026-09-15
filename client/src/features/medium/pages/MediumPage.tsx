import { useEffect, useState } from "react"
import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Spinner } from "../../../components/ui/Spinner"
import { Pagination } from "../../../components/ui/Pagination"
import { SearchInput } from "../../../components/ui/SearchInput"
import { useDebouncedValue } from "../../../hooks/useDebouncedValue"
import { useGetArticlesQuery } from "../articlesApi"
import { ArticleCard } from "../components/ArticleCard"

export default function MediumPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(search, 400)

  const { data, isLoading, isFetching, isError } = useGetArticlesQuery({
    source: "medium",
    search: debouncedSearch,
    page,
    pageSize: 6,
  })
  const articles = data?.items ?? []

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Writing"
        title="Medium articles"
        subtitle="Longer-form writing on frontend architecture, system design, and AI engineering."
      />

      <div className="mb-8 flex max-w-sm items-center gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search articles…"
          aria-label="Search Medium articles"
          className="flex-1"
        />
        {isFetching && !isLoading && <Spinner className="h-4 w-4 shrink-0 text-brand-600" />}
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-brand-600" />
        </div>
      )}
      {isError && (
        <p className="text-red-600 dark:text-red-400">
          Couldn't load Medium articles right now.
        </p>
      )}
      {data && articles.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">
          {debouncedSearch ? "No articles match your search." : "No articles published yet."}
        </p>
      )}
      {articles.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
      {data && (
        <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
      )}
    </Container>
  )
}
