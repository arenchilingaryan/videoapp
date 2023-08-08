import { Result } from 'neo4j-driver';
declare const neo4jDriver: import("neo4j-driver/types/driver").Driver;
export declare class Neo4jService {
    driver: typeof neo4jDriver;
    createNodeIfNotExists(label: string, id: string): Promise<void>;
    run(query: string, parameters?: Record<string, any>): Promise<Result>;
    createWatchedRelation(userId: string, videoId: string): Promise<any>;
}
declare const driver: Neo4jService;
export { driver };
