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

    default:
      return state;
  }
};
