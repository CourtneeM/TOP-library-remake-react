import React, { useState } from 'react';
import NewBookForm from './NewBookForm';

const Header = (props) => {
  const [displayEditName, setDisplayEditName] = useState(false);
  const [bookshelfName, setBookshelfName] = useState('Your Bookshelf');
  
  const displayEditInput = () => {
    return (
      <div>
        <input type="text" value={bookshelfName} onChange={e => setBookshelfName(e.target.value)} />
        <button onClick={() => setDisplayEditName(false)}>v/</button>
      </div>
    );
  }

  const displayBookshelfName = () => {
    return (
      <div>
        <h1>{bookshelfName}</h1>
        <button onClick={() => setDisplayEditName(true)}>edit</button>
      </div>
    );
  }

  return (
    <header>
      { displayEditName ? displayEditInput() : displayBookshelfName() }
      
      <NewBookForm addBookToBookshelf={props.addBookToBookshelf} />
    </header>
  );
}

export default Header;
