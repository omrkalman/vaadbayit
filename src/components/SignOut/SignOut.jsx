import { signOut } from "firebase/auth";

function SignOut({ auth }) {
    return (
        <button onClick={() => signOut(auth)}>Sign out</button>
    )
}
export default SignOut;