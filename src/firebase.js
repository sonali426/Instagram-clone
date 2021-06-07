import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyAWaNV0Bxx7OX9K2g2UdcKN_SWsZq9_cms",
    authDomain: "instagram-clone-b98e5.firebaseapp.com",
    databaseURL: "https://instagram-clone-b98e5-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-b98e5",
    storageBucket: "instagram-clone-b98e5.appspot.com",
    messagingSenderId: "918378644228",
    appId: "1:918378644228:web:96e21562fd61f3e5a14651",
    measurementId: "G-Z4V39LVGJR"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};

  