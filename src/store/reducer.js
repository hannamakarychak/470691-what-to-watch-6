import {ALL_GENRES, AuthorizationStatus} from "../constants";
import {ActionType} from "./action";

const initialState = {
  genre: ALL_GENRES,
  list: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
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

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    default:
      return state;
  }
};
