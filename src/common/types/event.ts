export type GameConnectedEventArgs = {
    name: string,
    version: string
}

export type GameDisconnectedEventArgs = {
    name: string,
    version: string
}

export type PhysicsChangeEventArgs = {
   currentRpm: number
}

export type CarChangeEventArgs = {
    maxRpm: number
}

export enum EventName {
    PhysicsChange = 'PhysicsChange',
    CarChange = 'CarChange',
    Error = 'Error',
    GameConnected = 'GameConnected',
    GameDisconnected = 'GameDisconnected',
}

export type Event<T> = {
    type: EventName,
    value: T
}
