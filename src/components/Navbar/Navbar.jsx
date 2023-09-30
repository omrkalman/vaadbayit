import SignOut from '../SignOut/SignOut';
import SignIn from '../SignIn/SignIn';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../config/routes';

function Navbar({ user }) {
    
    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                {user ? <SignOut /> : <SignIn />}
                <NavLink to={ROUTES.Binyanim}>Binyanim</NavLink>
            </nav>
        </div>
    )
}

export default Navbar;