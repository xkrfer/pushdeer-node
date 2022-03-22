import IORedis from 'ioredis';
import getConfig from '../../config/configuration';

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
      const config = getConfig().redis;
      RedisCoreService.redis = await new IORedis({
        port: 56379,
        host: 'localhost',
        family: 4,
        db: 0,
        ...config,
      });
    }
    return RedisCoreService.redis;
  }
}
