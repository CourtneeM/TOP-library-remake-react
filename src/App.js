import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';

import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  const ref = firebase.firestore().collection('bookshelves');

  const getBookshelf = () => {
    ref.onSnapshot(querySnapshot => {
      const books = [];
      querySnapshot.forEach(doc => {
        books.push(doc.data());
        console.log(doc.id);
      });
      setBookshelf(books);
    });
  }

  useEffect(() => {
    getBookshelf();
  }, []);

  const addBookToFirestore = newBook => {
    return firebase.firestore().collection('bookshelves').add({...newBook})
    .then(docRef => firebase.firestore().collection('bookshelves').doc(docRef.id).update({id: docRef.id}) )
    .catch(error => console.error('Error writing new book to database', error));
  }
  
  const editBookInFirestore = ({ title, author, pages, completed, id }) => {
    return firebase.firestore().collection('bookshelves').doc(id).update({
      title: title, author: author, pages: pages, completed: completed
    });
  }

  const removeBookFromFirestore = id => {
    return firebase.firestore().collection('bookshelves').doc(id).delete()
    .catch(error => console.error('Error removing book', error));
  }

  const addBookToBookshelf = newBook => {
    addBookToFirestore(newBook);
    // const bookshelfCopy = [...bookshelf];
    // bookshelfCopy.push(newBook);

    // setBookshelf(bookshelfCopy);
  }

  const editBookshelf = (editedBook) => {
    editBookInFirestore(editedBook);
    // const bookshelfCopy = [...bookshelf];
    // bookshelfCopy.splice(index, 1, editedBook);

    // setBookshelf(bookshelfCopy);
  }

  const removeBook = (id) => {
    removeBookFromFirestore(id);
    // const bookshelfCopy = [...bookshelf];
    // bookshelfCopy.splice(index, 1);

    // setBookshelf(bookshelfCopy);
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
