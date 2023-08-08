import { redis } from '../../db/redis';
export declare function getTopRatedFromRedis(redisService: typeof redis): Promise<any>;
