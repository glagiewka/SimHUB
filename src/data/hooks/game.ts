import {useEffect, useState} from "react";
import {Event, GameConnectedEventArgs, GameDisconnectedEventArgs} from "@common/event";

export const useConnectedGame = () => {
    const [gameConnectedInfo, setGameConnectedInfo] = useState<GameConnectedEventArgs | null>(null)

    useEffect(() => {
        global.window.electronAPI.getConnectedGames().then((gameInfo) => {
            setGameConnectedInfo(gameInfo)
        })

        global.window.electronAPI.onGameConnected((e: Event<GameConnectedEventArgs>) => {
            setGameConnectedInfo(e.value)
        })

        global.window.electronAPI.onGameDisconnected((e: Event<GameDisconnectedEventArgs>) => {
            setGameConnectedInfo(null)
        })
    }, [])

    return gameConnectedInfo;
}
