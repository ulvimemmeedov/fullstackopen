import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../services/users';
import Card from './Card';

const Users = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <>
      <h2 className="text-xl mb-6">users</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {users?.map((user) => (
          <Link to={user.id} key={user.id}>
            <Card title={user.name}>
              <p className="text-sm text-slate-400">
                {user.blogs?.length ?? 0} blog{user.blogs?.length !== 1 && 's'}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Users;
