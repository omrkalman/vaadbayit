import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './App.module.css';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import Binyanim from './components/Binyanim/Binyanim';

function App({ auth }) {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? <>
        <SignOut auth={auth} />
        {/* <pre>{JSON.stringify(user)}</pre> */}
        <Binyanim auth={auth}></Binyanim>
      </> : <SignIn auth={auth} />}
    </>
  );
}

export default App;
