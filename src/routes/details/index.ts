import { Request, Response } from 'express';

export const detailsRouter = async (req: Request, res: Response) => {
  const videoId = req.query.id;
  const elasticsearch = req.context.elasticsearch;
  const redis = req.context.redis;

  const cacheKey = `videoDetails:${videoId}`;

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const body = {
      query: {
        term: {
          id: videoId,
        },
      },
    };

    const searchResult = await elasticsearch.search({ index: 'movies', body });

    if (searchResult.hits.hits.length) {
      const videoDetails = searchResult.hits.hits[0]._source;

      await redis.set(cacheKey, JSON.stringify(videoDetails), 'EX', 3600);

      return res.json(videoDetails);
    } else {
      return res.status(404).send('Video not found');
    }
  } catch (error) {
    return res.status(500).send('Failed to fetch video details');
  }
};
