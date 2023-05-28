import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showTimedNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.anecdoteFilter),
    anecdotes = useSelector((state) =>
      state.anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
    );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      showTimedNotification(
        `voted anecdote "${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }"`
      )
    );
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
