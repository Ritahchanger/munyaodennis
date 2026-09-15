import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { env } from "../config/env"
import type { RootState } from "../app/store"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Project", "SocialLink", "Profile", "Article", "CurrentUser", "Work"],
  endpoints: () => ({}),
})
