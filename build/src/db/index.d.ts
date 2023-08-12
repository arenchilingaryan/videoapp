import { NextFunction, Request, Response } from 'express';
import { ElasticSearch } from './elasticsearch';
import { TheMovieDb } from './tmdb';
import { Neo4jService } from './neo4j';
import { RedisDb } from './redis';
import { PrismaDb } from './prisma';
declare class DataBases {
    tmdb: TheMovieDb;
    elasticsearch: ElasticSearch;
    prisma: PrismaDb;
    neo4j: Neo4jService;
    redis: RedisDb;
    constructor();
}
export declare const db: DataBases;
declare const extendContextWithDb: (req: Request, _: Response, next: NextFunction) => void;
export { extendContextWithDb };
