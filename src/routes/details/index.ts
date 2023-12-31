import { Request, Response } from 'express';
import { db } from '../../db';

export const detailsRouter = async (req: Request, res: Response) => {
  const videoId = req.query.id;

  const cacheKey = `videoDetails:${videoId}`;

  try {
    const cachedData = await db.redis.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const searchResult = await db.elasticsearch.searchByIds([
      videoId,
    ] as string[]);

    if (searchResult.length > 0) {
      const videoDetails = searchResult[0];

      await db.redis.set(cacheKey, videoDetails);

      return res.json(videoDetails);
    } else {
      return res.status(404).send('Video not found');
    }
  } catch (error) {
    return res.status(500).send('Failed to fetch video details');
  }
};
