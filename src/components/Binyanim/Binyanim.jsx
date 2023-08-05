import styles from './Binyanim.module.css';
import Binyan from '../Binyan/Binyan';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

const Binyanim = () => {
  
  const [user] = useAuthState(auth);
  const binyanimRef = collection(db, 'binyanim');
  const queryRef = query(binyanimRef, where('admin_id', '==', user.uid));
  const [binyanim, loading, error] = useCollectionData(queryRef, { idField: 'docId' });

  useEffect(() => {
    console.log(binyanim)
  }, [binyanim])
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.main}>
      <h2 style={{ textAlign: 'center' }}>Binyanim</h2>
      <section className={styles.neighborhood}>
        {binyanim.map(b => <Binyan key={Math.trunc(Math.random()*10e6)} binyan={b} />)}
      </section>
    </div>
  );
};

export default Binyanim;
