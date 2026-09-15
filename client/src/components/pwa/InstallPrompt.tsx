import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { Button } from "../ui/Button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const DISMISSED_KEY = "portfolio_pwa_install_dismissed"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (event: Event) => {
      if (localStorage.getItem(DISMISSED_KEY)) return
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(DISMISSED_KEY, "1")
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded border border-slate-200 bg-white p-4 shadow-lg sm:left-4 sm:right-auto dark:border-slate-700 dark:bg-slate-900">
      <div className="flex-1 text-sm">
        <p className="font-medium text-slate-900 dark:text-white">Install this app</p>
        <p className="mt-0.5 text-slate-500 dark:text-slate-400">
          Add this portfolio to your device for quick, offline-friendly access.
        </p>
        <Button size="sm" className="mt-3" onClick={install}>
          <Download className="h-3.5 w-3.5" />
          Install
        </Button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
