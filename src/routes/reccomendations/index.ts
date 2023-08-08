import { Request, Response } from 'express';
import { getRecommendationsFromNeo4j } from './getRecommendationsFromNeo4j';
import { searchMoviesInElasticsearch } from './searchMoviesInElasticsearch';
import { getTopRatedFromRedis } from './getTopRatedFromRedis';
import { getTopRatedFromTmdb } from './getTopRatedFromTmdb';

export const recommendationRouter = async (req: Request, res: Response) => {
  try {
    const recommendations = await getRecommendationsFromNeo4j(req.context);

    if (recommendations.length) {
      const movies = await searchMoviesInElasticsearch(
        req.context.elasticsearch,
        recommendations
      );
      return res.json(movies);
    }

    const cachedTopRated = await getTopRatedFromRedis(req.context.redis);
    if (cachedTopRated) {
      return res.json(cachedTopRated);
    }

    const topRatedFromTmdb = await getTopRatedFromTmdb(
      req.context.tmdb,
      req.context.redis
    );
    return res.json(topRatedFromTmdb);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Failed to fetch recommendations');
  }
};
