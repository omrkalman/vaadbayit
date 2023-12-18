import styles from './Apartment.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Apartment({ apartment }) {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className={[styles.apt, 'my-card'].join(' ')} onClick={() => navigate(`/binyan/${id}/apartment/${apartment.id}`)}>
            <h2 className={styles.nickname}>{apartment.nickname}</h2>
            <div className={styles.door}>
                <span className={styles.aptNum}>{apartment.number}</span>
                <img className={styles.img} src="/door_4dark.png" alt="door" />
            </div>
        </div>
    )
}

export default Apartment;