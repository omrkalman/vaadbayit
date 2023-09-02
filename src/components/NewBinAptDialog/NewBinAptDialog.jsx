import { Children, forwardRef, useState, useEffect } from 'react';
import styles from './styles.module.css';


const NewBinAptDialog = forwardRef(({ onSubmit, children }, dialogRef) => {

    const [isOKButtonDisabled, setIsOKButtonDisabled] = useState(true);

    useEffect(() => {
        // Function to check if all input elements have a value
        const areAllInputsFilled = () => {
            const inputs = dialogRef.current.querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) {
                    return false;
                }
            }
            return true;
        };
        // Update the disabled state of the "OK" button whenever inputs change
        const handleInputChange = () => {
            setIsOKButtonDisabled(!areAllInputsFilled());
        };
        const inputs = dialogRef.current.querySelectorAll('input');
        inputs.forEach((input) => {
            input.addEventListener('input', handleInputChange);
        });
        // Initial check for the "OK" button's disabled state
        setIsOKButtonDisabled(!areAllInputsFilled());
        return () => {
            // Clean up event listeners
            inputs.forEach((input) => {
                input.removeEventListener('input', handleInputChange);
            });
        };
    }, []);

    const dialogCloseHandler = (ev) => {
        ev.preventDefault();
        dialogRef.current.close();
    }

    return (
        <dialog ref={dialogRef}>
            <p>New Binyan</p>
            <form method="dialog" onSubmit={onSubmit}>
                {children}
                <menu className={styles.buttons}>
                    <button disabled={isOKButtonDisabled}>OK</button>
                    <button onClick={dialogCloseHandler}>Cancel</button>
                </menu>
            </form>
        </dialog>
    )
})


export default NewBinAptDialog;