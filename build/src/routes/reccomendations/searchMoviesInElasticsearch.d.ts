import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { Movie } from '../../types';
import { elasticsearch } from '../../db';
export declare function searchMoviesInElasticsearch(es: typeof elasticsearch, videoIds: string[]): Promise<SearchHit<Movie>[]>;
