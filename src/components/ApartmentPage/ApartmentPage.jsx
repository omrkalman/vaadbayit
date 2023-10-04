import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Payments from '../Payments/Payments';
import { useDocument } from 'react-firebase-hooks/firestore';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';

const initialState = {
    api: { status: '', msg: '' }
}

export default function() {
    const { binyanId, apartmentId } = useParams();
    const apartmentRef = doc(db, 'binyanim', binyanId, 'apartments', apartmentId);
    const [aptDoc, aptLoading, aptError] = useDocument(apartmentRef);
    const [number, setNumber] = useState(0);
    const [nickname, setNickname] = useState('');
    const [ api, setApi ] = useState(initialState.api);

    useEffect(() => {
        if (aptDoc) {
            const { number, nickname } = aptDoc.data();
            setNumber(number)
            setNickname(nickname)
        }
    }, [aptDoc])

    const handleSave = async () => {
        try {
            setApi({ ...initialState.api, status: 'loading' });
            await setDoc(apartmentRef, { number, nickname }, { merge: true })
            setApi({ ...initialState.api, status: 'ok', msg: 'Saved'});
        } catch(error) {
            console.error(error);
            setApi({ ...initialState.api, status: 'error', msg: error.message });
        }

    }
    
    return (
        <div className={styles.container}>
            <section>
                {!!aptLoading && <Loading />}
                {!!aptError && <p className={styles[api.status]}>{aptError.message}</p>}
                {!!aptDoc && (
                    <article className={styles.editor}>
                        <div>
                            <h2>Apt. Number:</h2>
                            <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div>
                            <h2>Apt. Nickname:</h2>
                            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
                        </div>
                        {api.status != 'loading' && <button onClick={handleSave}>Save</button>}
                        {api.status == 'loading' && <Loading />}
                        {!!api.msg && <p className={styles[api.status]}>{api.msg}</p> }
                    </article>
                )}
            </section>
            <section>
                <h1 style={{textAlign: 'center'}}>Payments</h1>
                <hr className={styles.addHr} />
                <article className={styles.removeBorder}>
                    <Payments apartmentRef={apartmentRef} />
                </article>
            </section>
        </div>
    )
}