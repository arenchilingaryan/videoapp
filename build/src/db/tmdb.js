"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmdb = void 0;
const MovieDB = require("node-themoviedb");
const envConfig_1 = require("../config/envConfig");
const tmdb = new MovieDB(envConfig_1.envConfig.TMDB_API_KEY);
exports.tmdb = tmdb;
//# sourceMappingURL=tmdb.js.map