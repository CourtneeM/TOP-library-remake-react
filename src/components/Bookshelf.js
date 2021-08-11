import React from 'react';
import BookCard from './BookCard';

const Bookshelf = ({ bookshelf, editBookshelf, removeBook }) => {
  return (
    <main className='bookshelf-container'>
      { 
        bookshelf.length === 0 ?
        <p className='empty-bookshelf-message'>Your bookshelf is empty... add some books!</p> :
        bookshelf.map((book, i) => {
          return (
            <div key={i}>
              <BookCard
                index={i}
                book={book}
                editBookshelf={editBookshelf}
                removeBook={removeBook}
              />
            </div>
          );
        })
      }
    </main>
  );
}

export default Bookshelf;
