export type ArticleSource = "medium" | "substack"

export interface Article {
  id: string
  source: ArticleSource
  title: string
  url: string
  excerpt: string
  imageUrl?: string
  publishedAt: string
  tags: string[]
}

export type CreateArticleRequest = Omit<Article, "id">
export type UpdateArticleRequest = CreateArticleRequest
