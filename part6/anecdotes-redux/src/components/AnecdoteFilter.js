import { connect } from 'react-redux';
import { setFilter } from '../reducers/anecdoteFilterReducer';

const AnecdoteFilter = ({ setFilter }) => {
  const handleChange = ({ target }) => setFilter(target.value);

  const style = {
    marginBottom: 10,
    marginTop: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(null, { setFilter })(AnecdoteFilter);
