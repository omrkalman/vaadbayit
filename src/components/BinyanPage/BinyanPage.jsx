import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Apartments from "../Apartments/Apartments";
import CashFlow from "../CashFlow/CashFlow";
import styles from './BinyanPage.module.css';

function BinyanPage() {

    const { id } = useParams();
    const apartmentsCollectionRef = collection(doc(db, 'binyanim', id), 'apartments');
    const [querySnapshot, loading, error] = useCollection(apartmentsCollectionRef);

    
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

    return (
        <>
            <section className={styles.section}>
                <h1>Apartments</h1>
                <hr />
                <Apartments apartments={apartments} />
            </section>
            <section className={styles.section}>
                <h1>Cash Flow</h1>
                <hr />
                <CashFlow apartmentDocs={querySnapshot.docs} apartments={apartments} />
            </section>

        </>
    )
}

export default BinyanPage;