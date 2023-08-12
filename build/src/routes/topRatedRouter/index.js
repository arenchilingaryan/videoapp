"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topRatedRouter = void 0;
const db_1 = require("../../db");
const topRatedRouter = async (_, res) => {
    const cachedData = await db_1.db.redis.get('topRated');
    if (cachedData) {
        return res.send(cachedData);
    }
    const tmdbResponse = await db_1.db.tmdb.getTopRated();
    const result = tmdbResponse.results.slice(0, 10);
    await db_1.db.redis.set('topRated', result);
    return res.json(result);
};
exports.topRatedRouter = topRatedRouter;
//# sourceMappingURL=index.js.map