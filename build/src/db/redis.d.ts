import Redis from 'ioredis';
export declare class RedisDb {
    redis: Redis;
    constructor();
    get(key: string): Promise<any>;
    set<T = any>(key: string, result: T, exp?: number): Promise<any>;
}
