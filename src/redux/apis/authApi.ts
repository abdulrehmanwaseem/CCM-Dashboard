import { apis } from "./baseApi";

const authApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/user",
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
  }),
});

export const {
  useGetUserProfileQuery,
  useVerifyTokenMutation,
  useLogoutMutation,
} = authApi;
