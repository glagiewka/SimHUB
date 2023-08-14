import {spawn} from 'node:child_process';
import {clearInterval} from "timers";
import {CarChangeEventArgs, EventName, GameConnectedEventArgs} from "@common/types/event";
import {wrapError} from "@common/types/error";

import {Adapter} from "../common/Adapter";
import {Physics, Static} from "./types";

export class ACAdapter extends Adapter {

    private currentGame: GameConnectedEventArgs | null = null
    private currentCar: CarChangeEventArgs | null = null;
    private staticInterval: NodeJS.Timer | null = null;
    private physicsInterval: NodeJS.Timer | null = null;

    constructor(private readonly binaryFile: string) {
        super()
    }

    public start() {
        this.staticInterval = setInterval(async () => {
            //TODO stop interval when connected or validate data
            try {
                const staticInfo = await this.readFile<Static>('static')
                console.log(staticInfo)

                if (staticInfo) {
                    this.connect(staticInfo)
                    this.updateCar(staticInfo)
                } else {
                    this.disconnect()
                }
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

    public getCurrentGame(): GameConnectedEventArgs | null {
        return this.currentGame;
    }

    public getCurrentCar(): CarChangeEventArgs | null {
        return this.currentCar;
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
        if (this.currentGame) {
            return;
        }

        const { acVersion, smVersion } = staticInfo

        if (!acVersion || !smVersion) {
            return;
        }

        const acc = smVersion !== '1.7'
        this.currentGame = {
            name: acc ? 'Assetto Corsa Competizione' : 'Assetto Corsa',
            version: acVersion
        }

        this.emit(EventName.GameConnected, this.currentGame)
        this.startListeningToPhysics()
    }

    private disconnect() {
        if (!this.currentGame) {
            return;
        }

        this.emit(EventName.GameDisconnected, this.currentGame)
        this.currentGame = null;
        this.currentCar = null
        this.stopListeningToPhysics()
    }

    private startListeningToPhysics() {
        this.physicsInterval = setInterval(async () => {
            try {
                const physics = await this.readFile<Physics>('physics')

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

    private updateCar(staticInfo: Static) {
        const { maxRpm, carModel } = staticInfo
        if (this.currentCar?.carModel === carModel) {
            return;
        }

        this.currentCar = {
            maxRpm,
            carModel
        }
        this.emit(EventName.CarChange, this.currentCar)

    }
}
