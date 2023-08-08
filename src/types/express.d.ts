import { elasticsearch, tmdb, driver } from '../db';
import { prisma } from '../db/prisma';
import { redis } from '../db/redis';
import { UserType } from '../types';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      context: {
        userData: Omit<UserType, 'password'>;
        elasticsearch: typeof elasticsearch;
        tmdb: typeof tmdb;
        neo4j: typeof driver;
        redis: typeof redis;
        prisma: typeof prisma;
      };
    }
  }
}

declare module 'hpagent';
