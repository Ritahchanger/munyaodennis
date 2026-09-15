import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Theme = "light" | "dark"

interface UiState {
  theme: Theme
  sidebarOpen: boolean
}

const THEME_STORAGE_KEY = "portfolio_theme"

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
  } catch {
    // localStorage unavailable — fall through to media query
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return "light"
}

const initialState: UiState = {
  theme: getInitialTheme(),
  sidebarOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark"
      try {
        localStorage.setItem(THEME_STORAGE_KEY, state.theme)
      } catch {
        // ignore persistence failures (private mode, etc.)
      }
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { toggleTheme, setSidebarOpen } = uiSlice.actions
export default uiSlice.reducer
