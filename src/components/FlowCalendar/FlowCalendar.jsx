import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, doc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import styles from './styles.module.css'
import formatMoney from '../../utility/formatMoney';
import Loading from '../Loading/Loading';

export default function FlowCalendar() {

    const { id } = useParams();
    const expsCollectionRef = collection(doc(db, 'binyanim', id), 'expenditures');
    const [expsSnapshot, expsLoading, expsError] = useCollection(expsCollectionRef);
    const [exps, setExps] = useState([]);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        if (expsSnapshot) {
            setExps(expsSnapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            })));
        }
    }, [expsSnapshot])
    
    if (expsError) {
        return <div>Error: {expsError?.message}</div>;
    }

    if (expsLoading) {
        return <Loading />
    }

    function handleEventClick(data) {
        setModalData(exps.find(exp => exp.id == data.event.id));
    }

    return (
        <>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={exps.map(exp => ({
                    id: exp.id,
                    title: exp.memo,
                    date: format(exp.date.toDate(), 'yyyy-MM-dd'),
                    classNames: [
                        styles.event,
                        styles.expenditure
                    ]
                }))}
                eventClick={handleEventClick}
            />
            {!!modalData && <div className={styles.modal}>
                <h1 style={{ textAlign: 'center' }}>{formatMoney(modalData.amount)}</h1>
                <h2 style={{ textAlign: 'center' }}><i>"{modalData.memo}"</i></h2>
                <button onClick={() => setModalData(null)}>Close</button>
            </div>}
        </>
    )
}