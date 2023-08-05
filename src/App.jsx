import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './App.module.css';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import Binyanim from './components/Binyanim/Binyanim';
import { auth } from './config/firebaseConfig';
import MyRouter from './config/routerConfig.jsx';

function App() {
  const [user] = useAuthState(auth);
  
  return (
    user ? <>
      <SignOut />
      <MyRouter />
    </> : 
      <SignIn />
  );
}

export default App;
