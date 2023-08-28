import Redis from 'ioredis';

const redisInit = new Redis({
  port: parseInt(process.env.REDIS_PORT!),
  host: process.env.REDIS_HOST, // Redis host
  username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB!), // Defaults to 0
});

export class RedisDb {
  redis;
  constructor() {
    this.redis = redisInit;
  }
  async get(key: string): Promise<any> {
    const res = await this.redis.get(key);
    return res ? JSON.parse(res as string) : null;
  }
  async set<T = any>(key: string, result: T, exp = 3600): Promise<any> {
    return await this.redis.set(key, JSON.stringify(result), 'EX', exp);
  }
}
