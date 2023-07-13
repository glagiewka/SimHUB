import EventEmitter from "eventemitter3";
import {Event, EventName, GameConnectedEventArgs, GameDisconnectedEventArgs} from "@common/event";
import {IDisposable} from "@common/general";

import {Graphics, Physics} from "./Types";

export abstract class Adapter implements IDisposable {

    private eventEmitter = new EventEmitter();

    public abstract start(): void;

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

    dispose(): void {}
}

type TypeMap = {
    [EventName.Physics]: Physics;
    [EventName.Graphics]: Graphics;
    [EventName.GameConnected]: GameConnectedEventArgs;
    [EventName.GameDisconnected]: GameDisconnectedEventArgs;

}
