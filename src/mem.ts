import {instantiateWasmFile} from "../build/utils";

/**
 * The import object passed to instantiateWasmFile
 */
let instanceMem = new WebAssembly.Memory({initial:1})
let importsForInstance = {
     "": { memory: instanceMem }
};

let a: Uint8Array;

let getMemAddr: (index: number) => number;
let getMem: (index: number) => number;
let setMem: (val: number, index: number) => number;

async function load_wasm_imports(): Promise<Error | null> {
    try {
        let instance = await instantiateWasmFile("./out/src/mem.c.wasm",
            importsForInstance);
        getMemAddr = instance.exports.getMemAddr;
        getMem = instance.exports.getMem;
        setMem = instance.exports.setMem;
        a = instance.exports.a;
        return Promise.resolve(null);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function main() {
    try {
        await load_wasm_imports();

        let arrayU8 = new Uint8Array(instanceMem.buffer);
        for (let i = 0; i < 2; i++) {
            console.log(`arrayU8[${i}]=${arrayU8[i]}`);
        }
        for (let i = 0; i < 2; i++) {
            console.log(`a[${i}]=${a[i]}`);
        }

        console.log(`getMem(0)=${getMem(0)}`);
        console.log(`getMem(1)=${getMem(1)}`);
        console.log(`setMem(0, 1)=${setMem(0, 1)}`);
        console.log(`setMem(1, 2)=${setMem(1, 2)}`);
        console.log(`getMemAddr(0)=${getMemAddr(0)}`);
        console.log(`getMemAddr(1)=${getMemAddr(1)}`);
        console.log(`getMem(0)=${getMem(0)}`);
        console.log(`getMem(1)=${getMem(1)}`);

        for (let i = 0; i < 2; i++) {
            console.log(`arrayU8[${i}]=${arrayU8[i]}`);
        }
        for (let i = 0; i < 2; i++) {
            console.log(`a[${i}]=${a[i]}`);
        }

    } catch(err) {
        console.log(`err=${err}`);
    }
}

main();
