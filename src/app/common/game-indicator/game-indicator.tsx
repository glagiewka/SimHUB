"use client"

import {useConnectedGame} from "@data/hooks/game";

import Tile from "../tile";
import styles from "./styles.module.css";

const GameIndicator = () => {
    const gameConnectedInfo = useConnectedGame()

    if (!gameConnectedInfo) {
        return null;
    }

    return (
        <Tile>
            <div className={styles.gameTitle}>
                {gameConnectedInfo.name}
            </div>
            <div className={styles.gameVersion}>
                {gameConnectedInfo.version}
            </div>
        </Tile>
    )
}

export default GameIndicator
