export type GameConnectedEventArgs = {
    name: string,
    version: string
}

export type GameDisconnectedEventArgs = {
    name: string,
    version: string
}

export enum EventName {
    Physics = 'Physics',
    Graphics = 'Graphics',
    Rpm = 'Rpm',
    Error = 'Error',
    GameConnected = 'GameConnected',
    GameDisconnected = 'GameDisconnected',
}

export type Event<T> = {
    type: EventName,
    value: T
}
