import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const searchBooks = async (query) => {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  return response.data.items;
};

const addBook = async (book) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const response = await axios.post(`${baseURL}/books`, book, config);
  return response.data;
};

const getBooks = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const response = await axios.get(`${baseURL}/books`, config);
  return response.data;
};

const updateBook = async (id, book) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const response = await axios.put(`${baseURL}/books/${id}`, book, config);
  return response.data;
};

const deleteBook = async (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const response = await axios.delete(`${baseURL}/books/${id}`, config);
  return response.data;
};

export { searchBooks, addBook, getBooks, updateBook, deleteBook };
