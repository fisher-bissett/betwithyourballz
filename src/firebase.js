// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmt3A2_VP8yVXKIny5F1OKMv04vKrIDZs",
  authDomain: "betwithyourballz.firebaseapp.com",
  projectId: "betwithyourballz",
  storageBucket: "betwithyourballz.appspot.com",
  messagingSenderId: "354708655005",
  appId: "1:354708655005:web:6dd7bae77f6cc0dcc97d74"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export { app, db, auth, googleProvider };