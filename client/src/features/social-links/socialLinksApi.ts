import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope } from "../../services/types"
import type { CreateSocialLinkRequest, SocialLink, UpdateSocialLinkRequest } from "./types"

export const socialLinksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialLinks: builder.query<SocialLink[], void>({
      query: () => "/social-links",
      transformResponse: (response: ApiEnvelope<SocialLink[]>) => unwrap(response),
      providesTags: ["SocialLink"],
    }),
    createSocialLink: builder.mutation<SocialLink, CreateSocialLinkRequest>({
      query: (body) => ({ url: "/social-links", method: "POST", body }),
      transformResponse: (response: ApiEnvelope<SocialLink>) => unwrap(response),
      invalidatesTags: ["SocialLink"],
    }),
    updateSocialLink: builder.mutation<SocialLink, { id: string; body: UpdateSocialLinkRequest }>({
      query: ({ id, body }) => ({ url: `/social-links/${id}`, method: "PUT", body }),
      transformResponse: (response: ApiEnvelope<SocialLink>) => unwrap(response),
      invalidatesTags: ["SocialLink"],
    }),
    deleteSocialLink: builder.mutation<void, string>({
      query: (id) => ({ url: `/social-links/${id}`, method: "DELETE" }),
      invalidatesTags: ["SocialLink"],
    }),
  }),
})

export const {
  useGetSocialLinksQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} = socialLinksApi
