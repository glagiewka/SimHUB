import {Event, EventName, GameConnectedEventArgs, GameDisconnectedEventArgs} from "@common/event";

const { contextBridge, ipcRenderer } = require('electron')

// TODO bundle to support module imports
contextBridge.exposeInMainWorld('electronAPI', {
    onGameConnected: (callback: (e: Event<GameConnectedEventArgs>) => void) => ipcRenderer.on('GameConnected', (_: any, value: Event<GameConnectedEventArgs>) => callback(value)),
    onGameDisconnected: (callback: (e: Event<GameDisconnectedEventArgs>) => void) => ipcRenderer.on('GameDisconnected', (_: any, value: Event<GameDisconnectedEventArgs>) => callback(value))
})
