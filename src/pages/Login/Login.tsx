import React from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";
import { googleProvider, auth, db } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import GoogleIcon from "../../assets/google-logo.svg";
import bgVideo from "../../assets/nfl-video-bg.mp4";

export const Login = () => {
  const mobile = useMediaQuery("(max-width:750px)");
  const navigate = useNavigate();
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
          email: user.email
        });
      }
      navigate("/home");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      {mobile ? (
        <div className="relative h-screen">
          <div className="absolute w-screen h-screen overflow-hidden">
            <video src={bgVideo} playsInline autoPlay loop muted width="100%" />
          </div>
          <div className="relative text-center z-10 top-1/3 bg-gray-100 bg-opacity-10 rounded-2xl mx-4 p-4">
            <div className="text-3xl font-bold italic">BwyB</div>
            <div className="text-sm">Betting and ballz. Get in here. </div>
            <button
              className="inline-flex items-center gap-3 border-2 border-black rounded-full px-10 py-2 hover:bg-gray-100 mt-3"
              onClick={signInWithGoogle}
            >
              <img src={GoogleIcon} className="h-6" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center m-auto">
            <div className="text-3xl font-bold italic">BwyB</div>
            <div className="text-sm">Betting and ballz. Get in here. </div>
            <button
              className="inline-flex items-center gap-3 border-2 border-black rounded-full px-10 py-2 hover:bg-gray-100 mt-3"
              onClick={signInWithGoogle}
            >
              <img src={GoogleIcon} className="h-6" />
              <span>Continue with Google</span>
            </button>
          </div>
          <div className="bg-gray-300 w-full rounded-3xl h-screen border-8 border-white text-center items-center overflow-hidden">
            <video src={bgVideo} playsInline autoPlay loop muted width="100%" />
          </div>
        </div>
      )}
    </>
  );
};
