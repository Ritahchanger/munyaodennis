export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface AuthResponse {
  token: string
  expiresAt: string
  user: User
}
