import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format } from 'date-fns'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import styles from './styles.module.css'
import formatMoney from '../../utility/formatMoney';
import { onlyDarkGreens } from '../../utility/generateColor';
export default function FlowCalendar({ apartmentDocs, expDocs }) {

    const [exps, setExps] = useState([]);
    const [pmnts, setPmnts] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        setExps(expDocs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                amount: -1 * data.amount
            }
        }));
        (async() => {
            try {
                const arr = [];
                for (const aptDoc of apartmentDocs) {
                    const aptId = aptDoc.id;
                    const { nickname } = aptDoc.data()
                    const pmntsRef = collection(aptDoc.ref, 'payments')
                    const pmntsSnapshot = await getDocs(pmntsRef);
                    pmntsSnapshot.docs.forEach(doc => 
                        arr.push({
                            id: doc.id,
                            aptId,
                            nickname,
                            ...doc.data()
                        })
                    )
                }
                setPmnts(arr);
            } catch(error) {
                console.error(error);
            }
        })()
    }, [])

    useEffect(() => {
        setEvents([
            ...exps.map(exp => ({
                id: exp.id,
                title: exp.memo,
                date: format(exp.date.toDate(), 'yyyy-MM-dd'),
                classNames: [
                    styles.expenditure
                ]
            })),
            ...pmnts.map(pmnt => ({
                id: pmnt.id,
                title: pmnt.memo,
                date: format(pmnt.date.toDate(), 'yyyy-MM-dd'),
                backgroundColor: onlyDarkGreens(pmnt.aptId),
                borderColor: onlyDarkGreens(pmnt.aptId)
            }))
        ])
    }, [exps, pmnts])

    function handleEventClick(data) {
        setModalData([...exps, ...pmnts].find(exp => exp.id == data.event.id));
    }

    return (
        <>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
            />
            {!!modalData && <div className={styles.modal}>
                <h1 style={{ textAlign: 'center' }}>{formatMoney(modalData.amount)}</h1>
                {!!modalData.nickname && (
                    <h2 style={{ textAlign: 'center' }}>{modalData.nickname}</h2>
                )}
                <h2 style={{ textAlign: 'center' }}><i>"{modalData.memo}"</i></h2>
                <button onClick={() => setModalData(null)}>Close</button>
            </div>}
        </>
    )
}