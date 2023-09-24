import { useEffect, useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../config/firebaseConfig';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css'
import Loading from '../Loading/Loading';

export default function({ apartmentDocs, apartments }) {

    const { id } = useParams();
    const binyanRef = doc(db, 'binyanim', id);
    const reasonsRef = collection(binyanRef, 'reasons');
    const [reasonsSnapshot, reasonsLoading, reasonsError] = useCollection(reasonsRef);
    const [flowType, setFlowType] = useState(0);
    const [reasons, setReasons] = useState([]);
    const [result, setResult] = useState({ text: '', status: ''})
    const [amountInput, setAmountInput] = useState(0);
    
    const handleForm = async(e) => {
        e.preventDefault();
        const type = e.target.type.value;
        const amount = +e.target.amount.value;
        const residentId = e.target.resident?.value;
        const memo = e.target.reason.value;
        setResult({ status: 'flight' })
        try {
            if (type == 0 /* in */) {
                const apartmentDoc = apartmentDocs.find(aDoc => aDoc.id == residentId)
                await setDoc(doc(collection(apartmentDoc.ref, 'payments')), {
                    amount,
                    memo,
                    date: serverTimestamp()
                })
            } else {
                await setDoc(doc(collection(binyanRef, 'expenditures')), {
                    amount,
                    memo,
                    date: serverTimestamp()
                })
            }
            setResult({ text: 'Saved', status: 'ok' })
        } catch (error) {
            setResult({ text: error.message, status: 'error' })
        }
    }
    
    const handleFlowTypeChange = (e) => {
        e.stopPropagation();   
        setFlowType(prev => 1 - prev);
    }
    
    useEffect(() => {
        if (reasonsSnapshot) {
            const rsns = reasonsSnapshot.docs.map(rDoc => ({            
                id: rDoc.id,
                ...rDoc.data()  
            })).filter(r => r.type == flowType);
            setReasons(rsns);
        }
    }, [flowType, reasonsSnapshot])
    
    return (
        <form className={styles.container} onSubmit={handleForm}>
            <label htmlFor="jgPX98BGdf34">Type:</label>
            <select value={flowType} name="type" id="jgPX98BGdf34" onChange={handleFlowTypeChange}>
                <option value={0}>In</option>
                <option value={1}>Out</option>
            </select>
            <label htmlFor="pgDC87SB34mk">Amount</label>
            <input value={amountInput} onChange={e => setAmountInput(e.target.value)} type="number" name="amount" id="pgDC87SB34mk" />
            {flowType == 0 && <>
                <label htmlFor="poVB65022GH">Resident:</label>
                <select name="resident" id="poVB65022GH">
                    {apartments.map(apt => (
                        <option value={apt.id}>{apt.nickname}</option>
                    ))}
                </select>
            </>}
            <label htmlFor="plBN47jhJH">Reason:</label>
            {!!reasonsSnapshot && <select name="reason" id="plBN47jhJH">
                {reasons.map(r => <option value={r.text}>{r.text}</option>)}
            </select>}
            {!!reasonsLoading && <Loading />}
            {!!reasonsError && <span>{reasonsError.message}</span>}
            <button disabled={amountInput < 0.01}>Save</button>
            {result.status == 'flight' && <Loading />}
            {!!result.text && <span className={styles[result.status]}>{result.text}</span>}
        </form>
    )
}