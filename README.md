# Test wasm memory sharing

# Prerequistes
- clang
- node
- yarn
- [llvmwasm-builder](https://github.com/winksaville/llvmwasm-builder) installed at ../llvmwasm-builder

# Install
```
$ yarn install
yarn install v0.24.6
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
$ yarn add.nodev9 && yarn postcleanup
yarn add.nodev9 v0.24.6
$ rm -rf nodev9 && mkdir nodev9 && curl https://nodejs.org/download/v8-canary/v9.0.0-v8-canary201706199cf43ea3fd/node-v9.0.0-v8-canary201706199cf43ea3fd-linux-x64.tar.xz -s -o node-v9.tar.xz && tar -xJf node-v9.tar.xz -C nodev9 --strip-components 1 && rm node-v9.tar.xz 
Done in 5.29s.
yarn postcleanup v0.24.6
$ mkdir -p build out .d 
Done in 0.09s.
Done in 5.96s.
```

# Run mem
```
$ yarn mem
yarn mem v0.24.6
$ make build.wasm && tsc -p src/utils.tsconfig.json && tsc -p src/mem.tsconfig.json
/home/wink/prgs/llvmwasm-builder/dist/bin/clang --target=wasm32-unknown-unknown-wasm -O3 -Weverything -Werror -std=c11 -Iinc -DDBG=0 src/mem.c -c -o out/src/mem.c.wasm
/home/wink/prgs/llvmwasm-builder/dist/bin/wasm2wast out/src/mem.c.wasm -o out/src/mem.c.wast
$ yarn nodev9 build/mem.js 
yarn nodev9 v0.24.6
$ ./nodev9/bin/node build/mem.js
arrayU8[0]=0
arrayU8[1]=0
getMem(0)=10
getMem(1)=11
setMem(0, 1)=1
setMem(1, 2)=2
getMemAddr(0)=0
getMemAddr(1)=1
getMem(0)=1
getMem(1)=2
arrayU8[0]=0
arrayU8[1]=0
Done in 0.14s.
Done in 3.99s.
```
