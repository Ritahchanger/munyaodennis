import type { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        brand: "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200",
        accent:
          "bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200",
        neutral:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        success:
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
