"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMoviesInElasticsearch = void 0;
async function searchMoviesInElasticsearch(es, videoIds) {
    const body = {
        query: {
            terms: {
                id: videoIds,
            },
        },
    };
    const searchResult = await es.search({ index: 'movies', body });
    return searchResult.hits.hits;
}
exports.searchMoviesInElasticsearch = searchMoviesInElasticsearch;
//# sourceMappingURL=searchMoviesInElasticsearch.js.map