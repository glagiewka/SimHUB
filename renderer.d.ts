import {GameConnectedEventArgs, GameDisconnectedEventArgs, Event, PhysicsChangeEventArgs} from "@common/types/event";

export interface IElectronAPI {
    getConnectedGames(): Promise<GameConnectedEventArgs | null>,
    onGameConnected: (clb: (e: Event<GameConnectedEventArgs>) => void) => void,
    onGameDisconnected: (clb: (e: Event<GameDisconnectedEventArgs>) => void) => void,
    onPhysicsChange: (clb: (e: Event<PhysicsChangeEventArgs>) => void) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
