import { useState, type FormEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import type { LoginRequest } from "../types"

export interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" className="mt-2" isLoading={isLoading}>
        Sign in
      </Button>
    </form>
  )
}
