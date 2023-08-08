import { NextFunction, Request, Response } from 'express';
import { elasticsearch } from './elasticsearch';
import { tmdb } from './tmdb';
import { driver } from './neo4j';
declare const extendContextWithDb: (req: Request, _: Response, next: NextFunction) => void;
export { extendContextWithDb, elasticsearch, tmdb, driver };
