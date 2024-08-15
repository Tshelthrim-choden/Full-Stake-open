import axios from 'axios';
const baseUrl = 'http://localhost:3003/api';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/blogs`, config);
  return response.data;
};

export default { login, getAll, setToken };
