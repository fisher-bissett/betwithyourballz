import React from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Home } from "./pages/Home/Home";
import { auth } from "./firebase";
import { Login } from "./pages/Login/Login";

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {user ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default App;
