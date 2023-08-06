import neo4j, { Result, Session } from 'neo4j-driver';
import { envConfig } from '../config/envConfig';

const neo4jDriver = neo4j.driver(
  'neo4j+s://82ed60fa.databases.neo4j.io',
  neo4j.auth.basic('neo4j', envConfig.NEO4J_PASSWORD!)
);

export class Neo4jService {
  driver: typeof neo4jDriver = neo4jDriver;
  async createNodeIfNotExists(label: string, id: string): Promise<void> {
    const session = this.driver.session();
    await session.run(
      `
      MERGE (n:${label} {id: $id})
      RETURN n`,
      { id }
    );
    session.close();
  }

  async run(query: string, parameters?: Record<string, any>): Promise<Result> {
    const session: Session = this.driver.session();
    try {
      return await session.run(query, parameters);
    } finally {
      session.close();
    }
  }

  async createWatchedRelation(userId: string, videoId: string): Promise<any> {
    console.log(userId, videoId);

    await this.createNodeIfNotExists('User', userId);
    await this.createNodeIfNotExists('Video', videoId);

    const session = this.driver.session();
    const result = await session.run(
      `
      MATCH (u:User {id: $userId})
      MATCH (v:Video {id: $videoId})
      MERGE (u)-[r:WATCHED]->(v)
      RETURN type(r)`,
      { userId, videoId }
    );
    session.close();
    return result;
  }
}

const driver = new Neo4jService();

export { driver };
