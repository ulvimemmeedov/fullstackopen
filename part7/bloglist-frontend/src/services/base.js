import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
