#include "./mem.h"
#include <sizedtypes.h>

static u8 gArray[2] = { 10, 11 };

u8* get_gArrayAddr(u32 u8Idx) {
  return &gArray[u8Idx];
}

u8 get_gArray(u32 u8Idx) {
  return gArray[u8Idx];
}

u8 set_gArray(u32 u8Idx, u8 val) {
  gArray[u8Idx] = val;
  return get_gArray(u8Idx);
}
