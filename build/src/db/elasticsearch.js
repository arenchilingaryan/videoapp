"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elasticsearch = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const envConfig_1 = require("../config/envConfig");
const elasticsearch = new elasticsearch_1.Client({
    node: `http://localhost:${envConfig_1.envConfig.ES_PORT}`,
});
exports.elasticsearch = elasticsearch;
//# sourceMappingURL=elasticsearch.js.map