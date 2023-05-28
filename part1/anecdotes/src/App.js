import { useState } from 'react';

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </div>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const selectRandomAnecdote = () => {
    let index = Math.floor(Math.random() * (anecdotes.length - 1));
    if (index === selected) return selectRandomAnecdote();
    setSelected(index);
  };

  const voteSelectedAnecdote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const mostVotedAnecdoteIndex = points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Random anecdote</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <button onClick={voteSelectedAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <h1>Top voted anecdote</h1>
      <Anecdote
        anecdote={anecdotes[mostVotedAnecdoteIndex]}
        votes={points[mostVotedAnecdoteIndex]}
      />
    </div>
  );
};

export default App;
