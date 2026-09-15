import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AppRoutes } from "./routes/AppRoutes"
import { useAppSelector } from "./app/hooks"
import { UpdatePrompt } from "./components/pwa/UpdatePrompt"
import { InstallPrompt } from "./components/pwa/InstallPrompt"

function App() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <BrowserRouter>
      <AppRoutes />
      <UpdatePrompt />
      <InstallPrompt />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#0f172a",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "3px",
            fontSize: "0.875rem",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#0f172a" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#0f172a" } },
        }}
      />
    </BrowserRouter>
  )
}

export default App
