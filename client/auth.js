import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const register = async (username, email, password) => {
  const response = await axios.post(`${baseURL}/users/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${baseURL}/users/login`, {
    email,
    password,
  });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const response = await axios.get(`${baseURL}/users/me`, config);
    return response.data;
  }
};

export { register, login, logout, getCurrentUser };
