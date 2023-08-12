"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationRouter = void 0;
const getRecommendationsFromNeo4j_1 = require("./getRecommendationsFromNeo4j");
const db_1 = require("../../db");
const recommendationRouter = async (req, res) => {
    try {
        const recommendations = await (0, getRecommendationsFromNeo4j_1.getRecommendationsFromNeo4j)(req.context.userData);
        if (recommendations.length) {
            const movies = await db_1.db.elasticsearch.searchByIds(recommendations);
            return res.json(movies);
        }
        const cachedTopRated = await db_1.db.redis.get('topRated');
        if (cachedTopRated) {
            return res.json(cachedTopRated);
        }
        const topRatedFromTmdb = await db_1.db.tmdb.getTopRated();
        return res.json(topRatedFromTmdb);
    }
    catch (error) {
        return res.status(500).send('Failed to fetch recommendations');
    }
};
exports.recommendationRouter = recommendationRouter;
//# sourceMappingURL=index.js.map