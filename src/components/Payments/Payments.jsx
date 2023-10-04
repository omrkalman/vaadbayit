import { format } from 'date-fns';
import styles from './styles.module.css';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import Loading from '../Loading/Loading';
import formatMoney from '../../utility/formatMoney';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Payments ({ apartmentRef }) {
    const paymentsRef = collection(apartmentRef, 'payments');
    const [paymentsSnapshot, paymentsLoading, paymentsError] = useCollection(paymentsRef);
    const { binyanId, apartmentId } = useParams();
    const navigate = useNavigate();

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

    const handleNewPayment = () => {
        navigate(`/binyan/${binyanId}?feature=${2}&resident=${apartmentId}#cashflow`);
    }
    
    if (payments) return (
        <div className={styles.container}>
            <div key='add' onClick={handleNewPayment} className={`${styles.payment} ${styles.plus}`}>+</div>
            {payments.map(p => (
                <div key={p.id} className={styles.payment}>
                    <p className={styles.date}>{p.date}</p>
                    <h1 className={styles.amount}>{formatMoney(p.amount)}</h1>
                    <h3 className={styles.memo}>"{p.memo}"</h3>
                </div>
            ))}
        </div>
    )
}