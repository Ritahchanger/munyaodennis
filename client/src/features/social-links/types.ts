export interface SocialLink {
  id: string
  platform: string
  label: string
  url: string
  handle?: string
  order: number
}

export type CreateSocialLinkRequest = Omit<SocialLink, "id">
export type UpdateSocialLinkRequest = CreateSocialLinkRequest
