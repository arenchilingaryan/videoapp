"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationRouter = void 0;
const getRecommendationsFromNeo4j_1 = require("./getRecommendationsFromNeo4j");
const searchMoviesInElasticsearch_1 = require("./searchMoviesInElasticsearch");
const getTopRatedFromRedis_1 = require("./getTopRatedFromRedis");
const getTopRatedFromTmdb_1 = require("./getTopRatedFromTmdb");
const recommendationRouter = async (req, res) => {
    try {
        const recommendations = await (0, getRecommendationsFromNeo4j_1.getRecommendationsFromNeo4j)(req.context);
        if (recommendations.length) {
            const movies = await (0, searchMoviesInElasticsearch_1.searchMoviesInElasticsearch)(req.context.elasticsearch, recommendations);
            return res.json(movies);
        }
        const cachedTopRated = await (0, getTopRatedFromRedis_1.getTopRatedFromRedis)(req.context.redis);
        if (cachedTopRated) {
            return res.json(cachedTopRated);
        }
        const topRatedFromTmdb = await (0, getTopRatedFromTmdb_1.getTopRatedFromTmdb)(req.context.tmdb, req.context.redis);
        return res.json(topRatedFromTmdb);
    }
    catch (error) {
        return res.status(500).send('Failed to fetch recommendations');
    }
};
exports.recommendationRouter = recommendationRouter;
//# sourceMappingURL=index.js.map