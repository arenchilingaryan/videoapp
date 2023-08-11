import { NextFunction, Request, Response } from 'express';

import { elasticsearch } from './elasticsearch';
import { tmdb } from './tmdb';
import { driver } from './neo4j';
import { redis } from './redis';
import { prisma } from './prisma';

class DataBases {
  tmdb;
  elasticsearch;
  prisma;
  neo4j;
  redis;
  constructor() {
    this.tmdb = tmdb;
    this.elasticsearch = elasticsearch;
    this.prisma = prisma;
    this.neo4j = driver;
    this.redis = redis;
  }
}

export const db = new DataBases();

const extendContextWithDb = (req: Request, _: Response, next: NextFunction) => {
  req.context = req.context || {};
  req.context.userData = { email: '', id: '', userId: '' };

  next();
};

export { extendContextWithDb, elasticsearch, tmdb, driver };
