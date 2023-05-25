import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const venueApi = createApi({
  reducerPath: "venueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nf-api.onrender.com/api/v1/holidaze",
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(
        localStorage.getItem("authentication")
      ).accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Venue"],
  endpoints: (builder) => ({
    getVenues: builder.query({
      query: () => `/venues`,
      providesTags: ["Venue"],
    }),
    getVenue: builder.query({
      query: (id) => `/venues/${id}`,
      providesTags: ["Venue"],
    }),
    getVenuesByProfile: builder.query({
      query: (id) => `/profiles/${id}/venues`,
      providesTags: ["Venue"],
    }),
    createVenue: builder.mutation({
      query: (data) => ({
        url: "/venues",
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Venue"],
    }),
    bookVenue: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Venue"],
    }),
    updateVenue: builder.mutation({
      query: (data) => ({
        url: `/venues/${data.id}`,
        method: "PUT",

        body: data.data,
      }),
      invalidatesTags: ["Venue"],
    }),
    deleteVenue: builder.mutation({
      query: (id) => ({
        url: `/venues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Venue"],
    }),
  }),
});

export const {
  useCreateVenueMutation,
  useGetVenuesQuery,
  useGetVenueQuery,
  useGetVenuesByProfileQuery,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
  useBookVenueMutation
} = venueApi;
