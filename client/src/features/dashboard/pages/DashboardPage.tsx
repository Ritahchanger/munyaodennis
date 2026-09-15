import { Link } from "react-router-dom"
import { FolderKanban, BookOpen, Newspaper, Share2, ArrowRight } from "lucide-react"
import { Card } from "../../../components/ui/Card"
import { Avatar } from "../../../components/ui/Avatar"
import { Badge } from "../../../components/ui/Badge"
import { buttonVariants } from "../../../components/ui/Button"
import { useAppSelector } from "../../../app/hooks"
import { useGetProjectsQuery } from "../../projects/projectsApi"
import { useGetWorksQuery } from "../../works/worksApi"
import { useGetArticlesQuery } from "../../medium/articlesApi"
import { useGetSocialLinksQuery } from "../../social-links/socialLinksApi"
import { StatCard } from "../components/StatCard"

const quickLinks = [
  {
    label: "Projects",
    description: "Add, edit, or remove the projects shown on the public Projects page.",
    to: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    label: "Social links",
    description: "Manage the profiles shown in the footer, the WhatsApp button, and GitHub/LinkedIn pages.",
    to: "/dashboard/social-links",
    icon: Share2,
  },
  {
    label: "Articles",
    description: "Manage what shows on the Medium and Substack pages.",
    to: "/dashboard/articles",
    icon: Newspaper,
  },
  {
    label: "Works",
    description: "Manage GitHub repos, system design notes, and Dev.to links on the Works page.",
    to: "/dashboard/works",
    icon: BookOpen,
  },
]

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user)

  const { data: projects } = useGetProjectsQuery()
  const { data: works } = useGetWorksQuery({ page: 1, pageSize: 1 })
  const { data: articles } = useGetArticlesQuery({ page: 1, pageSize: 1 })
  const { data: socialLinks } = useGetSocialLinksQuery()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A snapshot of what's currently live on the portfolio.
        </p>
      </div>

      <Card className="flex items-center gap-4">
        <Avatar name={user?.name ?? "?"} />
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{user?.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
        </div>
        <Badge className="ml-auto" variant="brand">
          {user?.role}
        </Badge>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={projects?.length} icon={FolderKanban} />
        <StatCard label="Works & references" value={works?.totalCount} icon={BookOpen} />
        <StatCard label="Articles" value={articles?.totalCount} icon={Newspaper} />
        <StatCard label="Social links" value={socialLinks?.length} icon={Share2} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((item) => (
          <Card key={item.to} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
            <Link to={item.to} className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Open
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
