"use client"

import {useGameProperties} from "@common/data/game";
import Dialog from "../dialog";
import styles from "./styles.module.css";

type Props = {
    open: boolean
    onClose: () => void
}

const GameProperties = ({ open, onClose }: Props) => {
    const gameProperties = useGameProperties()

    return (
        <Dialog open={open}>
            <div className={styles.dialog}>
                <div className={styles.header}>
                    <button className={styles.button} title="Close" onClick={() => onClose()}>X</button>
                </div>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className={styles.itemTitle}>Current RPM:</span>
                        <span className={styles.itemValue}>{gameProperties?.currentRpm}</span>
                    </li>
                </ul>
            </div>
        </Dialog>
    )
}

export default GameProperties
