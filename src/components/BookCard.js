import React from 'react';

const BookCard = ({ book }) => {
  return (
    <>
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>{book.pages}</p>
      <p>{book.completed ? 'Read' : 'Not Read'}</p>
      <i className="far fa-edit"></i>
    </>
  );
}

export default BookCard;
