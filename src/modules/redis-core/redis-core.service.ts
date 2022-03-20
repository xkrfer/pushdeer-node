import IORedis from 'ioredis';

const options = {
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0,
};


export class RedisCoreService {
  private static redis: IORedis.Redis;

  static async set(key: string, value: any) {
    await RedisCoreService.init();
    return await RedisCoreService.redis.set(key, value);
  }

  static async get(key: string) {
    await RedisCoreService.init();
    return await RedisCoreService.redis.get(key);
  }

  static async init() {
    if (!RedisCoreService.redis) {
      RedisCoreService.redis = await new IORedis(options);
    }
    return RedisCoreService.redis;
  }
}
