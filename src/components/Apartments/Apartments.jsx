import { useRef } from "react";
import { doc, setDoc } from 'firebase/firestore';
import Apartment from "../Apartment/Apartment";
import Dialog from "../Dialog/Dialog";
import styles from './styles.module.css'

function Apartments({ apartments, apartmentsRef }) {

    const dialogRef = useRef();
    
    const newBinyanHandler = () => {
        dialogRef.current.showModal();
    }

    const dialogFormSubmitHandler = async (event) => {
        try {
            await setDoc(doc(apartmentsRef), {
                nickname: event.target.nickname.value,
                number: event.target.number.value,
            });
        } catch (error) {
            console.error('Error adding document:', error);
        } finally {
            event.target.nickname.value = '';
            event.target.number.value = null;
        }
    }

    return (
        <>
            <div className={styles.container}>
                {apartments.map(a => <Apartment key={Math.trunc(Math.random()*10e6)} apartment={a} />)}
                <div key={Math.trunc(Math.random()*10e6)} className={styles.newApt} onClick={newBinyanHandler}>
                    <span>+</span>
                </div>
            </div>
            <Dialog onSubmit={dialogFormSubmitHandler} ref={dialogRef} heading='Apt.'>
                <label style={{display: 'block'}} htmlFor="CPjhNEpoMQ">Nickname:</label>
                <input style={{display: 'block'}} type="text" id="CPjhNEpoMQ" name="nickname" />
                <label style={{display: 'block'}} htmlFor="LXbfBYhgQW">Apt. number:</label>
                <input style={{display: 'block'}} type="number" id="LXbfBYhgQW" name="number" />
            </Dialog>
        </>
    )
}

export default Apartments;