import { baseApi } from "../../services/baseApi"
import { unwrap, type ApiEnvelope } from "../../services/types"
import type { AuthResponse, ChangePasswordRequest, LoginRequest, User } from "./types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiEnvelope<AuthResponse>) => unwrap(response),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      transformResponse: (response: ApiEnvelope<User>) => unwrap(response),
      providesTags: ["CurrentUser"],
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useGetCurrentUserQuery, useChangePasswordMutation } = authApi
