import {GameConnectedEventArgs, GameDisconnectedEventArgs, Event} from "@common/event";

export interface IElectronAPI {
    getConnectedGames(): Promise<GameConnectedEventArgs | null>,
    onGameConnected: (clb: (e: Event<GameConnectedEventArgs>) => void) => void,
    onGameDisconnected: (clb: (e: Event<GameDisconnectedEventArgs>) => void) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
