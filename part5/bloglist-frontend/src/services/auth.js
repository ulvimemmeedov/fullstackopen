import axios from 'axios';

const config = { baseURL: '/api/auth' };

const login = ({ username, password }) =>
  axios.post('', { username, password }, config);

const authService = { login };
export default authService;
