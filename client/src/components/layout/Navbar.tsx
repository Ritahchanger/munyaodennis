import { Link, NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/auth/authSlice"
import { navRoutes } from "../../routes/routeConfig"
import { ThemeToggle } from "../ui/ThemeToggle"
import { buttonVariants } from "../ui/Button"
import { Logo } from "../ui/Logo"
import { cn } from "../../lib/utils"

export function Navbar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive
        ? "text-brand-600 dark:text-brand-400"
        : "text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400",
    )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <Logo />
          <span>
            Dennis<span className="text-brand-600 dark:text-brand-400">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navRoutes.map((route) => (
            <NavLink key={route.path} to={route.path} end={route.path === "/"} className={linkClass}>
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={buttonVariants({ variant: "secondary", size: "sm" })}>
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={buttonVariants({ size: "sm" })}>
              Login
            </Link>
          )}
        </div>

        {/* Mobile: primary navigation lives in the bottom tab bar, so the top bar
            stays a lightweight app-bar with just the brand mark and theme toggle. */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
