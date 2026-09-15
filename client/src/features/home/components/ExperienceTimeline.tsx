import { ExternalLink } from "lucide-react"
import type { ExperienceEntry } from "../../profile/types"

export function ExperienceTimeline({ experience }: { experience: ExperienceEntry[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l border-slate-200 pl-6 dark:border-slate-800">
      {experience.map((entry) => (
        <li key={`${entry.company}-${entry.period}`} className="relative">
          <span className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-600 dark:border-slate-950" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {entry.role} · {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-brand-600 hover:underline dark:text-brand-400"
                >
                  {entry.company}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                entry.company
              )}
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {entry.period}
              {entry.current && (
                <span className="ml-2 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Current
                </span>
              )}
            </span>
          </div>
          {(entry.location || entry.employmentType) && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {[entry.location, entry.employmentType].filter(Boolean).join(" · ")}
            </p>
          )}
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
