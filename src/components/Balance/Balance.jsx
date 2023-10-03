import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import styles from './styles.module.css';
import Loading from "../Loading/Loading";
import useMoney from "../../hooks/useMoney";

export default function({ apartmentDocs, expDocs }) {
    const [paymentSum, setPaymentSum] = useState(-1);
    const [expenditureSum, setExpenditureSum] = useState(-1);

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
        if (expDocs) {
            setExpenditureSum(expDocs.reduce((sum, doc) => sum + doc.data().amount, 0));
        }
    }, [expDocs])

    const money = useMoney(paymentSum - expenditureSum);

    if (paymentSum==-1 || expenditureSum==-1) {
        return <h1 className={styles.balance}><Loading /></h1>
    }

    // return <h1 className={styles.balance}>{displayBalance()}</h1>
    return <h1 className={styles.balance}>{money}</h1>
}