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
            // Data for the new apartment document
            const newApartmentData = {
                nickname: event.target.nickname.value,
                number: event.target.number.value,
            };
            // Reference to the "binyanim" collection
            const binyanimCollectionRef = collection(db, 'binyanim');
            // Query the "apartments" subcollection where `admin_id` matches the user's UID
            const q = query(
                binyanimCollectionRef,
                where('admin_id', '==', uid)
            );
            console.log(55)
            const querySnapshot = await getDocs(q);
            console.log(57)
            // Check if there are matching documents
            if (querySnapshot.docs.length > 0) {
                // Assuming there's only one matching document, you can add the new apartment to it
                console.log(61)
                const binyanimDocRef = doc(binyanimCollectionRef, querySnapshot.docs[0].id);
                console.log(63)
                const apartmentsCollectionRef = collection(binyanimDocRef, 'apartments');
                console.log(65)
                // Add the new apartment document to the "apartments" subcollection
                await setDoc(doc(apartmentsCollectionRef), newApartmentData);
                console.log(68)
            } else {
                // Handle the case where no matching "apartments" subcollection document was found
                console.log('No matching document found');
            }
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