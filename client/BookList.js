import React from 'react';

const BookList = ({ books, onBookSelect }) => {
  const renderBooks = () => {
    return books.map(book => {
      return (
        <div key={book.id} className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={book.image} className="card-img" alt={book.title} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.authors}</p>
                <p className="card-text">{book.description}</p>
                <button className="btn btn-primary" onClick={() => onBookSelect(book)}>Add to Bookshelf</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {renderBooks()}
    </div>
  );
};

export default BookList;
