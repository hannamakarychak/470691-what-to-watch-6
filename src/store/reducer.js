import {Genres} from "../constants";
import {ActionType} from "./action";

import movies from './mocks/films';

const initialState = {
  genre: Genres.ALL,
  list: movies
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionType.GET_MOVIES_BY_GENRE:
      return {
        ...state,
        list: state.genre === Genres.ALL
          ? movies
          : movies.filter((movie) => movie.genre === state.genre)
      };


    default:
      return state;
  }
};
