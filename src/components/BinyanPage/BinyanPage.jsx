import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc } from 'firebase/firestore';
import { db } from "../../config/firebaseConfig";


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
    
    return <div>{JSON.stringify(apartments)}</div>
}

export default BinyanPage;