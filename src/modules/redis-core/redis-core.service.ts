import IORedis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from 'src/helpers/config';

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

  static async remove(key: string) {
    await RedisCoreService.init();
    return await RedisCoreService.redis.del(key);
  }

  static async init() {
    if (!RedisCoreService.redis) {
      RedisCoreService.redis = await new IORedis({
        port: REDIS_PORT,
        host: REDIS_HOST,
        family: 4,
        db: 0,
      });
    }
    return RedisCoreService.redis;
  }
}
