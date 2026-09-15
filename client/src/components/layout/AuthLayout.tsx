import { Link, Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-gradient-to-b from-brand-50 to-white px-4 dark:from-slate-900 dark:to-slate-950">
      <Link to="/" className="text-lg font-bold text-slate-900 dark:text-white">
        Dennis<span className="text-brand-600 dark:text-brand-400">.dev</span>
      </Link>
      <Outlet />
    </div>
  )
}
