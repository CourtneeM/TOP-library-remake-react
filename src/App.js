import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import Home from './components/Home';
import SignInBar from './components/SignInBar';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';

import './App.css';

const App = () => {
  const [signedIn, setSignedIn] = useState(!!firebase.auth().currentUser);
  const [user, setUser] = useState('');
  const [bookshelfName, setBookshelfName] = useState('');
  const [bookshelf, setBookshelf] = useState([]);

  let ref = firebase.firestore().collection('users');

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
  };
  
  const getBookshelfName = () => {
    ref.doc(`${user.uid}`).get().then(snapshot => {
      const bookshelfName = snapshot.data().bookshelfName ? snapshot.data().bookshelfName : `${user.displayName}'s Bookshelf`;
      setBookshelfName(bookshelfName);
      ref.doc(`${user.uid}`).update({ bookshelfName: bookshelfName });
    });
  }

  const updateBookshelfName = newBookshelfName => {
    ref.doc(`${user.uid}`).update({ bookshelfName: newBookshelfName });
    setBookshelfName(newBookshelfName);
  }

  const getBookshelf = () => {
    ref.doc(`${user.uid}`).collection('bookshelf').orderBy('orderId').onSnapshot(querySnapshot => {
      const books = [];
      querySnapshot.forEach(doc => {
        books.push(doc.data());
      });
      setBookshelf(books);
    });
  }

  useEffect(() => {
    if (!user) return;
    getBookshelfName();
    getBookshelf();

    if (ref.doc(`${user.uid}`).get().then(snapshot => snapshot.data().bookshelfName)) {
      ref.doc(`${user.uid}`).update({ userName: firebase.auth().currentUser.displayName });
    } else {
      ref.doc(`${user.uid}`).set({
        bookshelfName: bookshelfName,
        userName: firebase.auth().currentUser.displayName,
      });
    }
    
    if (user) setSignedIn(true);
  }, [user]);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(() => {
      checkAuthState();
    })
    .then(() => {
    });
  }
  
  const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
      setSignedIn(false);
      setUser('');
      setBookshelfName('');
      setBookshelf([]);
      ref = null;
    });
  }

  const addBookToBookshelf = newBook => {
    let numBooks;
    ref.doc(`${user.uid}`).collection('bookshelf').get().then(snapshot => numBooks = snapshot.size);

    return ref.doc(`${user.uid}`).collection('bookshelf').add({...newBook})
    .then(docRef => ref.doc(`${user.uid}`).collection('bookshelf').doc(docRef.id).update({
      id: docRef.id,
      orderId: numBooks + 1,
    }))
    .catch(error => console.error('Error writing new book to database', error));
  }

  const editBookshelf = ({ title, author, pages, completed, orderId, id }) => {
    return ref.doc(`${user.uid}`).collection('bookshelf').doc(id).update({
      title: title, author: author, pages: pages, completed: completed, orderId: orderId
    });
  }

  const removeBook = (id) => {
    return ref.doc(`${user.uid}`).collection('bookshelf').doc(id).delete()
    .catch(error => console.error('Error removing book', error));
  }

  return (
    <>
      <button onClick={() => console.log(user)}>Log User</button>
      {
        signedIn ?
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
        </> :
        <Home signIn={signIn}/>
      }
    </>
  );
}

export default App;
