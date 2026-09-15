import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope } from "../../services/types"
import type { CreateProjectRequest, Project, UpdateProjectRequest } from "./types"

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      transformResponse: (response: ApiEnvelope<Project[]>) => unwrap(response),
      providesTags: ["Project"],
    }),
    getProjectBySlug: builder.query<Project, string>({
      query: (slug) => `/projects/${slug}`,
      transformResponse: (response: ApiEnvelope<Project>) => unwrap(response),
      providesTags: ["Project"],
    }),
    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<Project>) => unwrap(response),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation<Project, { id: string; body: UpdateProjectRequest }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: "PUT", body }),
      transformResponse: (response: ApiEnvelope<Project>) => unwrap(response),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: ["Project"],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi
