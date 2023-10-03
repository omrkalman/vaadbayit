import { useState } from 'react';
import Balance from '../Balance/Balance';
import NewFlow from '../NewFlow/NewFlow';
import styles from './styles.module.css'
import FlowCalendar from '../FlowCalendar/FlowCalendar';

export default function({ apartmentDocs, expDocs, apartments }) {
    
    const [feature, setFeature] = useState(0);

    const features = [
        [0, 'balance'],
        [1, 'flow history'],
        [2, 'new flow'],
        [3, 'piechart']
    ]
    
    const handleFeatureChange = (e) => {
        
        setFeature(e.target.value);
    }
    
    return (
        <div className={styles.container}>
            <select value={feature} className={styles.choose} name="feature" id="lbFI94FPmv94" onChange={handleFeatureChange}>
                {features.map(feature => (
                    <option key={Math.trunc(Math.random()*10e6)} value={feature[0]}>{feature[1]}</option>
                ))}
            </select>
            {feature == 0 && <Balance apartmentDocs={apartmentDocs} expDocs={expDocs} />}
            {feature == 1 && <FlowCalendar apartmentDocs={apartmentDocs} expDocs={expDocs} />}
            {feature == 2 && <NewFlow apartmentDocs={apartmentDocs} apartments={apartments} />}
        </div>
    )    
}