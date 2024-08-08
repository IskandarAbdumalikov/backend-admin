import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getUsersBySearch: build.query({
      query: (params) => ({
        url: "/users/search",
        params,
      }),
      providesTags: ["User"],
    }),
    getProfile: build.query({
      query: (params) => ({
        url: "/profile",
        params,
      }),
      providesTags: ["User"],
    }),
    updateProfile: build.mutation({
      query: ({ id, body }) => ({
        url: `/profile/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: `/password`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/users/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/users/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useRegisterUserMutation,
  useSignInMutation,
  useGetUsersBySearchQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
} = userApi;
