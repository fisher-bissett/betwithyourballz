import React from "react";
import { googleProvider, auth, db } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";

import GoogleIcon from "../../assets/google-logo.svg";

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
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center m-auto">
        <div className="text-3xl font-bold">Bet with your Ballz</div>
        <div className="text-sm">Betting and ballz. Get in here.  </div>
        <button className="inline-flex items-center gap-3 border-2 border-black rounded-full px-10 py-2 hover:bg-gray-100 mt-3"
        onClick={signInWithGoogle}
        >
          <img src={GoogleIcon} className="h-6"/>
          <span>Continue with Google</span>
        </button>
      </div>
      <div className="bg-gray-300 rounded-3xl h-screen p-3 border-8 border-white"></div>
    </div>
  )
}
