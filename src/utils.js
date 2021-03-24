import {ALL_GENRES} from "./constants";

export const getUniqueGenres = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};

export const getMoviesBySelectedGenre = (movies, selectedGenre) => {
  return selectedGenre === ALL_GENRES
    ? movies
    : movies.filter((movie) => movie.genre === selectedGenre);
};

export const formatTime = (seconds) => {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

  const fullHours = Math.floor(seconds / SECONDS_IN_HOUR);
  const remainingSecondsAfterHour = seconds % SECONDS_IN_HOUR;
  const fullMinutes = Math.floor(remainingSecondsAfterHour / SECONDS_IN_MINUTE);
  const fullSeconds = Math.floor(remainingSecondsAfterHour % SECONDS_IN_MINUTE);

  return `${fullHours.toString().padStart(2, `0`)}:${fullMinutes.toString().padStart(2, `0`)}:${fullSeconds.toString().padStart(2, `0`)}`;
};
