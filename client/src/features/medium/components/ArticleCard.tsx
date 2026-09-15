import { ArrowUpRight } from "lucide-react"
import { Badge } from "../../../components/ui/Badge"
import { cn } from "../../../lib/utils"
import { resolveAssetUrl } from "../../../lib/assets"
import type { Article } from "../types"

export function ArticleCard({ article }: { article: Article }) {
  const imageSrc = resolveAssetUrl(article.imageUrl)

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
      )}
    >
      {imageSrc && (
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer noopener"
          className="block aspect-video w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800"
        >
          <img
            src={imageSrc}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </a>
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {article.title}
          </h3>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Read article"
            className="shrink-0 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
        <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
          <span className="ml-auto text-xs text-slate-400">
            {new Date(article.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
