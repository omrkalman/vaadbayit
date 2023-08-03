import styles from './Binyan.module.css';

function Binyan({ binyan }) {
    return (
        <div className={styles.binyan}>
            {Object.entries(binyan).map(([key, value]) => (
                <p key={Math.trunc(Math.random()*10e6)}>{key}: {JSON.stringify(value)}</p>
            ))}
        </div>
    )
}

export default Binyan;