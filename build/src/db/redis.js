"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDb = void 0;
const ioredis_1 = require("ioredis");
const redisInit = new ioredis_1.default({
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB), // Defaults to 0
});
class RedisDb {
    constructor() {
        this.redis = redisInit;
    }
    async get(key) {
        const res = await this.redis.get(key);
        return res ? JSON.parse(res) : null;
    }
    async set(key, result, exp = 3600) {
        return await this.redis.set(key, JSON.stringify(result), 'EX', exp);
    }
}
exports.RedisDb = RedisDb;
//# sourceMappingURL=redis.js.map