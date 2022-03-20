import { randomUUID } from 'crypto';

export enum Code {
  AUTH = 80403,
  ARGS = 80501,
  REMOTE = 80502,
  DEFAULT = 80999,
  DONE = 0
}

export const Utils = {
  unique(arr: string[]) {
    const res = new Map();
    return arr.filter((id) => !res.has(id) && res.set(id, 1));
  },

  randomUUID(count: number = 32) {
    return randomUUID().replace(/-/g, '').substring(0, count > 32 ? 32 : count);
  },
};
