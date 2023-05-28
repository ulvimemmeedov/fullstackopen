import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteBlog, likeBlog } from '../slices/blog';
import { showTimedNotification } from '../slices/notification';
import BlogComments from './BlogComments';
import Button from './Button';
import Card from './Card';

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) return null;

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(showTimedNotification(`liked blog "${blog.title}"`));
  };

  const handleDelete = async () => {
    if (!window.confirm(`delete blog "${blog.title}"?`)) return;

    try {
      await dispatch(deleteBlog(blog));
      dispatch(showTimedNotification(`deleted blog "${blog.title}"`));
      navigate('/');
    } catch (exception) {
      dispatch(showTimedNotification(exception, true));
    }
  };

  return (
    <div>
      <Card>
        <h2 className="text-xl font-serif">{blog.title}</h2>
        <div className="flex justify-between gap-2">
          <div>
            <a
              className="break-all text-slate-500 hover:text-slate-700"
              target="_blank"
              rel="noreferrer"
              href={blog.url}
            >
              {blog.url}
            </a>
            <p>{blog.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-4xl text-slate-400">{blog.likes}</p>
            <Button primary onClick={handleLike}>
              &#x25B2;
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-slate-400">
            added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </p>
          {blog.user.username === auth.username && (
            <Button onClick={handleDelete}>delete</Button>
          )}
        </div>
      </Card>
      <div className="mb-4" />
      <BlogComments />
    </div>
  );
};

export default Blog;
