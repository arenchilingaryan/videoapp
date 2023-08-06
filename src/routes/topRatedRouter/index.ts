import { Request, Response } from 'express';

export const topRatedRouter = async (req: Request, res: Response) => {
  const tmdb = req.context.tmdb;
  const redis = req.context.redis;
  const cachedData = await redis.get('topRated');
  if (cachedData) {
    return res.send(JSON.parse(cachedData));
  }

  const tmdbResponse = await tmdb.movie.getTopRated({
    query: {
      page: 1,
    },
  });

  const result = tmdbResponse.data.results.slice(0, 10);

  redis.set('topRated', JSON.stringify(result), 'EX', 3600);
  return res.json(result);
};
