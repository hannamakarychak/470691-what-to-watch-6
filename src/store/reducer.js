import {combineReducers} from 'redux';
import {allMovies} from "./all-movies/all-movies";
import {userAuthorization} from "./user/user";
import {selectedMovie} from "./selected-movie/selected-movie";
import {reviews} from "./reviews/reviews";

// const initialState = {
//   genre: ALL_GENRES,
//   list: [],
//   isMoviesListLoaded: false,
//   authorizationStatus: AuthorizationStatus.NO_AUTH,
//   user: {
//     email: null,
//     avatar: null
//   },
//   film: null,
//   isMovieLoaded: false,
//   isReviewsLoaded: false,
//   reviews: []
// };

// export const reducer = (state = initialState, action) => {
//   switch (action.type) {
// case ActionType.SET_GENRE:
//   return {
//     ...state,
//     genre: action.payload
//   };

// case ActionType.GET_ALL_MOVIES:
//   return {
//     ...state,
//     isMoviesListLoaded: true,
//     list: action.payload
//   };

// case ActionType.REQUIRED_AUTHORIZATION:
//   return {
//     ...state,
//     authorizationStatus: action.payload
//   };

// case ActionType.LOGGED_IN:
//   return {
//     ...state,
//     user: {
//       email: action.payload.email,
//       avatar: action.payload.avatar
//     }
//   };

// case ActionType.GET_FILM:
//   return {
//     ...state,
//     isMovieLoaded: true,
//     film: action.payload
//   };

// case ActionType.GET_REVIEWS:
//   return {
//     ...state,
//     isReviewsLoaded: true,
//     reviews: action.payload
//   };

//     default:
//       return state;
//   }
// };

export const NameSpace = {
  ALL_MOVIES: `ALL_MOVIES`,
  USER: `USER`,
  SELECTED_MOVIE: `SELECTED_MOVIE`,
  REVIEWS: `REVIEWS`
};

export default combineReducers({
  [NameSpace.ALL_MOVIES]: allMovies,
  [NameSpace.USER]: userAuthorization,
  [NameSpace.SELECTED_MOVIE]: selectedMovie,
  [NameSpace.REVIEWS]: reviews
});

