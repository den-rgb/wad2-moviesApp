import firebase from "firebase/compat/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD8yrqjX8Y-DPkWsRLh8WBj2gIYnrUYg6k",
    authDomain: "movieapp-f7916.firebaseapp.com",
    projectId: "movieapp-f7916",
    storageBucket: "movieapp-f7916.appspot.com",
    messagingSenderId: "561789546562",
    appId: "1:561789546562:web:0e247d9e24335c93077ddb"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider(auth);

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth,googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    db,
    signInWithGoogle,
    
    logout,
  };