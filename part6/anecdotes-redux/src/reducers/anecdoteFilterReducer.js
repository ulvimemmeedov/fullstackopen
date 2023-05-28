import { createSlice } from '@reduxjs/toolkit';

const anecdoteFilterSlice = createSlice({
  name: 'anecdotefilter',
  initialState: '',
  reducers: {
    setFilter(_state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = anecdoteFilterSlice.actions;
export default anecdoteFilterSlice.reducer;
