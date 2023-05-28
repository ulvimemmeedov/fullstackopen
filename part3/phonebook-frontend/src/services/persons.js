import axios from 'axios';

const instance = axios.create({ baseURL: '/api/persons' });

instance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error?.response?.data?.error)
);

const getAll = () => instance.get();

const create = (data) => instance.post('', data);

const update = (id, data) => instance.put(id.toString(), data);

const destroy = (id) => instance.delete(id.toString());

const personService = { getAll, create, update, destroy };
export default personService;
