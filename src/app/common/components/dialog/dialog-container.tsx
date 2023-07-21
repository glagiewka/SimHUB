import {memo} from "react";
import {DIALOG_CONTAINER_ID} from "./consts";

import styles from "./styles.module.css";


const DialogContainer = () => {
    return (
        <div id={DIALOG_CONTAINER_ID} className={styles.dialogContainer}></div>
    )
}

export default memo(DialogContainer)
