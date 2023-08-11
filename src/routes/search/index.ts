import { Request, Response } from 'express';
import { validateMovies } from '../../utils/isValidDataItem';
import { db } from '../../db';

export const searchRouter = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  const esQueryResponse = await db.elasticsearch.search(
    query,
    'search_queries'
  );

  if (esQueryResponse.length > 0) {
    const esResultsResponse = await db.elasticsearch.search(query);
    return res.json(esResultsResponse);
  }

  const tmdbResponse = await db.tmdb.search(query);

  const filteredData = tmdbResponse.data.results.filter(validateMovies);

  db.elasticsearch.indexMovies(filteredData);

  await db.elasticsearch.indexSearchQuery(query);

  return res.json(tmdbResponse.data.results);
};
