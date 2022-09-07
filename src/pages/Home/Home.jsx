import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase';
import { Games } from "../../components/Games/Games";
import { Header } from "../../components/Header";
import { signOut } from "firebase/auth";
  
  export const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    console.log(user);

    return (
      <>
        <Header />
        <button onClick={() => signOut(auth)}>Sign out</button>
        <Games />
      </>
    );
}
