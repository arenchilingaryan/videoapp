"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const isValidDataItem_1 = require("../../utils/isValidDataItem");
require('events').EventEmitter.defaultMaxListeners = 200;
const searchRouter = async (req, res) => {
    const query = req.query.query;
    const esQueryResponse = await req.context.elasticsearch.search({
        index: 'search_queries',
        body: {
            query: {
                match: { query },
            },
        },
    });
    if (esQueryResponse.hits.hits.length > 0) {
        const esResultsResponse = await req.context.elasticsearch.search({
            index: 'movies',
            body: {
                query: {
                    match: { title: query },
                },
            },
        });
        return res.json(esResultsResponse.hits.hits);
    }
    const tmdbResponse = await req.context.tmdb.search.movies({
        query: {
            query,
        },
    });
    const filteredData = tmdbResponse.data.results.filter(isValidDataItem_1.validateMovies);
    filteredData.forEach(async (movie) => {
        await req.context.elasticsearch.index({
            index: 'movies',
            body: movie,
        });
    });
    await req.context.elasticsearch.index({
        index: 'search_queries',
        body: {
            query,
        },
    });
    return res.json(tmdbResponse.data.results);
};
exports.searchRouter = searchRouter;
//# sourceMappingURL=index.js.map