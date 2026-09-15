import { useId } from "react"
import { cn } from "../../lib/utils"

export function Logo({ className }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-8 w-8 shrink-0", className)}
      role="img"
      aria-label="Dennis Munyao logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill={`url(#${gradientId})`} />
      <path d="M16,28 H25 A22,22 0 0 1 25,72 H16 Z" fill="#ffffff" />
      <path
        d="M52,72 L52,28 L68,54 L84,28 L84,72"
        fill="none"
        stroke="#ffffff"
        strokeWidth={9}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle cx="90" cy="68" r="4.5" fill="#93c5fd" />
    </svg>
  )
}
