import React from 'react';
import BookCard from './BookCard';

const Bookshelf = ({ bookshelf, editBookshelf }) => {
  return (
    <main className='bookshelf-container'>
      { 
        bookshelf.length === 0 ?
        <p className='empty-bookshelf-message'>Your bookshelf is empty... add some books!</p> :
        bookshelf.map((book, i) => <div key={i}><BookCard book={book} index={i} editBookshelf={editBookshelf} /></div>)
      }
    </main>
  );
}

export default Bookshelf;
