import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Google Book Shelf</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated && (
            <li className="nav-item">
              <Link className="nav-link" to="/bookshelf">Bookshelf</Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/search">Search</Link>
          </li>
        </ul>
        {isAuthenticated && (
          <button className="btn btn-outline-secondary" onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
