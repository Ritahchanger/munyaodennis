import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card } from "../../../components/ui/Card"
import { useAppDispatch } from "../../../app/hooks"
import { useLoginMutation } from "../authApi"
import { setCredentials } from "../authSlice"
import { LoginForm } from "../components/LoginForm"
import type { LoginRequest } from "../types"

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation()
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/dashboard"

  async function handleSubmit(credentials: LoginRequest) {
    setError(null)
    try {
      const result = await login(credentials).unwrap()
      dispatch(setCredentials({ user: result.user, token: result.token }))
      navigate(from, { replace: true })
    } catch {
      setError("Invalid email or password.")
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <h1 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">Sign in</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Access the portfolio's admin dashboard.
      </p>

      <div className="mb-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-200">
        <p className="font-medium">Demo credentials</p>
        <p className="mt-1 font-mono text-xs">admin@portfolio.dev / Admin@123</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
          {error}
        </div>
      )}

      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </Card>
  )
}
