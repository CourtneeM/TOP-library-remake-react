import React, { useState } from 'react';
import Header from './components/Header';

import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  const addBookToBookshelf = newBook => {
    const bookshelfCopy = [...bookshelf];
    bookshelfCopy.push(newBook);

    setBookshelf(bookshelfCopy);
  }

  return (
    <>
      <Header addBookToBookshelf={addBookToBookshelf} />
    </>
  );
}

export default App;
