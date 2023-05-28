import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from './FormInput';
import { createBlogComment } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';
import Button from './Button';

const BlogCommentForm = ({ id }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(createBlogComment({ id, content }));
      dispatch(showTimedNotification(`posted comment "${content}"`));
      setContent('');
    } catch (exception) {
      dispatch(showTimedNotification(exception, true));
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <FormInput
        required
        placeholder="enter a comment here"
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      <Button>post</Button>
    </form>
  );
};

export default BlogCommentForm;
