import {
    GameConnectedEventArgs,
    GameDisconnectedEventArgs,
    Event,
    PhysicsChangeEventArgs,
    CarChangeEventArgs
} from "@common/types/event";

export interface IElectronAPI {
    getCurrentGame(): Promise<GameConnectedEventArgs | null>,
    getCurrentCar(): Promise<CarChangeEventArgs | null>,
    onGameConnected: (clb: (e: Event<GameConnectedEventArgs>) => void) => void,
    onCarChange: (clb: (e: Event<CarChangeEventArgs>) => void) => void,
    onGameDisconnected: (clb: (e: Event<GameDisconnectedEventArgs>) => void) => void,
    onPhysicsChange: (clb: (e: Event<PhysicsChangeEventArgs>) => void) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
