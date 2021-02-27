import {ALL_GENRES} from "../constants";
import {ActionType} from "./action";

const initialState = {
  genre: ALL_GENRES,
  list: [],
  isDataLoaded: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionType.GET_ALL_MOVIES:
      return {
        ...state,
        isDataLoaded: true,
        list: action.payload
      };

    default:
      return state;
  }
};
