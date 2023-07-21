import {
    Event,
    GameConnectedEventArgs,
    GameDisconnectedEventArgs,
    PhysicsChangeEventArgs
} from "@common/types/event";

const { contextBridge, ipcRenderer } = require('electron')

// TODO bundle to support module imports
contextBridge.exposeInMainWorld('electronAPI', {
    getConnectedGames: (): Promise<GameConnectedEventArgs | null> => ipcRenderer.invoke('game:getConnectedGames'),
    onGameConnected: (callback: (e: Event<GameConnectedEventArgs>) => void) => ipcRenderer.on('GameConnected', (_: any, value: Event<GameConnectedEventArgs>) => callback(value)),
    onGameDisconnected: (callback: (e: Event<GameDisconnectedEventArgs>) => void) => ipcRenderer.on('GameDisconnected', (_: any, value: Event<GameDisconnectedEventArgs>) => callback(value)),
    onPhysicsChange: (callback: (e: Event<PhysicsChangeEventArgs>) => void) => ipcRenderer.on('PhysicsChange', (_: any, value: Event<PhysicsChangeEventArgs>) => callback(value)),

})
