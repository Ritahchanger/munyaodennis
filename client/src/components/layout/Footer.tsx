import { ChevronRight } from "lucide-react"
import { SocialIconLink, getSocialIcon } from "../ui/SocialIconLink"
import { Container } from "../ui/Container"
import { useGetSocialLinksQuery } from "../../features/social-links/socialLinksApi"

export function Footer() {
  const { data: links } = useGetSocialLinksQuery()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <Container className="flex flex-col items-center gap-6">
        {/* Tablet/desktop: horizontal pill row */}
        <div className="hidden flex-wrap justify-center gap-3 sm:flex">
          {links?.map((link) => (
            <SocialIconLink key={link.id} platform={link.platform} label={link.label} url={link.url} />
          ))}
        </div>

        {/* Mobile: Android-style grouped list */}
        <div className="w-full divide-y divide-slate-100 overflow-hidden rounded border border-slate-200 dark:divide-slate-800 dark:border-slate-800 sm:hidden">
          {links?.map((link) => {
            const Icon = getSocialIcon(link.platform)
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-3 bg-white px-4 py-3 text-sm font-medium text-slate-700 active:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:active:bg-slate-800"
              >
                <Icon className="h-4 w-4 text-slate-400" />
                <span className="flex-1">{link.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </a>
            )
          })}
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} Dennis Munyao. Built with React, Tailwind, and .NET.
        </p>
      </Container>
    </footer>
  )
}
