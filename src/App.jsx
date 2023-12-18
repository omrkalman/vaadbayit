import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from "react-router-dom";
import { auth } from './config/firebaseConfig';
import Navbar from "./components/Navbar/Navbar";
import HomePage from './components/HomePage/HomePage';

function App() {
  // return <span>App works</span>
  
  const [user] = useAuthState(auth);
  
  return (
    <>
      <Navbar user={user} />
      {user ? <Outlet /> : <HomePage />}
    </>
  );
}

export default App;
