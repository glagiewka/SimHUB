import {GameConnectedEventArgs, GameDisconnectedEventArgs, Event} from "@common/event";

export interface IElectronAPI {
    onGameConnected: (clb: (e: Event<GameConnectedEventArgs>) => void) => void,
    onGameDisconnected: (clb: (e: Event<GameDisconnectedEventArgs>) => void) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
