"use client"

import {useCallback, useState} from "react";
import {useConnectedGame} from "@data/hooks/game";

import Tile from "../tile";
import GameProperties from "../game-properties";
import styles from "./styles.module.css";

const GameIndicator = () => {
    const gameConnectedInfo = useConnectedGame()
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

    const onDetailsClick = useCallback(() => {
        setDetailsOpen(true)
    }, [])

    const onDetailsClose = useCallback(() => {
        setDetailsOpen(false)
    }, [])

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
            <button className={styles.button} onClick={onDetailsClick}>Details</button>
            <GameProperties open={detailsOpen} onClose={onDetailsClose}/>
        </Tile>
    )
}

export default GameIndicator
