import * as MovieDB from 'node-themoviedb';
import { envConfig } from '../config/envConfig';

const tmdb = new MovieDB(envConfig.TMDB_API_KEY);

export { tmdb };
