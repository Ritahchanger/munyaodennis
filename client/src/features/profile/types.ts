export interface SkillGroup {
  category: string
  items: string[]
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location?: string
  employmentType?: string
  url?: string
  current: boolean
  highlights: string[]
}

export interface EducationEntry {
  institution: string
  program: string
  period: string
  details: string[]
}

export interface AchievementEntry {
  title: string
  period: string
  description: string
}

export interface DeveloperProfile {
  fullName: string
  title: string
  location: string
  summary: string
  email: string
  phone: string
  skills: SkillGroup[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  achievements: AchievementEntry[]
}
