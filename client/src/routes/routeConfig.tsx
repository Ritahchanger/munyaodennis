import { lazy, type LazyExoticComponent, type ComponentType } from "react"

export type RouteLayout = "main" | "auth" | "dashboard"

export interface RouteDefinition {
  path: string
  label: string
  element: LazyExoticComponent<ComponentType>
  layout: RouteLayout
  protected?: boolean
  showInNav?: boolean
}

export const routeConfig: RouteDefinition[] = [
  {
    path: "/",
    label: "Home",
    element: lazy(() => import("../features/home/pages/HomePage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/projects",
    label: "Projects",
    element: lazy(() => import("../features/projects/pages/ProjectsPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/projects/:slug",
    label: "Project detail",
    element: lazy(() => import("../features/projects/pages/ProjectDetailPage")),
    layout: "main",
    showInNav: false,
  },
  {
    path: "/github",
    label: "GitHub",
    element: lazy(() => import("../features/github/pages/GithubPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/linkedin",
    label: "LinkedIn",
    element: lazy(() => import("../features/linkedin/pages/LinkedInPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/medium",
    label: "Medium",
    element: lazy(() => import("../features/medium/pages/MediumPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/substack",
    label: "Substack",
    element: lazy(() => import("../features/substack/pages/SubstackPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/works",
    label: "Works",
    element: lazy(() => import("../features/works/pages/WorksPage")),
    layout: "main",
    showInNav: true,
  },
  {
    path: "/login",
    label: "Login",
    element: lazy(() => import("../features/auth/pages/LoginPage")),
    layout: "auth",
    showInNav: false,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    element: lazy(() => import("../features/dashboard/pages/DashboardPage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
  {
    path: "/dashboard/projects",
    label: "Manage Projects",
    element: lazy(() => import("../features/dashboard/pages/DashboardProjectsPage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
  {
    path: "/dashboard/social-links",
    label: "Manage Social Links",
    element: lazy(() => import("../features/dashboard/pages/DashboardSocialLinksPage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
  {
    path: "/dashboard/articles",
    label: "Manage Articles",
    element: lazy(() => import("../features/dashboard/pages/DashboardArticlesPage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
  {
    path: "/dashboard/works",
    label: "Manage Works",
    element: lazy(() => import("../features/dashboard/pages/DashboardWorksPage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    element: lazy(() => import("../features/dashboard/pages/DashboardProfilePage")),
    layout: "dashboard",
    protected: true,
    showInNav: false,
  },
]

export const navRoutes = routeConfig.filter((route) => route.showInNav)
