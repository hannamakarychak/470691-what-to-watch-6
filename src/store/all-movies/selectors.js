import {createSelector} from "reselect";

import {getMoviesBySelectedGenre, getUniqueGenres} from "../../utils";
import {NameSpace} from "../reducer";

export const allMoviesSelector = (state) => state[NameSpace.ALL_MOVIES].list;
export const selectedGenreSelector = (state) => state[NameSpace.ALL_MOVIES].genre;
export const allMoviesLoadedSelector = (state) => state[NameSpace.ALL_MOVIES].isLoaded;

export const moviesByGenreSelector = createSelector(
  allMoviesSelector,
  selectedGenreSelector,
  (allMovies, selectedGenre) => getMoviesBySelectedGenre(allMovies, selectedGenre)
);

export const allGenresSelector = createSelector(
  allMoviesSelector,
  (allMovies) => getUniqueGenres(allMovies)
);

export const favoriteMoviesSelector = createSelector(
  allMoviesSelector,
  (allMovies) => allMovies.filter((movie) => movie.is_favorite)
);
