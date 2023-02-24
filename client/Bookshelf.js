import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks, addBook, getBooks, updateBook, deleteBook } from '../services/bookService';
const Bookshelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await bookService.getBooks();
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    await bookService.deleteBook(bookId);
    setBooks(books.filter(book => book._id !== bookId));
  };

  return (
    <div>
      <h1>My Bookshelf</h1>
      <Link to="/search">Search for books</Link>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>{book.title}</Link>
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookshelf;
