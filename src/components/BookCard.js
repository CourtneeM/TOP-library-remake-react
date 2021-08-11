import React, { useEffect, useState } from 'react';

const BookCard = ({ index, book, editBookshelf, removeBook }) => {
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages);
  const [completed, setCompleted] = useState(book.completed);

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setPages(book.pages);
    setCompleted(book.completed);
    setEditMode(false);
  }, [book]);

  const displayEditForm = () => {
    return (
      <div className='edit-book-card'>
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} />
        <input type="number" placeholder='# Pages' value={pages} min={0} onChange={e => setPages(e.target.value)} />
        <label className='checkbox-label'>
          Read
          <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
        </label>
        <i onClick={editBookInfo} className="far fa-check-square"></i>
        <i onClick={() => removeBook(index)} className="far fa-trash-alt"></i>
      </div>
    );
  }

  const displayBookInfo = () => {
    return (
      <div className='book-card'>
        <p className='book-title'>{book.title}</p>
        <p className='book-author'>{book.author}</p>
        <p className='book-pages'>{book.pages} pages</p>
        <p className='book-completed'>({book.completed ? 'Read' : 'Not Read'})</p>
        <i onClick={() => setEditMode(true)} className="far fa-edit"></i>
      </div>
    );
  }

  const editBookInfo = () => {
    if (title === '' || author === '' || !pages || pages < 0) return;

    editBookshelf({title, author, pages, completed}, index);
    setEditMode(false);
  }

  return (
    <>
      { editMode ? displayEditForm() : displayBookInfo() }
    </>
  );
}

export default BookCard;
