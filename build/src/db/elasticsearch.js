"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSearch = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const envConfig_1 = require("../config/envConfig");
require('events').EventEmitter.defaultMaxListeners = 200;
class ElasticSearch {
    constructor() {
        this.elasticsearch = new elasticsearch_1.Client({
            node: `http://localhost:${envConfig_1.envConfig.ES_PORT}`,
        });
    }
    async indexSearchQuery(query) {
        try {
            await this.elasticsearch.index({
                index: 'search_queries',
                body: {
                    query,
                },
            });
        }
        catch (error) {
            console.error('ElasticSearch query indexing error:', error);
            throw error;
        }
    }
    async indexMovies(movies) {
        const bulkBody = [];
        for (const movie of movies) {
            bulkBody.push({
                index: {
                    _index: 'movies',
                },
            });
            bulkBody.push(movie);
        }
        try {
            await this.elasticsearch.bulk({ body: bulkBody });
        }
        catch (error) {
            console.error('ElasticSearch bulk indexing error:', error);
            throw error;
        }
    }
    async search(query, index = 'movies', fields = ['title', 'author', 'description']) {
        var _a;
        try {
            const body = {
                query: {
                    multi_match: {
                        query: query,
                        fields: fields,
                    },
                },
            };
            const response = await this.elasticsearch.search({
                index,
                body,
            });
            return ((_a = response.hits) === null || _a === void 0 ? void 0 : _a.hits) || null;
        }
        catch (error) {
            console.error('ElasticSearch search error:', error);
            throw error;
        }
    }
    async searchByIds(videoIds, index = 'movies') {
        var _a;
        try {
            const body = {
                query: {
                    terms: {
                        id: videoIds,
                    },
                },
            };
            const response = await this.elasticsearch.search({
                index,
                body,
            });
            return ((_a = response.hits) === null || _a === void 0 ? void 0 : _a.hits) || null;
        }
        catch (error) {
            console.error('ElasticSearch search error:', error);
            throw error;
        }
    }
}
exports.ElasticSearch = ElasticSearch;
//# sourceMappingURL=elasticsearch.js.map