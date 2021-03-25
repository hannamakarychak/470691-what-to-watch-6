import {ActionType} from "../action";

const initialState = {
  movie: null,
  isLoaded: false
};

export const selectedMovie = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FILM:
      return {
        ...state,
        isLoaded: true,
        movie: action.payload
      };

    case ActionType.SET_MOVIE_FAVORITE:
      return {
        ...state,
        movie: {
          ...state.movie,
          "is_favorite": action.payload.isFavorite
        }
      };

    default:
      return state;
  }
};
