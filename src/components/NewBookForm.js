import React, { useState } from 'react';

const book = (title, author, pages, completed) => {
  return {
    title, author, pages, completed
  }
}

const NewBookForm = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [completed, setCompleted] = useState(false);

  const displayNewBookForm = () => {
    return (
      <>
        <label>
          Title
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
        <label>
          Pages
          <input type="number" value={pages} min={0} onChange={e => setPages(e.target.value)} className='pages-input' />
        </label>
        <label>
          Completed
          <input type="checkbox" value={completed} onChange={e => setCompleted(e.target.checked)} className='completed-input' />
        </label>
        <button onClick={() => addBooktoBookshelf()}>Add to bookshelf</button>
      </>
    );
  }

  const addBooktoBookshelf = () => {
    if (title === '' || author === '' || !pages || pages < 0) return;

    props.addBookToBookshelf(book(title, author, pages, completed));
    setDisplayForm(false);
    setTitle('');
    setAuthor('');
    setPages('');
    setCompleted(false);
  }

  return (
    <div className='new-book-form'>
      {displayForm ? displayNewBookForm() : <button onClick={() => setDisplayForm(true)}>Add Book</button>}
    </div>
  )
}

export default NewBookForm;
