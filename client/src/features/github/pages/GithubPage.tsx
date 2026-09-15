import { Code2 } from "lucide-react"
import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Card } from "../../../components/ui/Card"
import { buttonVariants } from "../../../components/ui/Button"
import { Spinner } from "../../../components/ui/Spinner"
import { useGetSocialLinksQuery } from "../../social-links/socialLinksApi"

export default function GithubPage() {
  const { data: links, isLoading } = useGetSocialLinksQuery()
  const github = links?.find((link) => link.platform === "github")

  return (
    <Container className="max-w-2xl py-16">
      <SectionHeading eyebrow="Open source" title="GitHub" align="left" />
      <Card className="flex flex-col items-start gap-4">
        <Code2 className="h-10 w-10 text-brand-600 dark:text-brand-400" />
        <p className="text-slate-600 dark:text-slate-400">
          Repositories, contributions, and side projects live on GitHub.
        </p>
        {/*
          Future work: pull live contribution/stats data from the GitHub REST/GraphQL API
          (repo count, stars, contribution graph) via a dedicated backend endpoint that
          proxies GitHub — not implemented yet, so we only link out for now.
        */}
        {isLoading ? (
          <Spinner className="h-6 w-6 text-brand-600" />
        ) : (
          <a
            href={github?.url ?? "https://github.com/"}
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants()}
          >
            Visit GitHub profile
          </a>
        )}
      </Card>
    </Container>
  )
}
