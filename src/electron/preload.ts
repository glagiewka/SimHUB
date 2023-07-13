const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onGameConnected: (callback: () => void) => ipcRenderer.on('game-connected', callback)
})
