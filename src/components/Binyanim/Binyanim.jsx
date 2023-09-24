import { useRef } from 'react';
import styles from './Binyanim.module.css';
import Binyan from '../Binyan/Binyan';
import NewBinAptDialog from '../NewBinAptDialog/NewBinAptDialog';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

const Binyanim = () => {
  
  const uid = auth.currentUser.uid;
  const binyanimRef = collection(db, 'binyanim');
  const queryRef = query(binyanimRef, where('admin_id', '==', uid));
  const [querySnapshot, loading, error] = useCollection(queryRef);
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
  const binyanim = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const newBinyanHandler = () => {
    dialogRef.current.showModal();
  }

  const dialogFormSubmitHandler = async (event) => {
    try {
      await addDoc(binyanimRef, {
        'name': event.target.name.value,
        'admin_id': uid
      })
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      event.target.name.value = '';
    }
  }

  return (
    <>
      <div className={styles.main}>
        <h2 style={{ textAlign: 'center' }}>Binyanim</h2>
        <section className={styles.neighborhood}>
          {binyanim.map(b => <Binyan key={Math.trunc(Math.random()*10e6)} binyan={b} />)}
          <div key={Math.trunc(Math.random()*10e6)} className={styles.newBinyan} onClick={newBinyanHandler}>
            <span>+</span>
          </div>
        </section>
      </div>
      <NewBinAptDialog onSubmit={dialogFormSubmitHandler} ref={dialogRef} heading='Building'>
        <label style={{display: 'block'}} htmlFor="PAjgCNgsPTmnVR">Name:</label>
        <input style={{display: 'block'}} id="PAjgCNgsPTmnVR" type="text" name="name" />
      </NewBinAptDialog>
    </>
  );
};

export default Binyanim;
