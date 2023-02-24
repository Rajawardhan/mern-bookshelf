import React from 'react';

const BookDetail = ({ book }) => {
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={book.image} className="card-img" alt={book.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.authors}</p>
            <p className="card-text">{book.description}</p>
            <a href={book.link} className="btn btn-primary">View on Google Books</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
