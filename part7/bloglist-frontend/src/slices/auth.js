import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from '../services/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('auth')),
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (_state, { payload: user }) => {
        localStorage.setItem('auth', JSON.stringify(user));
        setAuthorizationHeader(user);
        return user;
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem('auth');
        setAuthorizationHeader(null);
        return null;
      });
  },
});

export const login = createAsyncThunk('auth/login', ({ username, password }) =>
  authService.login({ username, password })
);

export const logout = createAsyncThunk('auth/logout', () => {});

const setAuthorizationHeader = (user) => {
  if (user === null)
    return delete axios.defaults.headers.common['Authorization'];

  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
};

setAuthorizationHeader(authSlice.getInitialState());

export default authSlice.reducer;
