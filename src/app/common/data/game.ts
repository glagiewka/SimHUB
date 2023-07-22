import {useEffect, useState} from "react";
import {
    CarChangeEventArgs,
    Event,
    GameConnectedEventArgs,
    GameDisconnectedEventArgs,
    PhysicsChangeEventArgs
} from "@common/types/event";

export const useConnectedGame = () => {
    const [gameConnectedInfo, setGameConnectedInfo] = useState<GameConnectedEventArgs | null>(null)

    useEffect(() => {
        global.window.electronAPI.getCurrentGame().then((gameInfo) => {
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
    const [gameProperties, setGameProperties] = useState<PhysicsChangeEventArgs>({ currentRpm: 0})

    useEffect(() => {
        global.window.electronAPI.onPhysicsChange((e: Event<PhysicsChangeEventArgs>) => {
            setGameProperties(e.value)
        })
    }, [])

    return gameProperties
}

export const useCarProperties = () => {
    const [carProperties, setCarProperties] = useState<CarChangeEventArgs | null>({ maxRpm: 0})

    useEffect(() => {
        global.window.electronAPI.getCurrentCar().then((gameInfo) => {
            setCarProperties(gameInfo)
        })

        global.window.electronAPI.onCarChange((e: Event<CarChangeEventArgs>) => {
            setCarProperties(e.value)
        })
    }, [])

    return carProperties
}
