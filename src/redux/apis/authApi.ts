import { apis } from "./baseApi";

const authApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/me",
      }),
      providesTags: ["Auth"],
    }),
    verifyToken: builder.mutation({
      query: ({ access_token, refresh_token }) => ({
        url: "auth/verify-token",
        method: "POST",
        body: {
          access_token,
          refresh_token,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "auth/google",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useVerifyTokenMutation,
  useLogoutMutation,
  useGoogleAuthMutation,
} = authApi;
