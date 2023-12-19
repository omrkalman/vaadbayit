import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from './config/firebaseConfig';
import Navbar from "./components/Navbar/Navbar";
import ROUTES from './config/routes';
import { useEffect } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate(ROUTES.Binyanim)
    } else {
      navigate(ROUTES.HomePage)
    }
  }, [user])

  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
}

export default App;
