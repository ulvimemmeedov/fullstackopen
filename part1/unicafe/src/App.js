import { useState } from 'react';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;

  const total = () => good + bad + neutral;
  const average = () => (good - bad) / total() || 0;
  const positivePercentage = () => (good / total()) * 100 || 0;

  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="total" value={total()} />
        <StatisticLine label="average" value={average()} />
        <StatisticLine label="positive" value={positivePercentage() + '%'} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label="good" onClick={() => setGood(good + 1)} />
      <Button label="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button label="bad" onClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
