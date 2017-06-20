# Makefile for test-wasm-mem
# Parameters:
#   DBG=0 or 1 (default = 0)

# Remove builtin suffix rules
#.SUFFIXES:

# _DBG will be 0 if DBG isn't defined on the command line
_DBG = +$(DBG)
ifeq ($(_DBG), +)
  _DBG = 0
endif

outDir=out
srcDir=src
incDir=inc
srcDstDir=$(outDir)/$(srcDir)

# Make srcDstDir
$(shell mkdir -p $(srcDstDir) >/dev/null)

cc.wasm=$(HOME)/prgs/llvmwasm-builder/dist/bin/clang
wasm2wast=$(HOME)/prgs/llvmwasm-builder/dist/bin/wasm2wast
wasm-link=$(HOME)/prgs/llvmwasm-builder/dist/bin/wasm-link

CC=clang
CFLAGS=-O3 -Weverything -Werror -std=c11 -I$(incDir) -DDBG=$(_DBG)

OD=objdump
ODFLAGS=-S -M x86_64,intel

LNK=$(CC)
LNKFLAGS=-lm

COMPILE.c = $(CC) $(CFLAGS) $(CPPFLAGS) $(TARGET_ARCH) -g -c

# wasm suffix rules for srcDir
$(srcDstDir)/%.c.wasm: $(srcDir)/%.c
	@mkdir -p $(@D)
	$(cc.wasm) --target=wasm32-unknown-unknown-wasm $(CFLAGS) $< -c -o $@
	$(wasm2wast) $@ -o $(basename $@).wast

SRCS= \
	  $(srcDir)/mem.c

OBJS= \
	  $(srcDstDir)/mem.o

all: build.wasm

build.wasm: \
 $(srcDstDir)/mem.c.wasm

clean :
	@rm -rf $(outDir)
