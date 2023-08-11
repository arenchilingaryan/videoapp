import { Client } from '@elastic/elasticsearch';
import { envConfig } from '../config/envConfig';
import { Movie } from '../types';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

require('events').EventEmitter.defaultMaxListeners = 200;

class ElasticSearch {
  elasticsearch: Client;

  constructor() {
    this.elasticsearch = new Client({
      node: `http://localhost:${envConfig.ES_PORT}`,
    });
  }

  async indexSearchQuery(query: string): Promise<void> {
    try {
      await this.elasticsearch.index({
        index: 'search_queries',
        body: {
          query,
        },
      });
    } catch (error) {
      console.error('ElasticSearch query indexing error:', error);
      throw error;
    }
  }

  async indexMovies(movies: any[]): Promise<void> {
    const bulkBody = [];
    for (const movie of movies) {
      bulkBody.push({
        index: {
          _index: 'movies',
        },
      });
      bulkBody.push(movie);
    }

    try {
      await this.elasticsearch.bulk({ body: bulkBody });
    } catch (error) {
      console.error('ElasticSearch bulk indexing error:', error);
      throw error;
    }
  }

  async search(
    query: string,
    index = 'movies',
    fields = ['title', 'author', 'description']
  ) {
    try {
      const body = {
        query: {
          multi_match: {
            query: query,
            fields: fields,
          },
        },
      };

      const response = await this.elasticsearch.search<Movie>({
        index,
        body,
      });

      return response.hits.hits;
    } catch (error) {
      console.error('ElasticSearch search error:', error);
      throw error;
    }
  }

  async searchByIds(videoIds: string[], index = 'movies'): Promise<Movie[]> {
    try {
      const body = {
        query: {
          terms: {
            id: videoIds,
          },
        },
      };
      const response = this.elasticsearch.search({
        index,
        body,
      });
      return (response as any).body.hits.hits;
    } catch (error) {
      console.error('ElasticSearch search error:', error);
      throw error;
    }
  }
}

const elasticsearch = new ElasticSearch();

export { elasticsearch };
