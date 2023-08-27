import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebaseConfig';
import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';
import styles from './Navbar.module.css';

function Navbar() {
    
    const [user] = useAuthState(auth);
    
    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                {user ? <SignOut /> : <SignIn />}
            </nav>
        </div>
    )
}

export default Navbar;