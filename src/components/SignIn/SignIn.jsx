import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser } from '../../store/userSlice';
import { Fragment, useEffect } from 'react';

function SignIn({ auth, children }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(clearUser());
            }
          });
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    return (
        <Fragment>
            <button onClick={signInWithGoogle}>Sign in</button>
            <pre>{JSON.stringify(user)}</pre>
        </Fragment>
    );
}

export default SignIn;