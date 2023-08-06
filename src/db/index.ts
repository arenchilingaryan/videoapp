import { NextFunction, Request, Response } from 'express';

import { elasticsearch } from './elasticsearch';
import { tmdb } from './tmdb';
import { driver } from './neo4j';
import { redis } from './redis';
import { prisma } from './prisma';

const extendContextWithDb = (req: Request, _: Response, next: NextFunction) => {
  req.context = req.context || {};
  req.context.elasticsearch = elasticsearch;
  req.context.tmdb = tmdb;
  req.context.neo4j = driver;
  req.context.redis = redis;
  req.context.prisma = prisma;
  req.context.userData = { email: '', id: '', userId: '' };

  next();
};

export { extendContextWithDb, elasticsearch, tmdb, driver };
