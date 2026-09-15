import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { MainLayout } from "../components/layout/MainLayout"
import { AuthLayout } from "../components/layout/AuthLayout"
import { DashboardLayout } from "../components/layout/DashboardLayout"
import { Spinner } from "../components/ui/Spinner"
import { ProtectedRoute } from "./ProtectedRoute"
import { routeConfig } from "./routeConfig"
import NotFoundPage from "../features/not-found/pages/NotFoundPage"

const withSuspense = (Element: React.ComponentType) => (
  <Suspense
    fallback={
      <div className="flex flex-1 items-center justify-center py-24">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    }
  >
    <Element />
  </Suspense>
)

export function AppRoutes() {
  const mainRoutes = routeConfig.filter((route) => route.layout === "main")
  const authRoutes = routeConfig.filter((route) => route.layout === "auth")
  const dashboardRoutes = routeConfig.filter((route) => route.layout === "dashboard")

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {mainRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={withSuspense(route.element)} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={withSuspense(route.element)} />
        ))}
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {dashboardRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={withSuspense(route.element)} />
          ))}
        </Route>
      </Route>
    </Routes>
  )
}
