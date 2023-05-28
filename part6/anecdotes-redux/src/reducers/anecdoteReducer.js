import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, { payload: anecdote }) {
      state.push(anecdote);
    },
    setAnecdotes(_state, { payload }) {
      return payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) =>
  dispatch(setAnecdotes(await anecdoteService.getAll()));

export const createAnecdote = (content) => async (dispatch) =>
  dispatch(appendAnecdote(await anecdoteService.create(content)));

export const voteAnecdote = (id) => async (dispatch, getState) => {
  const { votes } = getState().anecdotes.find((anecdote) => anecdote.id === id),
    anecdote = await anecdoteService.setVotes(id, votes + 1);

  dispatch(
    setAnecdotes(getState().anecdotes.map((a) => (a.id !== id ? a : anecdote)))
  );
};

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
