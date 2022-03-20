import { randomUUID } from 'crypto';

export const Utils = {
  unique(arr: string[]) {
    const res = new Map();
    return arr.filter((id) => !res.has(id) && res.set(id, 1));
  },

  randomUUID(count: number = 32) {
    return randomUUID().replace(/-/g, '').substring(0, count > 32 ? 32 : count);
  },
};
