import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, query, where, setDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import Apartment from "../Apartment/Apartment";
import NewBinAptDialog from "../NewBinAptDialog/NewBinAptDialog";
import styles from './BinyanPage.module.css'

function BinyanPage() {
    const { id } = useParams();
    const apartmentsCollectionRef = collection(doc(db, 'binyanim', id), 'apartments');
    const [querySnapshot, loading, error] = useCollection(apartmentsCollectionRef);
    const uid = auth.currentUser.uid;
    const dialogRef = useRef();

    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    // Check if querySnapshot is available
    if (!querySnapshot) {
        return null;
    }
    
    // Access the documents with IDs
    const apartments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    
    const newBinyanHandler = () => {
        dialogRef.current.showModal();
    }

    const dialogFormSubmitHandler = async (event) => {
        try {
            await setDoc(doc(apartmentsCollectionRef), {
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
            <NewBinAptDialog onSubmit={dialogFormSubmitHandler} ref={dialogRef}>
                <label style={{display: 'block'}} htmlFor="CPjhNEpoMQ">Nickname:</label>
                <input style={{display: 'block'}} type="text" id="CPjhNEpoMQ" name="nickname" />
                <label style={{display: 'block'}} htmlFor="LXbfBYhgQW">Apt. number:</label>
                <input style={{display: 'block'}} type="number" id="LXbfBYhgQW" name="number" />
            </NewBinAptDialog>
        </>
    )
}

export default BinyanPage;