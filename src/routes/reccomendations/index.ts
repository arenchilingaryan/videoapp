import { Request, Response } from 'express';
import { getRecommendationsFromNeo4j } from './getRecommendationsFromNeo4j';
import { db } from '../../db';

export const recommendationRouter = async (req: Request, res: Response) => {
  try {
    const recommendations = await getRecommendationsFromNeo4j(
      req.context.userData
    );

    if (recommendations.length) {
      const movies = await db.elasticsearch.searchByIds(recommendations);
      return res.json(movies);
    }

    const cachedTopRated = await db.redis.get('topRated');
    if (cachedTopRated) {
      return res.json(cachedTopRated);
    }

    const topRatedFromTmdb = await db.tmdb.getTopRated();
    return res.json(topRatedFromTmdb);
  } catch (error) {
    return res.status(500).send('Failed to fetch recommendations');
  }
};
