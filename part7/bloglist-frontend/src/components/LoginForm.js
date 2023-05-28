import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/auth';
import { showTimedNotification } from '../slices/notification';
import Button from './Button';
import FormInput from './FormInput';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(login({ username, password })).unwrap();
      setUsername('');
      dispatch(showTimedNotification(`logged in as ${user.name}`));
    } catch ({ message }) {
      dispatch(showTimedNotification(message, true));
    }

    setPassword('');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <div className="flex gap-2">
        <FormInput
          name="username"
          label="username"
          type="text"
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <FormInput
          name="password"
          label="password"
          type="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div className="ml-auto">
        <Button primary>log in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
