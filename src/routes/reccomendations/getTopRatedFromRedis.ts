import { redis } from '../../db/redis';

export async function getTopRatedFromRedis(redisService: typeof redis) {
  const cachedData = await redisService.get('topRated');
  return cachedData ? JSON.parse(cachedData) : null;
}
