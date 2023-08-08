export async function getRecommendationsFromNeo4j(
  context: Express.Request['context']
): Promise<string[]> {
  const userId = context.userData.userId;
  const session = context.neo4j;

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
