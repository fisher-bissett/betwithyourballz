import React from "react";
import { googleProvider, auth, db } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";

export const Login = () => {
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
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

  return (
    <>
      Bet with your Ballz
      <button onClick={signInWithGoogle}>Login with Google</button>
    </>
  )
}
