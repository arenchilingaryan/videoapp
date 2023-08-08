"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driver = exports.Neo4jService = void 0;
const neo4j_driver_1 = require("neo4j-driver");
const envConfig_1 = require("../config/envConfig");
const neo4jDriver = neo4j_driver_1.default.driver('neo4j+s://82ed60fa.databases.neo4j.io', neo4j_driver_1.default.auth.basic('neo4j', envConfig_1.envConfig.NEO4J_PASSWORD));
class Neo4jService {
    constructor() {
        this.driver = neo4jDriver;
    }
    async createNodeIfNotExists(label, id) {
        const session = this.driver.session();
        await session.run(`
      MERGE (n:${label} {id: $id})
      RETURN n`, { id });
        session.close();
    }
    async run(query, parameters) {
        const session = this.driver.session();
        try {
            return await session.run(query, parameters);
        }
        finally {
            session.close();
        }
    }
    async createWatchedRelation(userId, videoId) {
        await this.createNodeIfNotExists('User', userId);
        await this.createNodeIfNotExists('Video', videoId);
        const session = this.driver.session();
        const result = await session.run(`
      MATCH (u:User {id: $userId})
      MATCH (v:Video {id: $videoId})
      MERGE (u)-[r:WATCHED]->(v)
      RETURN type(r)`, { userId, videoId });
        session.close();
        return result;
    }
}
exports.Neo4jService = Neo4jService;
const driver = new Neo4jService();
exports.driver = driver;
//# sourceMappingURL=neo4j.js.map