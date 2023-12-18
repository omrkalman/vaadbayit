import styles from './Binyan.module.css';
import { useNavigate } from 'react-router-dom';

function Binyan({ binyan }) {
    const navigate = useNavigate();

    return (
        <div className={[styles.binyan, 'my-card'].join(' ')} onClick={() => navigate(`/binyan/${binyan.id}`)}>
            <h3 className={styles.name}>{binyan.name}</h3>
            <img className={styles.img} src="/building_4dark.png" alt="Apartment building" />
        </div>
    )
}

export default Binyan;