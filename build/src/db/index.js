"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver = exports.tmdb = exports.elasticsearch = exports.extendContextWithDb = void 0;
const elasticsearch_1 = require("./elasticsearch");
Object.defineProperty(exports, "elasticsearch", { enumerable: true, get: function () { return elasticsearch_1.elasticsearch; } });
const tmdb_1 = require("./tmdb");
Object.defineProperty(exports, "tmdb", { enumerable: true, get: function () { return tmdb_1.tmdb; } });
const neo4j_1 = require("./neo4j");
Object.defineProperty(exports, "driver", { enumerable: true, get: function () { return neo4j_1.driver; } });
const redis_1 = require("./redis");
const prisma_1 = require("./prisma");
const extendContextWithDb = (req, _, next) => {
    req.context = req.context || {};
    req.context.elasticsearch = elasticsearch_1.elasticsearch;
    req.context.tmdb = tmdb_1.tmdb;
    req.context.neo4j = neo4j_1.driver;
    req.context.redis = redis_1.redis;
    req.context.prisma = prisma_1.prisma;
    req.context.userData = { email: '', id: '', userId: '' };
    next();
};
exports.extendContextWithDb = extendContextWithDb;
//# sourceMappingURL=index.js.map