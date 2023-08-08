"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topRatedRouter = void 0;
const topRatedRouter = async (req, res) => {
    const tmdb = req.context.tmdb;
    const redis = req.context.redis;
    const cachedData = await redis.get('topRated');
    if (cachedData) {
        return res.send(JSON.parse(cachedData));
    }
    const tmdbResponse = await tmdb.movie.getTopRated({
        query: {
            page: 1,
        },
    });
    const result = tmdbResponse.data.results.slice(0, 10);
    redis.set('topRated', JSON.stringify(result), 'EX', 3600);
    return res.json(result);
};
exports.topRatedRouter = topRatedRouter;
//# sourceMappingURL=index.js.map