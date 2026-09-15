import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import {
  Home,
  FolderKanban,
  BookOpen,
  MoreHorizontal,
  LogIn,
  LogOut,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/auth/authSlice"
import { navRoutes } from "../../routes/routeConfig"
import { ThemeToggle } from "../ui/ThemeToggle"
import { cn } from "../../lib/utils"

const PRIMARY_PATHS = ["/", "/projects", "/works"]

const PRIMARY_ICONS: Record<string, LucideIcon> = {
  "/": Home,
  "/projects": FolderKanban,
  "/works": BookOpen,
}

export function BottomNavBar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  const primaryRoutes = navRoutes.filter((route) => PRIMARY_PATHS.includes(route.path))
  const moreRoutes = navRoutes.filter((route) => !PRIMARY_PATHS.includes(route.path))

  const closeSheet = () => setSheetOpen(false)

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
      isActive
        ? "text-brand-600 dark:text-brand-400"
        : "text-slate-500 dark:text-slate-400",
    )

  return (
    <>
      {/* Android-style bottom tab bar: primary destinations + a "More" sheet, mobile only */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.08)] backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-stretch">
          {primaryRoutes.map((route) => {
            const Icon = PRIMARY_ICONS[route.path] ?? Home
            return (
              <NavLink key={route.path} to={route.path} end={route.path === "/"} className={tabClass}>
                <Icon className="h-5 w-5" />
                {route.label}
              </NavLink>
            )
          })}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium text-slate-500 dark:text-slate-400"
          >
            <MoreHorizontal className="h-5 w-5" />
            More
          </button>
        </div>
      </nav>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeSheet} aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 rounded-t border-t border-slate-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />

            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {moreRoutes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={closeSheet}
                  className="py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  {route.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    onClick={closeSheet}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(logout())
                      closeSheet()
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeSheet}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
