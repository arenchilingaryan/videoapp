"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheMovieDb = void 0;
const MovieDB = require("node-themoviedb");
const envConfig_1 = require("../config/envConfig");
class TheMovieDb {
    constructor() {
        this.tmdb = new MovieDB(envConfig_1.envConfig.TMDB_API_KEY);
    }
    async getTopRated() {
        const response = await this.tmdb.movie.getTopRated({
            query: {
                page: 1,
            },
        });
        return response.data;
    }
    async search(query) {
        const response = await this.tmdb.search.movies({
            query: {
                query,
            },
        });
        return response;
    }
}
exports.TheMovieDb = TheMovieDb;
//# sourceMappingURL=tmdb.js.map