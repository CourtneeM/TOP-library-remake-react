import React from 'react';
import BookCard from './BookCard';

const Bookshelf = ({ bookshelf }) => {
  return (
    <main className='bookshelf-container'>
      { 
        bookshelf.length === 0 ?
        <p className='empty-bookshelf-message'>Your bookshelf is empty... add some books!</p> :
        bookshelf.map((book, i) => {
          return <div key={i} className='book-card'><BookCard book={book} /></div>
        })
      }
    </main>
  );
}

export default Bookshelf;
