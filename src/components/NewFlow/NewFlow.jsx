import { useEffect, useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../config/firebaseConfig';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css'
import Loading from '../Loading/Loading';
import Dialog from '../Dialog/Dialog';

export default function({ apartmentDocs, apartments }) {

    const { id } = useParams();
    const binyanRef = doc(db, 'binyanim', id);
    const reasonsRef = collection(binyanRef, 'reasons');
    const [reasonsSnapshot, reasonsLoading, reasonsError] = useCollection(reasonsRef);
    const [flowType, setFlowType] = useState(0);
    const [reasons, setReasons] = useState([]);
    const [result, setResult] = useState({ text: '', status: ''})
    const [amountInput, setAmountInput] = useState(0);
    const [reasonInput, setReasonInput] = useState('');
    const dialogRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const [resident, setResident] = useState('');
    
    useEffect(() => {
        const rsdnt = searchParams.get('resident');
        if (rsdnt) setResident(rsdnt)
    }, [searchParams])


    useEffect(() => {
        if (reasonsSnapshot) {
            const rsns = reasonsSnapshot.docs.map(rDoc => ({            
                id: rDoc.id,
                ...rDoc.data()  
            })).filter(r => r.type == flowType);
            setReasons(rsns);
        }
    }, [flowType, reasonsSnapshot])
    
    const handleForm = async(e) => {
        e.preventDefault();
        setResult({ status: 'flight' });
        const data = {
            amount: +amountInput,
            memo: reasonInput,
            date: serverTimestamp()
        }
        try {
            if (flowType == 0 /* in */) {
                const apartmentDoc = apartmentDocs.find(aDoc => aDoc.id == resident)
                await setDoc(doc(collection(apartmentDoc.ref, 'payments')), data)
            } else {
                await setDoc(doc(collection(binyanRef, 'expenditures')), data)
            }
            setResult({ text: 'Saved', status: 'ok' })
        } catch (error) {
            console.error(error);
            setResult({ text: error.message, status: 'error' })
        }
    }
    
    const handleFlowTypeChange = (e) => {
        e.stopPropagation();   
        setFlowType(prev => 1 - prev);
    }

    const handleReasonChange = (e) => {
        const reasonText = e.target.value;
        if (reasonText == '~^^NeW^^~') dialogRef.current.showModal();
        else setReasonInput(reasonText);
    }

    const dialogFormSubmitHandler = async (event) => {
        try {
            setResult({ status: 'flight' });
            await setDoc(doc(reasonsRef), {
                text: event.target.text.value,
                type: flowType,
            });
            setReasonInput(event.target.text.value);
            setResult({ status: '' });
        } catch (error) {
            console.error('Error adding document:', error);
            setResult({ status: 'error', text: error.message })
        } finally {
            event.target.text.value = '';
        }
    }
    
    return (
        <>
            <form className={styles.container} onSubmit={handleForm}>
                <label>Type:</label>
                <select value={flowType} onChange={handleFlowTypeChange}>
                    <option value={0}>In</option>
                    <option value={1}>Out</option>
                </select>
                <label>Amount</label>
                <input value={amountInput} onChange={e => setAmountInput(e.target.value)} type="number" />
                {flowType == 0 && <>
                    <label>Resident:</label>
                    <select value={resident} onChange={e => setSearchParams({ resident: e.target.value })}>
                        {apartments.map(apt => (
                            <option key={Math.trunc(Math.random()*10e6)} value={apt.id}>{apt.nickname}</option>
                        ))}
                    </select>
                </>}
                <label>Reason:</label>
                {!!reasonsSnapshot && <select value={reasonInput} onChange={handleReasonChange}>
                    <option disabled value="">Select a reason </option>
                    <option value="~^^NeW^^~">New reason</option>
                    {reasons.map(r => <option key={Math.trunc(Math.random()*10e6)} value={r.text}>{r.text}</option>)}
                </select>}
                {!!reasonsLoading && <Loading />}
                {!!reasonsError && <span className={styles.result+' '+styles.error}>{reasonsError.message}</span>}
                <button disabled={!(reasonInput && amountInput >= 0.01)}>Save</button>
                {result.status == 'flight' && <Loading />}
                {!!result.text && <span className={styles.result+' '+styles[result.status]}>{result.text}</span>}
            </form>
            <Dialog onSubmit={dialogFormSubmitHandler} ref={dialogRef} heading='Reason'>
                <input style={{display: 'block'}} type="text" name="text" />
            </Dialog>
        </>
    )
}