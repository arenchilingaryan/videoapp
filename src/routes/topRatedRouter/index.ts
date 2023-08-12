import { Request, Response } from 'express';
import { db } from '../../db';

export const topRatedRouter = async (_: Request, res: Response) => {
  const cachedData = await db.redis.get('topRated');
  if (cachedData) {
    return res.send(cachedData);
  }

  const tmdbResponse = await db.tmdb.getTopRated();

  const result = tmdbResponse.results.slice(0, 10);

  await db.redis.set('topRated', result);
  return res.json(result);
};
