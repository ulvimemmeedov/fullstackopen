import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../services/users';
import BlogCard from './BlogCard';

const User = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data?.find((user) => user.id === id),
    }),
  });

  return (
    <>
      <h2 className="text-xl mb-6">{user?.name}</h2>
      <h3 className="text-lg mb-3">blogs</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {user?.blogs?.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
      {(!user?.blogs?.length ?? true) && (
        <p className="text-slate-500">no blogs to display</p>
      )}
    </>
  );
};

export default User;
