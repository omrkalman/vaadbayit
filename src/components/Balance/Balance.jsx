import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import styles from './styles.module.css';
import Loading from "../Loading/Loading";
import useMoney from "../../hooks/useMoney";

export default function({ apartmentDocs }) {
    const { id } = useParams();
    const [paymentSum, setPaymentSum] = useState(-1);
    const [expenditureSum, setExpenditureSum] = useState(-1);
    
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

    const money = useMoney(paymentSum - expenditureSum);
    
    if (expsError) {
        return <div>Error: {expsError?.message}</div>;
    }

    if (expsLoading || paymentSum==-1 || expenditureSum==-1) {
        return <h1 className={styles.balance}><Loading /></h1>
    }

    // return <h1 className={styles.balance}>{displayBalance()}</h1>
    return <h1 className={styles.balance}>{money}</h1>
}