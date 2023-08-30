import { useRef } from 'react';
import styles from './Binyanim.module.css';
import Binyan from '../Binyan/Binyan';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import getFilename from '../../utility/getFilename';

const Binyanim = () => {
  
  const [user] = useAuthState(auth);
  const binyanimRef = collection(db, 'binyanim');
  const queryRef = query(binyanimRef, where('admin_id', '==', user.uid));
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

  const dialogCloseHandler = (ev) => {
    ev.preventDefault();
    dialogRef.current.close();
  }

  const dialogFormSubmitHandler = async (event) => {
    try {
      await addDoc(collection(db, 'binyanim'), {
        'name': event.target.name.value,
        'admin_id': user.uid 
      })
    } catch(error) {
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
      <dialog ref={dialogRef}>
        <p>New Binyan</p>
        <form method="dialog" onSubmit={dialogFormSubmitHandler}>
          <label className={styles.newLine} htmlFor={getFilename(import.meta.url) + 60}>Name of new binyan: </label>
          <input className={styles.newLine} type="text" id={getFilename(import.meta.url) + 60} name="name" />
          <menu className={styles.buttons}>
            <button>OK</button>
            <button onClick={dialogCloseHandler}>Cancel</button>
          </menu>
        </form>
      </dialog>
    </>
  );
};

export default Binyanim;
