import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope, type PagedResult } from "../../services/types"
import type { Article, CreateArticleRequest, UpdateArticleRequest, ArticleSource } from "./types"

export interface GetArticlesArgs {
  source?: ArticleSource
  search?: string
  page?: number
  pageSize?: number
}

export const articlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<PagedResult<Article>, GetArticlesArgs | void>({
      query: (arg) => ({
        url: "/articles",
        params: {
          source: arg?.source,
          search: arg?.search || undefined,
          page: arg?.page ?? 1,
          pageSize: arg?.pageSize ?? 6,
        },
      }),
      transformResponse: (response: ApiEnvelope<PagedResult<Article>>) => unwrap(response),
      providesTags: ["Article"],
    }),
    createArticle: builder.mutation<Article, CreateArticleRequest>({
      query: (body) => ({ url: "/articles", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Article>) => unwrap(response),
      invalidatesTags: ["Article"],
    }),
    updateArticle: builder.mutation<Article, { id: string; body: UpdateArticleRequest }>({
      query: ({ id, body }) => ({ url: `/articles/${id}`, method: "PUT", body }),
      transformResponse: (response: ApiEnvelope<Article>) => unwrap(response),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({ url: `/articles/${id}`, method: "DELETE" }),
      invalidatesTags: ["Article"],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi
