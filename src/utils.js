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

export const getRating = (rating) => {
  if (rating >= 0 && rating < 3) {
    return `Bad`;
  } else if (rating >= 3 && rating < 5) {
    return `Normal`;
  } else if (rating >= 5 && rating < 8) {
    return `Good`;
  } else if (rating >= 8 && rating < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
