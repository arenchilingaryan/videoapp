import { Request, Response } from 'express';
import { validateMovies } from '../../utils/isValidDataItem';

require('events').EventEmitter.defaultMaxListeners = 200;

export const searchRouter = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  const esQueryResponse = await req.context.elasticsearch.search({
    index: 'search_queries',
    body: {
      query: {
        match: { query },
      },
    },
  });

  if (esQueryResponse.hits.hits.length > 0) {
    const esResultsResponse = await req.context.elasticsearch.search({
      index: 'movies',
      body: {
        query: {
          match: { title: query },
        },
      },
    });
    return res.json(esResultsResponse.hits.hits);
  }

  const tmdbResponse = await req.context.tmdb.search.movies({
    query: {
      query,
    },
  });

  const filteredData = tmdbResponse.data.results.filter(validateMovies);

  filteredData.forEach(async movie => {
    await req.context.elasticsearch.index({
      index: 'movies',
      body: movie,
    });
  });

  await req.context.elasticsearch.index({
    index: 'search_queries',
    body: {
      query,
    },
  });

  return res.json(tmdbResponse.data.results);
};
