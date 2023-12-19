import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

function SignOut() {
    return (
        <button className='large-button' onClick={() => signOut(auth)}>Sign out</button>
    )
}
export default SignOut;