import * as MovieDB from 'node-themoviedb';
export declare class TheMovieDb {
    tmdb: MovieDB;
    constructor();
    getTopRated(): Promise<MovieDB.Responses.Movie.GetTopRated>;
    search(query: string): Promise<ReturnType<MovieDB.Endpoints.Search['movies']>>;
}
