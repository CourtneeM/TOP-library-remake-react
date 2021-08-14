import React, { useEffect, useState } from 'react';
import NewBookForm from './NewBookForm';

const Header = (props) => {
  const [displayEditName, setDisplayEditName] = useState(false);
  const [newBookshelfName, setNewBookshelfName] = useState(props.bookshelfName);

  useEffect(() => {
    setNewBookshelfName(props.bookshelfName);
  }, [props.bookshelfName]);

  const updateBookshelfName = () => {
    setDisplayEditName(false);
    props.updateBookshelfName(newBookshelfName);
  }

  const displayEditInput = () => {
    return (
      <div className='edit-bookshelf-name'>
        <input type="text" value={newBookshelfName} onChange={e => setNewBookshelfName(e.target.value)} />
        <i onClick={updateBookshelfName} className="far fa-check-square"></i>
      </div>
    );
  }

  const displayBookshelfName = () => {
    return (
      <div className='bookshelf-name'>
        <h1>{props.bookshelfName}</h1>
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
