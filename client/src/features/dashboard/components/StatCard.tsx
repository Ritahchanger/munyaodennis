import type { LucideIcon } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Spinner } from "../../../components/ui/Spinner"

export interface StatCardProps {
  label: string
  value: number | undefined
  icon: LucideIcon
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {value === undefined ? <Spinner className="h-5 w-5 text-brand-600" /> : value}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Card>
  )
}
