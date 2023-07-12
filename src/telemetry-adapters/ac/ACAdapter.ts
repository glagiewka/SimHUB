import {spawn} from 'node:child_process';
import {Adapter} from "../common/Adapter";
import {Physics, Static} from "../common/Types";

const fileMap = {
    [Adapter.Type.Static]: 'static',
    [Adapter.Type.Graphics]: 'graphics',
    [Adapter.Type.Physics]: 'physics',
}

export class ACAdapter extends Adapter {

    constructor(private readonly binaryFile: string) {
        super()
    }

    public start() {
        setInterval(async () => {
            try {
                this.emit(Adapter.Type.Static, await this.readFile<Static>(Adapter.Type.Static))
            } catch (e) {
                console.error(e)
            }
        }, 1000)

        setInterval(async () => {
            try {
                this.emit(Adapter.Type.Physics, await this.readFile<Physics>(Adapter.Type.Physics))
            } catch (e) {
                console.error(e)
            }
        }, 500)
    }

    /**
     * Spawns a shared memory process and reads data for the given type
     *
     * @throws Error - when spawning a process fails
     */
    private readFile<T>(type: Adapter.Type) {
        return new Promise<T>((resolve, reject) => {
            try {
                const bat = spawn(this.binaryFile, [fileMap[type]]);

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
