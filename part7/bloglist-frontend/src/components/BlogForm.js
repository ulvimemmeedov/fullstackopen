import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput';
import { createBlog } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';
import Button from './Button';

const BlogForm = ({ onCreate }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const blog = { title, author, url, user };
      await dispatch(createBlog(blog));
      onCreate(blog);
      setTitle('');
      setAuthor('');
      setUrl('');
      dispatch(showTimedNotification(`added blog "${title}" by "${author}"`));
    } catch (exception) {
      dispatch(showTimedNotification(exception, true));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 mb-2">
        <FormInput
          label="title"
          value={title}
          required
          onChange={({ target }) => setTitle(target.value)}
        />
        <FormInput
          label="author"
          value={author}
          required
          onChange={({ target }) => setAuthor(target.value)}
        />
        <FormInput
          label="url"
          value={url}
          required
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button primary>create</Button>
    </form>
  );
};

export default BlogForm;
