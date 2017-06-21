import {instantiateWasmFile} from "../build/utils";

/**
 * The import object passed to instantiateWasmFile
 */
let mem: Uint8Array;

let get_gArrayAddr: (index: number) => number;
let get_gArray: (index: number) => number;
let set_gArray: (val: number, index: number) => number;

async function load_wasm_imports(): Promise<Error | null> {
    try {
        debugger;

        // TODO: conditionally create instanceMem
        let instanceMem: WebAssembly.Memory | null =
            new WebAssembly.Memory({initial:1});
        let importsForInstance = {
            "env": { memory: instanceMem }
        };

        let instance = await instantiateWasmFile("./out/src/mem.c.wasm",
            importsForInstance);
        get_gArrayAddr = instance.exports.get_gArrayAddr;
        get_gArray = instance.exports.get_gArray;
        set_gArray = instance.exports.set_gArray;
        let memory = instance.exports.memory;
        if (memory == undefined) {
            console.log("memory was imported");
            memory = instanceMem;
        } else {
            console.log("memory was exported");
            instanceMem = null;
        }
        mem = new Uint8Array(memory.buffer);
        //let sab = new SharedArrayBuffer(2);
        //a = new Uint8Array(sab.slice(0));//instance.exports.a.buffer);
        return Promise.resolve(null);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function main() {
    try {
        await load_wasm_imports();

        let memU8Idx0 = get_gArrayAddr(0);
        let memU8Idx1 = get_gArrayAddr(1);
        console.log(`memU8Idx0=${memU8Idx0}`);
        console.log(`memU8Idx1=${memU8Idx1}`);

        for (let i = 0; i < mem.length; i++) {
            if (mem[i] != 0) {
                console.log(`mem[${i}]=${mem[i]}`);
            }
        }

        console.log(`get_gArray(0):${get_gArray(0)} ${get_gArray(0) == mem[memU8Idx0] ? '==' : '!='} mem[memU8Idx0:${memU8Idx0}]:${mem[memU8Idx0]}`);
        console.log(`get_gArray(1):${get_gArray(1)} ${get_gArray(1) == mem[memU8Idx1] ? '==' : '!='} mem[memU8Idx1:${memU8Idx1}]:${mem[memU8Idx1]}`);

        mem[memU8Idx0] = -mem[memU8Idx0];
        mem[memU8Idx1] = -mem[memU8Idx1];

        console.log(`get_gArray(0):${get_gArray(0)} ${get_gArray(0) == mem[memU8Idx0] ? '==' : '!='} mem[memU8Idx0:${memU8Idx0}]:${mem[memU8Idx0]}`);
        console.log(`get_gArray(1):${get_gArray(1)} ${get_gArray(1) == mem[memU8Idx1] ? '==' : '!='} mem[memU8Idx1:${memU8Idx1}]:${mem[memU8Idx1]}`);

        console.log(`set_gArray(0, 1)=${set_gArray(0, 1)} mem[memU8Idx0:${memU8Idx0}]:${mem[memU8Idx0]}`);
        console.log(`set_gArray(1, 2)=${set_gArray(1, 2)} mem[memU8Idx1:${memU8Idx1}]:${mem[memU8Idx1]}`);

        for (let i = 0; i < mem.length; i++) {
            if (mem[i] != 0) {
                console.log(`mem[${i}]=${mem[i]}`);
            }
        }

    } catch(err) {
        console.log(`err=${err}`);
    }
}

main();
