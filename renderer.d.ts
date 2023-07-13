export interface IElectronAPI {
    onGameConnected: (clb: () => void) => void,
    onGameDisconnected: (clb: () => void) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
