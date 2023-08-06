import { Request, Response } from 'express';

export const recommendationRouter = async (req: Request, res: Response) => {
  const userId = req.context.userData.userId;
  const session = req.context.neo4j;
  const elasticsearch = req.context.elasticsearch;
  const tmdb = req.context.tmdb;
  const redis = req.context.redis;

  try {
    const result = await session.run(
      `
            MATCH (targetUser:User {id: $userId})-[:WATCHED]->(:Video)<-[:WATCHED]-(similarUser:User)-[:WATCHED]->(recommended:Video)
            WHERE NOT (targetUser)-[:WATCHED]->(recommended)
            RETURN recommended.id AS videoId, COUNT(*) AS commonCount
            ORDER BY commonCount DESC LIMIT 10;
            `,
      { userId }
    );

    const videoRecommendationsIds = result.records
      .map(record => ({
        videoId: record.get('videoId').toString(),
        commonCount: record.get('commonCount').toNumber(),
      }))
      .map(item => item.videoId);

    const body = {
      query: {
        terms: {
          id: videoRecommendationsIds,
        },
      },
    };

    const searchResult = await elasticsearch.search({ index: 'movies', body });

    if (searchResult.hits.hits.length) {
      return res.json(searchResult.hits.hits);
    }
    const cachedData = await redis.get('topRated');
    if (cachedData && cachedData?.length > 0) {
      return res.json(cachedData);
    }

    const cachedTopRated = redis.get('topRated');
    if (cachedTopRated) {
      return res.send(cachedTopRated);
    }

    const tmdbResponse = await tmdb.movie.getTopRated({
      query: {
        page: 1,
      },
    });
    if (tmdbResponse.data.results) {
      const resData = tmdbResponse.data.results.slice(0, 10);
      await redis.set('topRated', JSON.stringify(resData), 'EX', 3600);
      return res.json(resData);
    }
    return res.json([]);
  } catch (error) {
    return res.status(500).send('Failed to fetch recommendations');
  }
};
