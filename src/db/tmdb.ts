import * as MovieDB from 'node-themoviedb';
import { envConfig } from '../config/envConfig';

class TheMovieDb {
  tmdb;
  constructor() {
    this.tmdb = new MovieDB(envConfig.TMDB_API_KEY);
  }
  async getTopRated(): Promise<MovieDB.Responses.Movie.GetTopRated> {
    const response = await this.tmdb.movie.getTopRated({
      query: {
        page: 1,
      },
    });
    return response.data;
  }

  async search(
    query: string
  ): Promise<ReturnType<MovieDB.Endpoints.Search['movies']>> {
    const response = await this.tmdb.search.movies({
      query: {
        query,
      },
    });
    return response;
  }
}

const tmdb = new TheMovieDb();

export { tmdb };
