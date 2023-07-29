import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import Binyan from './components/Binyan/Binyan';

function App({ auth }) {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? <>
        <SignOut auth={auth} />
        {/* <pre>{JSON.stringify(user)}</pre> */}
        <Binyan auth={auth}></Binyan>
      </> : <SignIn auth={auth} />}
    </>
  );
}

export default App;
