"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.default({
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB), // Defaults to 0
});
exports.redis = redis;
//# sourceMappingURL=redis.js.map