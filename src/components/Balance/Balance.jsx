import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import styles from './styles.module.css';
import Loading from "../Loading/Loading";

export default function({ apartmentDocs }) {
    const { id } = useParams();
    const [paymentSum, setPaymentSum] = useState(0);
    const [expenditureSum, setExpenditureSum] = useState(0);
    
    const expsCollectionRef = collection(doc(db, 'binyanim', id), 'expenditures');
    const [expsSnapshot, expsLoading, expsError] = useCollection(expsCollectionRef);

    useEffect(() => {
        if (apartmentDocs) getData();
        async function getData() {
            let calcSum = 0;
            for (const aptDoc of apartmentDocs) {
                const pmntsRef = collection(aptDoc.ref, 'payments')
                const pmntsSnapshot = await getDocs(pmntsRef);
                calcSum += pmntsSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
            }
            setPaymentSum(calcSum);
        }
    }, [apartmentDocs])

    useEffect(() => {
        if (expsSnapshot) {
            setExpenditureSum(expsSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0));
        }
    }, [expsSnapshot])

    const displayBalance = useCallback(() => {
        const amount = paymentSum - expenditureSum;
        let cents = (amount * 100) % 100;
        cents = cents > 9 ? cents : '0'+cents;
        const dollars = Math.trunc(amount);
        const displayAmount = `${dollars}.${cents}`;

        if (import.meta.env.VITE_CURRENCY_IS_AFTER) {
            return `${displayAmount}${import.meta.env.VITE_CURRENCY}`;
        }
        return `${import.meta.env.VITE_CURRENCY}${displayAmount}`;
    }, [paymentSum, expenditureSum])
    
    if (expsError) {
        return <div>Error: {expsError?.message}</div>;
    }

    if (expsLoading || paymentSum==null || expenditureSum==null) {
        return <h1 className={styles.balance}><Loading /></h1>
    }

    return <h1 className={styles.balance}>{displayBalance()}</h1>
}