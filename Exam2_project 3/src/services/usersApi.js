import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.noroff.dev/api/v1/holidaze/auth/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signInUser: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
// naming convention is if the name of end point user => useUserQuery/ getUser => useGetUserQuery
export const { useAddUserMutation, useSignInUserMutation } =
  usersApi;
