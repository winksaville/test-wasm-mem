import * as fs from "fs";

/**
 * Read the file and return a Uint8Array
 *
 * @param filePath is the path to the input file
 * @return data: Uint8Array
 * @throws Error(string)
 */
export function readFileAsync(filePath: string): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(new Error(`readFileAsync: filePath=${filePath} err=${err}`));
                //return reject(`shit`);
                //throw new Error(`readFileAsync: filePath=${filePath} err=${err}`);
            } else {
                return resolve(new Uint8Array(data));
            }
        });
    });
}

/**
 * Stat a file
 *
 * @param path to file
 * @return stats: fs.Stats
 * @throws Error(string)
 */
export function statAsync(path: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
        fs.stat(path, (statErr: NodeJS.ErrnoException, stats: fs.Stats) => {
            if (statErr) {
                return reject(new Error(`statAsync: path=${path} err=${statErr}`));
            }
            return resolve(stats);
        });
    });
}

/**
 * Use unlink a file
 *
 * @param path to file
 * @param throwOnErr a boolean which throws an error
 * @return nothing
 * @throws Error(string)
 */
export function unlinkAsync(path: string, throwOnErr?: boolean): Promise<void> {
    try {
        return new Promise<void>((resolve, reject) => {
            fs.unlink(path, (unlinkErr) => {
                if (unlinkErr && throwOnErr) {
                    return reject(new Error(`unlinkAsync: path=${path} err=${unlinkErr}`));
                }
                return resolve();
            });
        });
    } catch (ex) {
        if (throwOnErr) {
            return Promise.reject(new Error(`unlinkAsync: err=${ex}`));
        } else {
            return Promise.resolve();
        }
    }
}

/**
 * Instatnitate a Wasm File
 *
 * @param filePath is path to the file to instantiate
 * @return WebAssembly.Instance
 * @throws Error(string)
 */
export async function instantiateWasmFile(filePath: string, imports?: any): Promise<WebAssembly.Instance> {
    // Read the file
    let data = await readFileAsync(filePath);

    // Compile
    let mod = await WebAssembly.compile(data);

    // Instantiate:
    let instance = await WebAssembly.instantiate(mod, imports);

    return instance;
}
