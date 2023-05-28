import axios from 'axios';

const config = { baseURL: '/api/blogs' };

const create = ({ title, author, url }) =>
  axios.post('', { title, author, url }, config);

const getAll = () => axios.get('', config);

const like = ({ id, title, author, url, likes, user, comments }) =>
  axios.put(
    id,
    { title, author, url, likes: likes + 1, user: user.id || user, comments },
    config
  );

const createComment = ({ id, content }) =>
  axios.post(`${id}/comments`, { content }, config);

const destroy = (id) => axios.delete(id, config);

const blogService = { create, getAll, like, createComment, delete: destroy };
export default blogService;
