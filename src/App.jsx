import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import { auth } from './config/firebaseConfig';
import MyRouter from './config/routerConfig.jsx';

function App() {
  const [user] = useAuthState(auth);
  
  return (
    <>
      <Navbar />
      {user ? <MyRouter /> : null}
    </>
  );
}

export default App;
