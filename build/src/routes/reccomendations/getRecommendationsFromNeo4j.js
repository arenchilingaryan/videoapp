"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendationsFromNeo4j = void 0;
const db_1 = require("../../db");
async function getRecommendationsFromNeo4j(userData) {
    const userId = userData.userId;
    const session = db_1.db.neo4j;
    const result = await session.run(`
            MATCH (targetUser:User {id: $userId})-[:WATCHED]->(:Video)<-[:WATCHED]-(similarUser:User)-[:WATCHED]->(recommended:Video)
            WHERE NOT (targetUser)-[:WATCHED]->(recommended)
            RETURN recommended.id AS videoId, COUNT(*) AS commonCount
            ORDER BY commonCount DESC LIMIT 10;
            `, { userId });
    return result.records.map(record => record.get('videoId').toString());
}
exports.getRecommendationsFromNeo4j = getRecommendationsFromNeo4j;
//# sourceMappingURL=getRecommendationsFromNeo4j.js.map