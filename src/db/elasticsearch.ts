import { Client } from '@elastic/elasticsearch';
import { envConfig } from '../config/envConfig';
import { Movie } from '../types';

require('events').EventEmitter.defaultMaxListeners = 200;

export class ElasticSearch {
  elasticsearch: Client;

  constructor() {
    this.elasticsearch = new Client({
      node: `${envConfig.ES_SERVICE}:${envConfig.ES_PORT}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.initialize().catch(error => {
      console.error('Error initializing Elasticsearch indices:', error);
    });
  }

  async ensureIndexExists(indexName: string) {
    const indexExists = await this.elasticsearch.indices.exists({
      index: indexName,
    });

    if (!indexExists) {
      await this.elasticsearch.indices.create({ index: indexName });
      console.log(`Index ${indexName} created successfully.`);
    } else {
      console.log(`Index ${indexName} already exists.`);
    }
  }

  async initialize() {
    await this.ensureIndexExists('movies');
    await this.ensureIndexExists('search_queries');
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

      return response.hits?.hits || null;
    } catch (error) {
      console.error('ElasticSearch search error:', error);
      throw error;
    }
  }

  async searchByIds(videoIds: string[], index = 'movies') {
    try {
      const body = {
        query: {
          terms: {
            id: videoIds,
          },
        },
      };
      const response = await this.elasticsearch.search<Movie>({
        index,
        body,
      });
      return response.hits?.hits || null;
    } catch (error) {
      console.error('ElasticSearch search error:', error);
      throw error;
    }
  }
}
