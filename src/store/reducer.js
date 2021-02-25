import {ALL_GENRES} from "../constants";
import {ActionType} from "./action";

import movies from '../mocks/films';

const initialState = {
  genre: ALL_GENRES,
  list: movies
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    default:
      return state;
  }
};
