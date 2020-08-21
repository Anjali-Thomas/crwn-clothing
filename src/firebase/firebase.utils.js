import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAdw6uc4NcGG4EPG1h60fytJhF1sN8F-G8",
    authDomain: "crwn-db-a97ff.firebaseapp.com",
    databaseURL: "https://crwn-db-a97ff.firebaseio.com",
    projectId: "crwn-db-a97ff",
    storageBucket: "crwn-db-a97ff.appspot.com",
    messagingSenderId: "1042121472172",
    appId: "1:1042121472172:web:fb2ce1d3c66b1cc67c0709",
    measurementId: "G-KJ40JE63SR"

};

export const createUserProfileDocument = async (userAuth, additionalData) =>  {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          });
        } catch (error) {
          console.log('error creating user', error.message);
        }
      }
    
      return userRef;
    };
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;