"use client"

import {useEffect, useState} from "react";
import {GameConnectedEventArgs, GameDisconnectedEventArgs, Event} from "@common/event";

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
        <div>
            {gameConnectedInfo.name}
            {gameConnectedInfo.version}
        </div>
    )
}

export default GameIndicator
