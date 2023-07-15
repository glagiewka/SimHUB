import {ReactNode} from "react";
import {createPortal} from "react-dom";

import styles from "./styles.module.css";
import {DIALOG_CONTAINER_ID} from "./consts";

type Props = {
    children: ReactNode;
    open: boolean
}

const Dialog = ({ children, open }: Props) => {
    const dialogContainer = document.querySelector(`#${DIALOG_CONTAINER_ID}`)

    if (!dialogContainer) {
        return;
    }

    return <>
        {
            createPortal(
                <dialog className={styles.dialog} open={open}>
                    {children}
                </dialog>,
                dialogContainer
            )
        }
    </>
}


export default Dialog
