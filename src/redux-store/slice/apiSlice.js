import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://dummy.restapiexample.com/api/v1",
   }),
   tagTypes: ["test"],
   endpoints: (builder) => ({}),
});
