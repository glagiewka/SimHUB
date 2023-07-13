import {spawn} from 'node:child_process';
import {EventName} from "@common/event";
import {Adapter} from "../common/Adapter";
import {Physics, Static} from "../common/Types";

export class ACAdapter extends Adapter {

    private isGameConnected: boolean = false;

    constructor(private readonly binaryFile: string) {
        super()
    }

    public start() {
        setInterval(async () => {
            try {
                const staticInfo = await this.readFile<Static>('static')

                if (!this.isGameConnected) {
                    this.emit(EventName.GameConnected, {
                        name: 'Assetto Corsa',
                        version: staticInfo.ACVersion
                    })
                    this.isGameConnected = true;
                }
            } catch (e) {
                if (this.isGameConnected) {
                    this.emit(EventName.GameDisconnected, {
                        name: 'Assetto Corsa',
                    })
                    this.isGameConnected = false;
                }
                console.error(e)
            }
        }, 1000)

        setInterval(async () => {
            try {
                this.emit(EventName.Physics, await this.readFile<Physics>('physics'))
            } catch (e) {
                console.error(e)
            }
        }, 500)
    }

    public dispose() {
        super.dispose();
    }

    /**
     * Spawns a shared memory process and reads data for the given type
     *
     * @throws Error - when spawning a process fails
     */
    private readFile<T>(type: string) {
        return new Promise<T>((resolve, reject) => {
            try {
                const bat = spawn(this.binaryFile, [type]);

                bat.stdout.on('data', (data) => {
                    resolve(JSON.parse(data.toString()))
                });

                bat.stderr.on('data', (data) => {
                    // handle AC not running
                    reject(new Error("Unable to read data from shared memory process"))
                });
            } catch (e) {
                reject(new Error("Unable to spawn shared memory process"))
            }
            // bat.on('exit', (code) => {
            //     console.log(`Child exited with code ${code}`);
            // });
        });
    }
}
