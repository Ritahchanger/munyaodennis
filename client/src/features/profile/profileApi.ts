import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope } from "../../services/types"
import type { DeveloperProfile } from "./types"

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<DeveloperProfile, void>({
      query: () => "/profile",
      transformResponse: (response: ApiEnvelope<DeveloperProfile>) => unwrap(response),
      providesTags: ["Profile"],
    }),
  }),
})

export const { useGetProfileQuery } = profileApi
