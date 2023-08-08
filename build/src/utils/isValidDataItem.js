"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMovies = void 0;
function validateMovies(movie) {
    return (typeof movie.poster_path === 'string' &&
        typeof movie.adult === 'boolean' &&
        typeof movie.overview === 'string' &&
        typeof movie.release_date === 'string' &&
        Array.isArray(movie.genre_ids) &&
        movie.genre_ids.every((id) => typeof id === 'number') &&
        typeof movie.id === 'number' &&
        typeof movie.original_title === 'string' &&
        typeof movie.original_language === 'string' &&
        typeof movie.title === 'string' &&
        typeof movie.backdrop_path === 'string' &&
        typeof movie.popularity === 'number' &&
        typeof movie.vote_count === 'number' &&
        typeof movie.video === 'boolean' &&
        typeof movie.vote_average === 'number');
}
exports.validateMovies = validateMovies;
//# sourceMappingURL=isValidDataItem.js.map