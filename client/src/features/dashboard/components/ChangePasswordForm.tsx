import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { Input } from "../../../components/ui/Input"
import { Button } from "../../../components/ui/Button"
import { useChangePasswordMutation } from "../../auth/authApi"

function extractErrorMessage(error: unknown, fallback: string): string {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof (error.data as { message?: unknown }).message === "string"
  ) {
    return (error.data as { message: string }).message
  }
  return fallback
}

export function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation don't match.")
      return
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap()
      toast.success("Password updated.")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(extractErrorMessage(error, "Couldn't update your password. Please try again."))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Current password"
        type="password"
        autoComplete="current-password"
        required
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" className="mt-2 w-fit" isLoading={isLoading}>
        Update password
      </Button>
    </form>
  )
}
