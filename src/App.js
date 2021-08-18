import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import Home from './components/Home';
import SignInBar from './components/SignInBar';
import Header from './components/Header';
import Loading from './components/Loading';
import Bookshelf from './components/Bookshelf';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setLoading(false);
  }, [bookshelf])

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(() => {
      checkAuthState();
      setLoading(true);
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

  const updateOrderId = (action, oldOrderId, selectedOrderId, id) => {
    switch (action) {
      case 'increase book order':
        ref.doc(`${user.uid}`).collection('bookshelf').get().then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if (doc.data().id === id) return;
            if (doc.data().orderId > oldOrderId && doc.data().orderId <= selectedOrderId)
              doc.ref.update({ orderId: doc.data().orderId - 1 });
          });
        });
        break;
      case 'decrease book order':
        ref.doc(`${user.uid}`).collection('bookshelf').get().then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if (doc.data().id === id) return;
            if (doc.data().orderId < oldOrderId && doc.data().orderId >= selectedOrderId)
              doc.ref.update({ orderId: doc.data().orderId + 1 });
          });
        });
        break;
      case 'decrement':
        ref.doc(`${user.uid}`).collection('bookshelf').get().then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            if (doc.data().orderId >= selectedOrderId) {
              doc.ref.update({ orderId: doc.data().orderId - 1 });
            }
          });
        });
        break;
      default:
        console.error('Error updating order ID');
    }
  }

  const addBookToBookshelf = newBook => {
    ref.doc(`${user.uid}`).collection('bookshelf').get().then(snapshot => snapshot.size)
    .then(numBooks => {
      ref.doc(`${user.uid}`).collection('bookshelf').add({...newBook})
      .then(docRef => ref.doc(`${user.uid}`).collection('bookshelf').doc(docRef.id).update({
        id: docRef.id,
        orderId: numBooks + 1,
      }))
    })
    .catch(error => console.error('Error writing new book to database', error));
  }

  const editBookshelf = ({ title, author, pages, completed, orderId, id }) => {
    let numBooks;
    ref.doc(`${user.uid}`).collection('bookshelf').get().then(snapshot => numBooks = snapshot.size)
    .then(() => {
      return ref.doc(`${user.uid}`).collection('bookshelf').doc(id).get().then(snapshot => snapshot.data().orderId)
    })
    .then(oldOrderId => {
      
      ref.doc(`${user.uid}`).collection('bookshelf').doc(id).update({
        title: title, author: author, pages: pages, completed: completed, orderId: orderId > numBooks ? numBooks : orderId
      });

      if (oldOrderId === orderId) return;

      const action = orderId > oldOrderId  ? 'increase book order' : 'decrease book order';
      console.log(action, oldOrderId, orderId);
      updateOrderId(action, oldOrderId, orderId, id);
    })
    .catch(error => {
      console.error('Error updating book', error);
    });
  }

  const removeBook = (id) => {
    ref.doc(`${user.uid}`).collection('bookshelf').doc(id).get().then(snapshot => snapshot.data().orderId)
    .then(res => {
      ref.doc(`${user.uid}`).collection('bookshelf').doc(id).delete();
      updateOrderId('decrement', res);
    })
    .catch(error => console.error('Error removing book', error));
  }

  return (
    <>
      <button onClick={() => console.log(user)}>Log User</button>
      {
        signedIn ?
        <>
          <SignInBar signedIn={signedIn} signIn={signIn} signOut={signOut} user={user}/>
          {
            loading ?
            <Loading /> :
            <>
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
          }
        </> :
        <Home signIn={signIn}/>
      }
    </>
  );
}

export default App;
