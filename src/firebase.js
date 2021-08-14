import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuuGFD4B4C2cuSNl78v7NsTKo-o5VAfgQ",
  authDomain: "top-library-24699.firebaseapp.com",
  projectId: "top-library-24699",
  storageBucket: "top-library-24699.appspot.com",
  messagingSenderId: "868328764350",
  appId: "1:868328764350:web:e08592182fccc608f77fef"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
