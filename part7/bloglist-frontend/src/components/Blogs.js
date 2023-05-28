import { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const blogFormToggalble = useRef();

  const handleCreateBlog = () => blogFormToggalble.current.toggleVisibility();

  return (
    <>
      <h2 className="text-xl">create</h2>
      <Togglable buttonLabel="new blog" ref={blogFormToggalble}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
      <h2 className="text-xl mt-6 mb-3">browse</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
      </div>
    </>
  );
};

export default Blogs;
