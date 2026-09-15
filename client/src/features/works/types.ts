export interface Work {
  id: string
  category: string
  name: string
  url: string
  type: "github" | "article"
  order: number
}

export type CreateWorkRequest = Omit<Work, "id">
export type UpdateWorkRequest = CreateWorkRequest
