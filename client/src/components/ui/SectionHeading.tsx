import { cn } from "../../lib/utils"

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex animate-fade-in-up flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  )
}
