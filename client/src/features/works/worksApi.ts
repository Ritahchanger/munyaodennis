import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope, type PagedResult } from "../../services/types"
import type { CreateWorkRequest, UpdateWorkRequest, Work } from "./types"

export interface GetWorksArgs {
  category?: string
  search?: string
  page?: number
  pageSize?: number
}

export const worksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorks: builder.query<PagedResult<Work>, GetWorksArgs | void>({
      query: (arg) => ({
        url: "/works",
        params: {
          category: arg?.category,
          search: arg?.search || undefined,
          page: arg?.page ?? 1,
          pageSize: arg?.pageSize ?? 8,
        },
      }),
      transformResponse: (response: ApiEnvelope<PagedResult<Work>>) => unwrap(response),
      providesTags: ["Work"],
    }),
    getWorkCategories: builder.query<string[], void>({
      query: () => "/works/categories",
      transformResponse: (response: ApiEnvelope<string[]>) => unwrap(response),
      providesTags: ["Work"],
    }),
    createWork: builder.mutation<Work, CreateWorkRequest>({
      query: (body) => ({ url: "/works", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Work>) => unwrap(response),
      invalidatesTags: ["Work"],
    }),
    updateWork: builder.mutation<Work, { id: string; body: UpdateWorkRequest }>({
      query: ({ id, body }) => ({ url: `/works/${id}`, method: "PUT", body }),
      transformResponse: (response: ApiEnvelope<Work>) => unwrap(response),
      invalidatesTags: ["Work"],
    }),
    deleteWork: builder.mutation<void, string>({
      query: (id) => ({ url: `/works/${id}`, method: "DELETE" }),
      invalidatesTags: ["Work"],
    }),
  }),
})

export const {
  useGetWorksQuery,
  useGetWorkCategoriesQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
} = worksApi
