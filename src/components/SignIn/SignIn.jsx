import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function SignIn({ auth }) {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <button onClick={signInWithGoogle}>Sign in</button>
    );
}

export default SignIn;