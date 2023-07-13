"use client"

import {useEffect} from "react";

type Props = {
    name: string
}

const GameIndicator = ({name}: Props) => {
    useEffect(() => {
        global.window.electronAPI.onGameConnected(() => {
            console.log('onGameConnected')
        })

        global.window.electronAPI.onGameDisconnected(() => {
            console.log('onGameDisconnected')
        })
    }, [])

    return (
        <div>
            {name}
        </div>
    )
}

export default GameIndicator
