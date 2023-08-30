import styles from './Apartment.module.css';

function Apartment({ apartment }) {
    return (
        <div className={styles.apt}>
            <h2 className={styles.nickname}>{apartment.nickname}</h2>
            <div className={styles.door}>
                <span className={styles.aptNum}>{apartment.number}</span>
                <img className={styles.img} src="/door_4dark.png" alt="door" />
            </div>
        </div>
    )
}

export default Apartment;