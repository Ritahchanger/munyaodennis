import { useRegisterSW } from "virtual:pwa-register/react"
import { RefreshCw, X } from "lucide-react"
import { Button } from "../ui/Button"

export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Check for a new service worker every hour so long-lived tabs pick up updates.
      registration && setInterval(() => registration.update(), 60 * 60 * 1000)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm items-start gap-3 rounded border border-slate-200 bg-white p-4 shadow-lg sm:left-auto sm:right-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex-1 text-sm">
        {needRefresh ? (
          <>
            <p className="font-medium text-slate-900 dark:text-white">Update available</p>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400">
              A new version of this portfolio is ready.
            </p>
            <Button
              size="sm"
              className="mt-3"
              onClick={() => updateServiceWorker(true)}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reload to update
            </Button>
          </>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">
            This app is ready to work offline.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
