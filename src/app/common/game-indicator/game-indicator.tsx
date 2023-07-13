"use client"

import {useEffect, useState} from "react";
import {GameConnectedEventArgs, GameDisconnectedEventArgs, Event} from "@common/event";

import Tile from "../tile";
import styles from "./styles.module.css";

type Props = {
    name: string
}

const GameIndicator = ({name}: Props) => {
    const [gameConnectedInfo, setGameConnectedInfo] = useState<GameConnectedEventArgs | null>(null)
    
    useEffect(() => {
        global.window.electronAPI.onGameConnected((e: Event<GameConnectedEventArgs>) => {
            setGameConnectedInfo(e.value)
        })

        global.window.electronAPI.onGameDisconnected((e: Event<GameDisconnectedEventArgs>) => {
            setGameConnectedInfo(null)
        })
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
        </Tile>
    )
}

export default GameIndicator
