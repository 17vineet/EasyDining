import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import styles from "./TakeOrderModal.module.css"

const TakeOrderModal = ({ phone, closeTakeOrderModal }) => {
    return (
        <div className={styles.orderModal}>
            <div className={styles.orderModalContent} key={phone}>
                <div><CloseIcon className={styles.closeBtn} onClick={() => closeTakeOrderModal(null)}/></div>
            </div>
        </div>
    );
}

export default TakeOrderModal;