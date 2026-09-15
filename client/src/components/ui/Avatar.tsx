import { cn } from "../../lib/utils"

export interface AvatarProps {
  name: string
  src?: string
  className?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function Avatar({ name, src, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("h-10 w-10 rounded-full object-cover", className)}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white",
        className,
      )}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  )
}
