import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { auth } from './firebase';


const App = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  console.log(error);
  return (
    <>
      {user ? <Home /> : <Login />}
    </>
  );
}

export default App;
