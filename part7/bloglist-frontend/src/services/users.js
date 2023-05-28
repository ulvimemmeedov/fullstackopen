import { baseApi } from './base';

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
