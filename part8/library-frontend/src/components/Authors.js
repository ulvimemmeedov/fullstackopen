import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { EDIT_AUTHOR } from '../graphql/mutations';
import { GET_ALL_AUTHORS } from '../graphql/queries';

const Authors = (props) => {
  const { data, loading } = useQuery(GET_ALL_AUTHORS);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show || loading) return null;

  const authors = data.allAuthors;

  const handleSubmit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: +year } });

    setName('');
    setYear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.authToken && (
        <>
          <h3>set birthyear</h3>
          <form onSubmit={handleSubmit}>
            <label>
              name
              <select
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                <option value="" disabled hidden>
                  select an author
                </option>
                {authors.map((a) => (
                  <option key={a.id}>{a.name}</option>
                ))}
              </select>
            </label>
            <br />
            <label>
              year
              <input
                required
                type="number"
                value={year}
                onChange={({ target }) => setYear(target.value)}
              ></input>
            </label>
            <br />
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
