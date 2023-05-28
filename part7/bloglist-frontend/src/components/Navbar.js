import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../slices/auth';
import { showTimedNotification } from '../slices/notification';
import Button from './Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showTimedNotification('logged out'));
  };

  const links = {
    blogs: '/',
    users: '/users',
  };

  return (
    <div className="flex justify-between items-center p-3 rounded bg-slate-400 text-slate-50">
      <div className="flex gap-3">
        {Object.keys(links).map((name) => (
          <NavLink
            to={links[name]}
            className={({ isActive }) =>
              `${isActive && 'underline'} hover:text-slate-200`
            }
            key={name}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <div>
        hello, {auth.name} 👋
        <span className="ml-3">
          <Button onClick={handleLogout}>log out</Button>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
