import { tmdb } from '../../db';
import { redis } from '../../db/redis';
export declare function getTopRatedFromTmdb(theMovieDb: typeof tmdb, redisService: typeof redis): Promise<import("node-themoviedb").Objects.Movie[]>;
