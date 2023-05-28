import axios from 'axios';

const config = { baseURL: '/api/blogs' };

const create = ({ title, author, url }) =>
  axios.post('', { title, author, url }, config);

const getAll = () => axios.get('', config);

const like = ({ id, title, author, url, likes, user }) =>
  axios.put(
    id,
    { title, author, url, likes: likes + 1, user: user.id || user },
    config
  );

const destroy = (id) => axios.delete(id, config);

const blogService = { create, getAll, like, delete: destroy };
export default blogService;
