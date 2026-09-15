import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "./types"

const AUTH_STORAGE_KEY = "portfolio_auth"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

interface StoredAuth {
  user: User
  token: string
}

function getInitialState(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoredAuth
      return { user: parsed.user, token: parsed.token, isAuthenticated: true }
    }
  } catch {
    // corrupt/unavailable storage — start logged out
  }
  return { user: null, token: null, isAuthenticated: false }
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      try {
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ user: action.payload.user, token: action.payload.token }),
        )
      } catch {
        // ignore persistence failures
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch {
        // ignore
      }
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
