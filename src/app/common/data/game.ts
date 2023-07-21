import {useEffect, useState} from "react";
import {Event, GameConnectedEventArgs, GameDisconnectedEventArgs, PhysicsChangeEventArgs} from "@common/types/event";

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

export const useGameProperties = () => {
    const [physics, setPhysics] = useState<PhysicsChangeEventArgs>({ currentRpm: 0})

    useEffect(() => {
        global.window.electronAPI.onPhysicsChange((e: Event<PhysicsChangeEventArgs>) => {
            setPhysics(e.value)
        })
    }, [])

    return physics
}
