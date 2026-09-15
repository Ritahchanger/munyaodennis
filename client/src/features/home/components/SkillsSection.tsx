import { Container } from "../../../components/ui/Container"
import { SectionHeading } from "../../../components/ui/SectionHeading"
import { Badge } from "../../../components/ui/Badge"
import type { SkillGroup } from "../../profile/types"

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Toolbox" title="Skills & technologies" />
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="brand">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
