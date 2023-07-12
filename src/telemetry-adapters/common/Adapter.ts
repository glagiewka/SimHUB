import {Graphics, Physics, Static} from "./Types";
import EventEmitter from "eventemitter3";

export abstract class Adapter {

    private eventEmitter = new EventEmitter();

    public abstract start(): void;

    public subscribe<T extends keyof TypeMap>(type: T, clb: (e: Adapter.Event<TypeMap[T]>) => void) {
        this.eventEmitter.on(type, clb)
        return this;
    }
    public unsubscribe<T extends keyof TypeMap>(type: T, clb: (e: Adapter.Event<TypeMap[T]>) => void) {
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
}

export namespace Adapter {
    export enum Type {
        Physics = 'Physics',
        Graphics = 'Graphics',
        Static = 'Static'
    }

    export type Event<T> = {
        type: Type,
        value: T
    }
}

type TypeMap = {
    [Adapter.Type.Physics]: Physics;
    [Adapter.Type.Static]: Static;
    [Adapter.Type.Graphics]: Graphics;
}
