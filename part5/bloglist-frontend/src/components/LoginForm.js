import { useState } from 'react';
import authService from '../services/auth';

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await authService.login({ username, password });
      setUser(user);
      setUsername('');
      showNotification(`logged in as ${user.name}`);
    } catch (exception) {
      showNotification(exception, true);
    }

    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          name="username"
          type="text"
          required
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label>
        password
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit">log in</button>
    </form>
  );
};

export default LoginForm;
