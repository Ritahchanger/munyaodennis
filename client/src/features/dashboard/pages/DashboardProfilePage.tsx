import { Moon, Sun } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Avatar } from "../../../components/ui/Avatar"
import { Badge } from "../../../components/ui/Badge"
import { cn } from "../../../lib/utils"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toggleTheme } from "../../ui/uiSlice"
import { ChangePasswordForm } from "../components/ChangePasswordForm"

export default function DashboardProfilePage() {
  const user = useAppSelector((state) => state.auth.user)
  const theme = useAppSelector((state) => state.ui.theme)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your account and admin preferences.
        </p>
      </div>

      <Card className="flex items-center gap-4">
        <Avatar name={user?.name ?? "?"} />
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{user?.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
        </div>
        <Badge className="ml-auto" variant="brand">
          {user?.role}
        </Badge>
      </Card>

      <Card className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Change password</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update the password used to sign in to this admin area.
          </p>
        </div>
        <ChangePasswordForm />
      </Card>

      <Card className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Preferences</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configuration for how the admin area looks on this device.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</span>
          <div className="inline-flex overflow-hidden rounded border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => theme === "dark" && dispatch(toggleTheme())}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors",
                theme === "light"
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
            </button>
            <button
              type="button"
              onClick={() => theme === "light" && dispatch(toggleTheme())}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors",
                theme === "dark"
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
              )}
            >
              <Moon className="h-3.5 w-3.5" />
              Dark
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
