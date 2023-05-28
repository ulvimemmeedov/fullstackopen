import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK } from '../graphql/mutations';
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../graphql/queries';
import { addOrUpdateCachedQueryArrayItem } from '../graphql/utils';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) return null;

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { author, genres, published: +published, title },

      update: (cache, { data: { addBook: book } }) => {
        addOrUpdateCachedQueryArrayItem(
          cache,
          { query: GET_ALL_AUTHORS },
          book.author
        );

        [{ query: GET_ALL_BOOKS }]
          .concat(
            genres.map((g) => ({
              query: GET_ALL_BOOKS,
              variables: { genre: g },
            }))
          )
          .forEach((query) =>
            addOrUpdateCachedQueryArrayItem(cache, query, book)
          );
      },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
