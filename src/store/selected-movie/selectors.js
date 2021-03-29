import {createSelector} from "reselect";
import {getMoviesBySelectedGenre} from "../../utils";
import {allMoviesSelector} from "../all-movies/selectors";

import {NameSpace} from "../reducer";

export const selectedMovieSelector = (state) => state[NameSpace.SELECTED_MOVIE].movie;
export const selectedMovieLoadedSelector = (state) => state[NameSpace.SELECTED_MOVIE].isLoaded;
export const relatedMoviesSelector = createSelector(
  allMoviesSelector,
  selectedMovieSelector,
  (allMovies, selectedMovie) =>
    selectedMovie
      ? getMoviesBySelectedGenre(allMovies, selectedMovie.genre).filter(({id}) => id !== +selectedMovie.id).slice(0, 4)
      : []
);

export const selectedMovieNameSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.name : null
);

export const selectedMovieVideoSrcSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.videoLink : null
);

export const selectedMoviePreviewImgSrcSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.previewImage : null
);

export const selectedMoviePosterImgSrcSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.posterImage : null
);

export const selectedMovieBackgroundImgSrcSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.backgroundImage : null
);

export const selectedMovieBackgroundColorSelector = createSelector(
  selectedMovieSelector,
  (movie) => movie ? movie.backgroundColor : null
);
