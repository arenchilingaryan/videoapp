"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopRatedFromRedis = void 0;
async function getTopRatedFromRedis(redisService) {
    const cachedData = await redisService.get('topRated');
    return cachedData ? JSON.parse(cachedData) : null;
}
exports.getTopRatedFromRedis = getTopRatedFromRedis;
//# sourceMappingURL=getTopRatedFromRedis.js.map