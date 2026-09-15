import { useState } from "react"
import { NavLink, Outlet, Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FolderKanban,
  UserCircle,
  Share2,
  Newspaper,
  BookOpen,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/auth/authSlice"
import { Logo } from "../ui/Logo"
import { Avatar } from "../ui/Avatar"
import { Badge } from "../ui/Badge"
import { cn } from "../../lib/utils"

const SIDEBAR_COLLAPSED_KEY = "portfolio_admin_sidebar_collapsed"

const sidebarItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, disabled: false },
  { label: "Projects", to: "/dashboard/projects", icon: FolderKanban, disabled: false },
  { label: "Social links", to: "/dashboard/social-links", icon: Share2, disabled: false },
  { label: "Articles", to: "/dashboard/articles", icon: Newspaper, disabled: false },
  { label: "Works", to: "/dashboard/works", icon: BookOpen, disabled: false },
  { label: "Profile", to: "/dashboard/profile", icon: UserCircle, disabled: false },
]

function SidebarNav({ collapsed, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {sidebarItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end
          title={collapsed ? item.label : undefined}
          onClick={(event) => {
            if (item.disabled) event.preventDefault()
            else onNavigate?.()
          }}
          aria-disabled={item.disabled}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2.5 rounded px-3 py-2 text-sm font-medium transition-colors",
              collapsed && "justify-center px-2",
              item.disabled
                ? "cursor-not-allowed text-slate-300 dark:text-slate-600"
                : isActive
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
            )
          }
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.disabled && (
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  Soon
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function SidebarFooter({ collapsed }: { collapsed?: boolean }) {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
      <div className={cn("flex items-center gap-2.5 px-1", collapsed && "justify-center px-0")}>
        <Avatar name={user?.name ?? "?"} className="h-8 w-8 shrink-0 text-xs" />
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
            {user?.role && (
              <Badge variant="brand" className="shrink-0">
                {user.role}
              </Badge>
            )}
          </>
        )}
      </div>
      <Link
        to="/"
        title={collapsed ? "Back to site" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
          collapsed && "justify-center px-2",
        )}
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        {!collapsed && "Back to site"}
      </Link>
      <button
        type="button"
        onClick={() => dispatch(logout())}
        title={collapsed ? "Logout" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
          collapsed && "justify-center px-2",
        )}
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {!collapsed && "Logout"}
      </button>
    </div>
  )
}

function getInitialCollapsed() {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1"
  } catch {
    return false
  }
}

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(getInitialCollapsed)
  const location = useLocation()
  const pageTitle = sidebarItems.find((item) => item.to === location.pathname)?.label ?? "Dashboard"

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0")
      } catch {
        // ignore persistence failures
      }
      return next
    })
  }

  return (
    <div className="flex min-h-svh flex-col sm:h-svh sm:flex-row sm:overflow-hidden">
      {/* Desktop sidebar — sticky to the viewport, independently scrollable, collapsible */}
      <aside
        className={cn(
          "sticky top-0 hidden h-svh shrink-0 flex-col justify-between overflow-y-auto border-r border-slate-200 p-4 transition-[width] duration-200 sm:flex dark:border-slate-800",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
            <Link to="/dashboard" className="flex min-w-0 items-center gap-2 px-1">
              <Logo className="h-8 w-8 shrink-0" />
              {!collapsed && (
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    Dennis.dev
                  </p>
                  <p className="text-xs text-slate-400">Admin</p>
                </div>
              )}
            </Link>
            {!collapsed && (
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-label="Collapse sidebar"
                className="shrink-0 rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            )}
          </div>
          {collapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              className="flex items-center justify-center rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
          )}
          <SidebarNav collapsed={collapsed} />
        </div>
        <SidebarFooter collapsed={collapsed} />
      </aside>

      <div className="flex flex-1 flex-col sm:h-svh sm:overflow-y-auto">
        {/* Admin top bar — sticky/immovable on every screen size, with a faint border beneath it */}
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <header className="flex items-center justify-between p-4 sm:px-8 sm:py-4">
            <Link to="/dashboard" className="flex items-center gap-2 sm:hidden">
              <Logo className="h-7 w-7" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Admin</span>
            </Link>
            <p className="hidden text-sm font-semibold text-slate-900 sm:block dark:text-white">
              {pageTitle}
            </p>
            <button
              type="button"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle admin menu"
              className="rounded p-1.5 text-slate-600 hover:bg-slate-100 sm:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </header>
          {mobileNavOpen && (
            <div className="flex max-h-[calc(100svh-4rem)] flex-col gap-4 overflow-y-auto border-t border-slate-200 p-4 sm:hidden dark:border-slate-800">
              <SidebarNav onNavigate={() => setMobileNavOpen(false)} />
              <SidebarFooter />
            </div>
          )}
        </div>

        <div className="flex-1 animate-fade-in p-4 sm:py-8 sm:pr-8 sm:pl-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
