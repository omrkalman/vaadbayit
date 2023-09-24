import styles from './Loading.module.css'; // Import your CSS file for styling

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
};

export default Loading;