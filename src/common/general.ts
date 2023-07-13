export interface IDisposable {
    dispose(): void
}

class Exception extends Error {
    constructor() {
        super();
    }
}
