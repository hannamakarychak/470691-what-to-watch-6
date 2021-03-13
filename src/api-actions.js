import {ActionCreator} from "./store/action";
import {AuthorizationStatus} from "./constants";
import browserHistory from "./browser-history";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.getAllMovies(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loggedIn(response.data.email, response.data.avatar_url));
    })
    .catch(() => { })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then((response) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loggedIn(response.data.email, response.data.avatar_url));
    })
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
    .then(({data}) => dispatch(ActionCreator.getFilm(data)))
    .catch(({response}) => {
      if (response.status === 404) {
        browserHistory.push(`/404`);
      }
    })
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`comments/${id}`)
    .then(({data}) => dispatch(ActionCreator.getReviews(data)))
    .catch(() => { })
);

export const addReview = (movieId, rating, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${movieId}`, {rating, comment})
    .then(() => dispatch(ActionCreator.redirectToRoute(`/films/${movieId}`)))
);
