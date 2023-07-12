export type Physics = {
    rpm: number
}

export type Static = {
    maxRpm: number
}

export type Graphics = {
}

interface IDisposable {}

class Exception extends Error {
    constructor() {
        super();
    }
}
