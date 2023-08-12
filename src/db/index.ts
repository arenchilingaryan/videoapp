import { NextFunction, Request, Response } from 'express';

import { ElasticSearch } from './elasticsearch';
import { TheMovieDb } from './tmdb';
import { Neo4jService } from './neo4j';
import { RedisDb } from './redis';
import { PrismaDb } from './prisma';

class DataBases {
  tmdb = new TheMovieDb();
  elasticsearch = new ElasticSearch();
  prisma = new PrismaDb();
  neo4j = new Neo4jService();
  redis = new RedisDb();
  constructor() {}
}

export const db = new DataBases();

const extendContextWithDb = (req: Request, _: Response, next: NextFunction) => {
  req.context = req.context || {};
  req.context.userData = { email: '', id: '', userId: '' };

  next();
};

export { extendContextWithDb };
