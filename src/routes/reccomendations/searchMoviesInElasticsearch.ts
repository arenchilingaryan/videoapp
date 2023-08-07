import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { Movie } from '../../types';
import { elasticsearch } from '../../db';

export async function searchMoviesInElasticsearch(
  es: typeof elasticsearch,
  videoIds: string[]
): Promise<SearchHit<Movie>[]> {
  const body = {
    query: {
      terms: {
        id: videoIds,
      },
    },
  };

  const searchResult = await es.search<Movie>({ index: 'movies', body });
  return searchResult.hits.hits;
}
