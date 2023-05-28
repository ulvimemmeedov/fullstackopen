import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteFilter from './components/AnecdoteFilter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
