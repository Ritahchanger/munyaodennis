import { Briefcase } from "lucide-react"
import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Card } from "../../../components/ui/Card"
import { buttonVariants } from "../../../components/ui/Button"
import { Spinner } from "../../../components/ui/Spinner"
import { useGetSocialLinksQuery } from "../../social-links/socialLinksApi"
import { useGetProfileQuery } from "../../profile/profileApi"
import { ExperienceTimeline } from "../../home/components/ExperienceTimeline"

export default function LinkedInPage() {
  const { data: links } = useGetSocialLinksQuery()
  const { data: profile, isLoading, isError } = useGetProfileQuery()
  const linkedin = links?.find((link) => link.platform === "linkedin")

  return (
    <Container className="max-w-3xl py-16">
      <SectionHeading eyebrow="Resume" title="LinkedIn & experience" align="left" />
      <Card className="mb-10 flex flex-col items-start gap-4">
        <Briefcase className="h-10 w-10 text-brand-600 dark:text-brand-400" />
        <p className="text-slate-600 dark:text-slate-400">
          Connect with me on LinkedIn for updates, recommendations, and networking.
        </p>
        <a
          href={linkedin?.url ?? "https://www.linkedin.com/in/munyao-dennis/"}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonVariants()}
        >
          View LinkedIn profile
        </a>
      </Card>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8 text-brand-600" />
        </div>
      )}
      {isError && (
        <p className="text-red-600 dark:text-red-400">Couldn't load experience right now.</p>
      )}
      {profile && <ExperienceTimeline experience={profile.experience} />}
    </Container>
  )
}
