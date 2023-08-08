"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopRatedFromTmdb = void 0;
async function getTopRatedFromTmdb(theMovieDb, redisService) {
    const tmdbResponse = await theMovieDb.movie.getTopRated({
        query: {
            page: 1,
        },
    });
    if (tmdbResponse.data.results) {
        const topRated = tmdbResponse.data.results.slice(0, 10);
        await redisService.set('topRated', JSON.stringify(topRated), 'EX', 3600);
        return topRated;
    }
    return [];
}
exports.getTopRatedFromTmdb = getTopRatedFromTmdb;
//# sourceMappingURL=getTopRatedFromTmdb.js.map