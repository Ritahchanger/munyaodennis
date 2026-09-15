import { Moon, Sun } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleTheme } from "../../features/ui/uiSlice"

export function ThemeToggle() {
  const theme = useAppSelector((state) => state.ui.theme)
  const dispatch = useAppDispatch()

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
