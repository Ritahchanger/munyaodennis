import { Briefcase, Code2, Play, Rss, PenSquare, Terminal, type LucideIcon } from "lucide-react"
import { WhatsAppIcon } from "./WhatsAppIcon"
import { cn } from "../../lib/utils"

type SocialIcon = LucideIcon | typeof WhatsAppIcon

const ICONS: Record<string, SocialIcon> = {
  github: Code2,
  linkedin: Briefcase,
  medium: PenSquare,
  substack: Rss,
  devto: Terminal,
  youtube: Play,
  whatsapp: WhatsAppIcon,
}

export function getSocialIcon(platform: string): SocialIcon {
  return ICONS[platform.toLowerCase()] ?? Rss
}

export interface SocialIconLinkProps {
  platform: string
  label: string
  url: string
  className?: string
}

export function SocialIconLink({ platform, label, url, className }: SocialIconLinkProps) {
  const Icon = getSocialIcon(platform)

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  )
}
