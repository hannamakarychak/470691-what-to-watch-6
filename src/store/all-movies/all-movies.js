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

    default:
      return state;
  }
};
