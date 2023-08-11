import { db } from '../../db';

export async function getRecommendationsFromNeo4j(
  userData: Express.Request['context']['userData']
): Promise<string[]> {
  const userId = userData.userId;
  const session = db.neo4j;

  const result = await session.run(
    `
            MATCH (targetUser:User {id: $userId})-[:WATCHED]->(:Video)<-[:WATCHED]-(similarUser:User)-[:WATCHED]->(recommended:Video)
            WHERE NOT (targetUser)-[:WATCHED]->(recommended)
            RETURN recommended.id AS videoId, COUNT(*) AS commonCount
            ORDER BY commonCount DESC LIMIT 10;
            `,
    { userId }
  );

  return result.records.map(record => record.get('videoId').toString());
}
