import {spawn} from 'node:child_process';
import {clearInterval} from "timers";
import {EventName, GameConnectedEventArgs} from "@common/types/event";
import {wrapError} from "@common/types/error";

import {Adapter} from "../common/Adapter";
import {Physics, Static} from "./types";

export class ACAdapter extends Adapter {

    private connectedGames: GameConnectedEventArgs | null = null
    private staticInterval: NodeJS.Timer | null = null;
    private physicsInterval: NodeJS.Timer | null = null;

    constructor(private readonly binaryFile: string) {
        super()
    }

    public start() {
        this.staticInterval = setInterval(async () => {
            try {
                const staticInfo = await this.readFile<Static>('static')
                console.log(staticInfo)

                staticInfo ? this.connect(staticInfo) : this.disconnect()
            } catch (e) {
                this.disconnect()
                this.emit(EventName.Error, wrapError(e))
            }
        }, 1000)

        return this;
    }

    public dispose() {
        super.dispose();

        if (this.staticInterval) {
            clearInterval(this.staticInterval);
        }
    }

    public getConnectedGame(): GameConnectedEventArgs | null {
        return this.connectedGames;
    }

    /**
     * Spawns a shared memory process and reads data for the given type
     *
     * @throws Error - when spawning a process fails
     */
    private readFile<T>(type: string) {
        return new Promise<T>((resolve, reject) => {
            const bat = spawn(this.binaryFile, [type, '--silent']);

            bat.stdout.on('data', (data) => {
                resolve(JSON.parse(data.toString()))
            });

            bat.stderr.on('data', (data) => {
                reject(new Error("Unable to read data from shared memory process", {
                    cause: data.toString()
                }))
            });

            bat.on('error', (e) => {
                reject(new Error("Unable to spawn shared memory process", {
                    cause: e
                }))
            });
        });
    }

    private connect(staticInfo: Static) {
        if (this.connectedGames) {
            return;
        }

        const { acVersion, smVersion } = staticInfo

        if (!acVersion || !smVersion) {
            return;
        }

        const acc = smVersion !== '1.7'
        this.connectedGames = {
            name: acc ? 'Assetto Corsa Competizione' : 'Assetto Corsa',
            version: acVersion
        }

        this.emit(EventName.GameConnected, this.connectedGames)
        this.startListeningToPhysics()
    }

    private disconnect() {
        if (!this.connectedGames) {
            return;
        }

        this.emit(EventName.GameDisconnected, this.connectedGames)
        this.connectedGames = null;
        this.stopListeningToPhysics()
    }

    private startListeningToPhysics() {
        this.physicsInterval = setInterval(async () => {
            try {
                const physics = await this.readFile<Physics>('physics')
                console.log(physics)

                if (!physics)
                {
                    return
                }

                this.emit(EventName.PhysicsChange, {
                    currentRpm: physics.rpm
                })
            } catch (e) {
                this.emit(EventName.Error, wrapError(e))
            }
        }, 100)
    }

    private stopListeningToPhysics() {
        if (this.physicsInterval) {
            clearInterval(this.physicsInterval)
        }
    }
}
