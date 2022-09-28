import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { CircularProgress } from "@mui/material";

import "./App.css";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    <CircularProgress />;
  }

  return (
    <Routes>
      {user ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
    </Routes>
  );
};

export default App;
