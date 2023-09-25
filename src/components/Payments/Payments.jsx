import { format } from 'date-fns';
import styles from './styles.module.css';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import Loading from '../Loading/Loading';

import formatMoney from '../../utility/formatMoney';

export default function({ apartmentRef }) {
    const paymentsRef = collection(apartmentRef, 'payments');
    const [paymentsSnapshot, paymentsLoading, paymentsError] = useCollection(paymentsRef);
    // const [paymentsSnapshot, paymentsLoading, paymentsError] = useDocument(apartmentRef);

    if (paymentsLoading) return <Loading />;
    if (paymentsError) return <p>222{JSON.stringify(paymentsError)}</p>
    
    const payments = paymentsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            date: format(data.date.toDate(), 'd/M/yy')
        }
    })
    
    if (paymentsSnapshot) return (
        <div className={styles.container}>
            {payments.map(p => (
                <div className={styles.payment}>
                    <p className={styles.date}>{p.date}</p>
                    <h1 className={styles.amount}>{formatMoney(p.amount)}</h1>
                    <h3 className={styles.memo}>"{p.memo}"</h3>
                </div>
            ))}
        </div>
    )
}