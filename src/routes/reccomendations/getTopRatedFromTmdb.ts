import { tmdb } from '../../db';
import { redis } from '../../db/redis';

export async function getTopRatedFromTmdb(
  theMovieDb: typeof tmdb,
  redisService: typeof redis
) {
  const tmdbResponse = await theMovieDb.movie.getTopRated({
    query: {
      page: 1,
    },
  });
  if (tmdbResponse.data.results) {
    const topRated = tmdbResponse.data.results.slice(0, 10);
    await redisService.set('topRated', JSON.stringify(topRated), 'EX', 3600);
    return topRated;
  }
  return [];
}
