import { Spinner } from "../../../components/ui/Spinner"
import { useGetProfileQuery } from "../../profile/profileApi"
import { Hero } from "../components/Hero"
import { SkillsSection } from "../components/SkillsSection"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Container } from "../../../components/ui/Container"
import { ExperienceTimeline } from "../components/ExperienceTimeline"

export default function HomePage() {
  const { data: profile, isLoading, isError } = useGetProfileQuery()

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <Container className="py-24 text-center">
        <p className="text-red-600 dark:text-red-400">
          Couldn't load profile data right now. Is the API running?
        </p>
      </Container>
    )
  }

  return (
    <>
      <Hero profile={profile} />
      <SkillsSection skills={profile.skills} />
      <Container className="py-16">
        <SectionHeading eyebrow="Journey" title="Experience" align="left" />
        <ExperienceTimeline experience={profile.experience} />
      </Container>
    </>
  )
}
