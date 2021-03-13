import {ALL_GENRES, AuthorizationStatus} from "../constants";
import {ActionType} from "./action";

const initialState = {
  genre: ALL_GENRES,
  list: [],
  isMoviesListLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    email: null,
    avatar: null
  },
  film: null,
  isMovieLoaded: false,
  isReviewsLoaded: false,
  reviews: []
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
        isMoviesListLoaded: true,
        list: action.payload
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };

    case ActionType.LOGGED_IN:
      return {
        ...state,
        user: {
          email: action.payload.email,
          avatar: action.payload.avatar
        }
      };

    case ActionType.GET_FILM:
      return {
        ...state,
        isMovieLoaded: true,
        film: action.payload
      };

    case ActionType.GET_REVIEWS:
      return {
        ...state,
        isReviewsLoaded: true,
        reviews: action.payload
      };

    default:
      return state;
  }
};
