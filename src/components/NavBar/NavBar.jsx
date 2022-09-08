import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid, useMediaQuery } from "@mui/material";

import { auth } from '../../firebase';
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const mobile = useMediaQuery('(max-width:750px)');
  const [user, loading, error] = useAuthState(auth);

  const headerStyle = {
    fontSize: 48,
    display: "flex",
    justifyContent: "center",
    padding: '48px'
  }
  return (
      <Grid className="flex justify-between p-4 items-center bg-gray-100 sticky top-0 shadow-md" container>
        <Grid item xs={4}>
          <Grid container className="items-center">
            <img src={user.photoURL} referrerPolicy="no-referrer" className="h-10 w-fit rounded-full"/>
            {!mobile && (<div className="mx-4">{user.displayName}</div>)}
          </Grid>
        </Grid>
        <Grid item xs={4} className="text-center text-xl font-extrabold	tracking-widest	italic">
          BwyB
        </Grid>
        <Grid item xs={4} className="text-end">
          <button onClick={() => signOut(auth)}>Sign out</button>
        </Grid>
      </Grid>
  );
}
