import {ALL_GENRES} from "./constants";

export const getUniqueGenres = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};

export const getMoviesBySelectedGenre = (movies, selectedGenre) => {
  return selectedGenre === ALL_GENRES
    ? movies
    : movies.filter((movie) => movie.genre === selectedGenre);
};
