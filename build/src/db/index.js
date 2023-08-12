"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendContextWithDb = exports.db = void 0;
const elasticsearch_1 = require("./elasticsearch");
const tmdb_1 = require("./tmdb");
const neo4j_1 = require("./neo4j");
const redis_1 = require("./redis");
const prisma_1 = require("./prisma");
class DataBases {
    constructor() {
        this.tmdb = new tmdb_1.TheMovieDb();
        this.elasticsearch = new elasticsearch_1.ElasticSearch();
        this.prisma = new prisma_1.PrismaDb();
        this.neo4j = new neo4j_1.Neo4jService();
        this.redis = new redis_1.RedisDb();
    }
}
exports.db = new DataBases();
const extendContextWithDb = (req, _, next) => {
    req.context = req.context || {};
    req.context.userData = { email: '', id: '', userId: '' };
    next();
};
exports.extendContextWithDb = extendContextWithDb;
//# sourceMappingURL=index.js.map