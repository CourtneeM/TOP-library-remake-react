import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import SignInBar from './components/SignInBar';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';

import './App.css';
import reactDom from 'react-dom';

const App = () => {
  const [signedIn, setSignedIn] = useState(!!firebase.auth().currentUser);
  const [user, setUser] = useState('test');
  const [bookshelfName, setBookshelfName] = useState('');
  const [bookshelf, setBookshelf] = useState([]);

  const ref = firebase.firestore().collection('users').doc(`${user}`);

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
  };
  
  const getBookshelfName = () => {
    ref.get().then(snapshot => {
      setBookshelfName(Object.values(snapshot.data())[0] || 'My Bookshelf');
    });
  }

  const updateBookshelfName = newBookshelfName => {
    ref.update({ bookshelfName: newBookshelfName });
    getBookshelfName();
  }

  const getBookshelf = () => {
    ref.collection('bookshelf').onSnapshot(querySnapshot => {
      const books = [];
      querySnapshot.forEach(doc => {
        books.push(doc.data());
      });
      setBookshelf(books);
    });
  }

  useEffect(() => {
    getBookshelf();
  }, []);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      setSignedIn(true);
    });
  }
  
  const signOut = () => {
    firebase.auth().signOut()
    .then(res => {
      setSignedIn(false);
    });
  }

  const addBookToBookshelf = newBook => {
    return ref.collection('bookshelf').add({...newBook})
    .then(docRef => firebase.firestore().collection('bookshelves').doc(docRef.id).update({id: docRef.id}) )
    .catch(error => console.error('Error writing new book to database', error));
  }

  const editBookshelf = ({ title, author, pages, completed, id }) => {
    return ref.collection('bookshelf').doc(id).update({
      title: title, author: author, pages: pages, completed: completed
    });
  }

  const removeBook = (id) => {
    return ref.collection('bookshelf').doc(id).delete()
    .catch(error => console.error('Error removing book', error));
  }

  checkAuthState();
  getBookshelfName();

  return (
    <>
      <SignInBar signedIn={signedIn} signIn={signIn} signOut={signOut} user={user}/>
      <Header
        bookshelfName={bookshelfName}
        addBookToBookshelf={addBookToBookshelf}
        updateBookshelfName={updateBookshelfName}
      />
      <Bookshelf
        bookshelf={bookshelf}
        editBookshelf={editBookshelf}
        removeBook={removeBook}
      />
    </>
  );
}

export default App;
