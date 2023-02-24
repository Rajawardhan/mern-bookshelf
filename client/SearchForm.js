import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search books..." value={query} onChange={handleChange} />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
