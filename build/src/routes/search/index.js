"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const isValidDataItem_1 = require("../../utils/isValidDataItem");
const db_1 = require("../../db");
const searchRouter = async (req, res) => {
    const query = req.query.query;
    const dataFromRedis = await db_1.db.redis.get(query);
    if (dataFromRedis) {
        return res.json(dataFromRedis);
    }
    const esQueryResponse = await db_1.db.elasticsearch.search(query, 'search_queries');
    if (esQueryResponse.length > 0) {
        const esResultsResponse = await db_1.db.elasticsearch.search(query);
        return res.json(esResultsResponse);
    }
    const tmdbResponse = await db_1.db.tmdb.search(query);
    const filteredData = tmdbResponse.data.results.filter(isValidDataItem_1.validateMovies);
    db_1.db.elasticsearch.indexMovies(filteredData);
    await db_1.db.elasticsearch.indexSearchQuery(query);
    await db_1.db.redis.set(query, tmdbResponse.data.results);
    return res.json(tmdbResponse.data.results);
};
exports.searchRouter = searchRouter;
//# sourceMappingURL=index.js.map