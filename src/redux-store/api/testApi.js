import { apiSlice } from "../slice/apiSlice";

const testApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getDummy: builder.query({
         query: () => ({
            url: `/employees`,
         }),
         providesTags: ["test"],
      }),
   }),
});

export const { useGetDummyQuery } = testApi;
