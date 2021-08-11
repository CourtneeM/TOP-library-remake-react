import React, { useState } from 'react';

const BookCard = ({ book, index, editBookshelf }) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages);
  const [completed, setCompleted] = useState(book.completed);

  const displayEditForm = () => {
    return (
      <div className='edit-book-card'>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        <input type="text" value={pages} onChange={e => setPages(e.target.value)} />
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
        <i onClick={editBookInfo} className="far fa-check-square"></i>
      </div>
    )
  }

  const displayBookInfo = () => {
    return (
      <div className='book-card'>
        <p>{book.title}</p>
        <p>{book.author}</p>
        <p>{book.pages}</p>
        <p>{book.completed ? 'Read' : 'Not Read'}</p>
        <i onClick={() => setEditMode(true)} className="far fa-edit"></i>
      </div>
    )
  }

  const editBookInfo = () => {
    editBookshelf({title, author, pages, completed}, index);
    setEditMode(false);
  }

  return (
    <>
      {
        editMode ? displayEditForm() : displayBookInfo()
      }
    </>
  );
}

export default BookCard;
