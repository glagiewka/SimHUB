import {spawn} from 'node:child_process';
import {EventName, GameConnectedEventArgs} from "@common/event";
import {Adapter} from "../common/Adapter";
import {Static} from "./types";
import {wrapError} from "@common/error";

export class ACAdapter extends Adapter {

    private connectedGames: GameConnectedEventArgs | null = null

    constructor(private readonly binaryFile: string) {
        super()
    }

    public start() {
        setInterval(async () => {
            try {
                const staticInfo = await this.readFile<Static>('static')
                console.log(staticInfo)

                staticInfo ? this.connect(staticInfo) : this.disconnect()
            } catch (e) {
                this.disconnect()
                this.emit(EventName.Error, wrapError(e))
            }
        }, 1000)

        setInterval(async () => {
            try {
                // this.emit(EventName.Physics, await this.readFile<Physics>('physics'))
            } catch (e) {
                this.emit(EventName.Error, wrapError(e))
            }
        }, 500)

        return this;
    }

    public dispose() {
        super.dispose();
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
    }

    private disconnect() {
        if (!this.connectedGames) {
            return;
        }

        this.emit(EventName.GameDisconnected, this.connectedGames)
        this.connectedGames = null;
    }
}
