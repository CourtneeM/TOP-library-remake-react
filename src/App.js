import React, { useState } from 'react';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';

import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  const addBookToBookshelf = newBook => {
    const bookshelfCopy = [...bookshelf];
    bookshelfCopy.push(newBook);

    setBookshelf(bookshelfCopy);
  }

  const editBookshelf = (editedBook, index) => {
    const bookshelfCopy = [...bookshelf];
    bookshelfCopy.splice(index, 1, editedBook);

    setBookshelf(bookshelfCopy);
  }

  const removeBook = (index) => {
    const bookshelfCopy = [...bookshelf];
    bookshelfCopy.splice(index, 1);

    setBookshelf(bookshelfCopy);
  }

  return (
    <>
      <Header addBookToBookshelf={addBookToBookshelf} />
      <Bookshelf
        bookshelf={bookshelf}
        editBookshelf={editBookshelf}
        removeBook={removeBook}
      />
    </>
  );
}

export default App;
