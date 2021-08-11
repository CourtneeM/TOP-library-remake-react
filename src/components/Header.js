import React, { useState } from 'react';
import NewBookForm from './NewBookForm';

const Header = (props) => {
  const [displayEditName, setDisplayEditName] = useState(false);
  const [bookshelfName, setBookshelfName] = useState('My Bookshelf');

  const displayEditInput = () => {
    return (
      <div className='edit-bookshelf-name'>
        <input type="text" value={bookshelfName} onChange={e => setBookshelfName(e.target.value)} />
        <i onClick={() => setDisplayEditName(false)} className="far fa-check-square"></i>
      </div>
    );
  }

  const displayBookshelfName = () => {
    return (
      <div className='bookshelf-name'>
        <h1>{bookshelfName}</h1>
        <i onClick={() => setDisplayEditName(true)} className="far fa-edit"></i>
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
