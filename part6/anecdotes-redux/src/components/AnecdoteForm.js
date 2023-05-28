import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showTimedNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdote(content);
    showTimedNotification(`created anecdote "${content}"`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input required name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default connect(null, { createAnecdote, showTimedNotification })(
  AnecdoteForm
);
