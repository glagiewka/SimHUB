import EventEmitter from "eventemitter3";
import {
    Event,
    EventName,
    GameConnectedEventArgs,
    GameDisconnectedEventArgs,
    PhysicsChangeEventArgs
} from "@common/event";
import {IDisposable} from "@common/general";

export abstract class Adapter implements IDisposable {

    private eventEmitter = new EventEmitter();

    public subscribe<T extends keyof TypeMap>(type: T, clb: (e: Event<TypeMap[T]>) => void) {
        this.eventEmitter.on(type, clb)
        return this;
    }
    public unsubscribe<T extends keyof TypeMap>(type: T, clb: (e: Event<TypeMap[T]>) => void) {
        this.eventEmitter.off(type, clb)
        return this;
    }
    protected emit<T extends keyof TypeMap>(type: T, value: TypeMap[T]) {
        this.eventEmitter.emit(type, {
            type,
            value
        })
        return this;
    }

    public abstract getConnectedGame(): GameConnectedEventArgs | null;
    public abstract start(): this;
    dispose(): void {}
}

type TypeMap = {
    [EventName.Error]: Error;
    [EventName.PhysicsChange]: PhysicsChangeEventArgs;
    [EventName.GameConnected]: GameConnectedEventArgs;
    [EventName.GameDisconnected]: GameDisconnectedEventArgs;

}
