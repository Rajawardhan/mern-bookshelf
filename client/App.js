import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Bookshelf from './components/Bookshelf';
import authService from './services/authService';
import bookService from './services/bookService';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = async (username, password) => {
    const user = await authService.login(username, password);
    setUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const handleSearch = async (searchTerm) => {
    const books = await bookService.searchBooks(searchTerm);
    setBooks(books);
  };

  const handleBookSelect = async (book) => {
    setSelectedBook(book);
    await bookService.addBook(user.id, book);
  };

  const handleBookDelete = async (bookId) => {
    await bookService.deleteBook(user.id, bookId);
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {user ? <Bookshelf user={user} onSelect={setSelectedBook} onDelete={handleBookDelete} /> : <LoginForm onLogin={handleLogin} />}
            </Route>
            <Route path="/search">
              <SearchForm onSearch={handleSearch} />
              <BookList books={books} onBookSelect={handleBookSelect} />
            </Route>
            <Route path="/book/:id">
              <BookDetail book={selectedBook} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
