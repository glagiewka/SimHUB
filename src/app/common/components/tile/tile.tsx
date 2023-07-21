import {ReactNode} from "react";
import styles from "./styles.module.css";

type Props = {
    children: ReactNode
}

const Tile = ({children}: Props) => {
    return (
        <div className={styles.tile}>
            {children}
        </div>
    )
}

export default Tile
