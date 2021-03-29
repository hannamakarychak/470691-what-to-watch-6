import {ALL_GENRES} from "../../constants";
import {ActionType} from "../action";

export const initialState = {
  genre: ALL_GENRES,
  list: [],
  isLoaded: false
};

export const allMovies = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionType.GET_ALL_MOVIES:
      return {
        ...state,
        isLoaded: true,
        list: action.payload
      };

    case ActionType.SET_MOVIE_FAVORITE:
      return {
        ...state,
        list: state.list.map((movie) => {
          if (movie.id === action.payload.movieId) {
            return {
              ...movie,
              "is_favorite": action.payload.isFavorite
            };
          } else {
            return movie;
          }
        })
      };

    default:
      return state;
  }
};
