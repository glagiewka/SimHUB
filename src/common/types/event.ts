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

export enum EventName {
    PhysicsChange = 'PhysicsChange',
    Error = 'Error',
    GameConnected = 'GameConnected',
    GameDisconnected = 'GameDisconnected',
}

export type Event<T> = {
    type: EventName,
    value: T
}
