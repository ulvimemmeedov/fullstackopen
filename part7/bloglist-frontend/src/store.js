import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './services/base';
import authReducer from './slices/auth';
import blogReducer from './slices/blog';
import notificationReducer from './slices/notification';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
