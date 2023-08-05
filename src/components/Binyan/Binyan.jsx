import styles from './Binyan.module.css';
import { useNavigate } from 'react-router-dom';

function Binyan({ binyan }) {
    const navigate = useNavigate();

    return (
        <div className={styles.binyan} onClick={() => navigate(`/binyan/${binyan.id}`)}>
            {/* <h3 style={{ textAlign: 'center' }}>{binyan.name}</h3> */}
            {Object.entries(binyan).map(([key, value]) => (
                <p key={Math.trunc(Math.random()*10e6)}>{key}: {JSON.stringify(value)}</p>
            ))}
        </div>
    )
}

export default Binyan;