#ifndef MEM_H
#define MEM_H

#include <sizedtypes.h>

extern u8 a[2];

u8* getMemAddr(u32 index);
u8 getMem(u32 index);
u8 setMem(u32 index, u8 val);

#endif
