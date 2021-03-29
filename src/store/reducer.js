import {combineReducers} from 'redux';
import {allMovies} from "./all-movies/all-movies";
import {userAuthorization} from "./user/user";
import {selectedMovie} from "./selected-movie/selected-movie";
import {reviews} from "./reviews/reviews";

export const NameSpace = {
  ALL_MOVIES: `ALL_MOVIES`,
  USER: `USER`,
  SELECTED_MOVIE: `SELECTED_MOVIE`,
  REVIEWS: `REVIEWS`,
};

export default combineReducers({
  [NameSpace.ALL_MOVIES]: allMovies,
  [NameSpace.USER]: userAuthorization,
  [NameSpace.SELECTED_MOVIE]: selectedMovie,
  [NameSpace.REVIEWS]: reviews,
});

