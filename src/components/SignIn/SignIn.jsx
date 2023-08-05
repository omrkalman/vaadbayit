import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <button onClick={signInWithGoogle}>Sign in</button>
    );
}

export default SignIn;