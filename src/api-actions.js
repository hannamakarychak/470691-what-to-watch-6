import {
  getAllMovies,
  getFilm,
  getReviews,
  loggedIn,
  redirectToRoute,
  requireAuthorization,
  setMovieFavorite,
  loggedInFail
} from "./store/action";
import {AuthorizationStatus} from "./constants";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(getAllMovies(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then((response) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loggedIn(response.data.email, response.data.avatar_url));
    })
    .catch(() => { })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then((response) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loggedIn(response.data.email, response.data.avatar_url));
      dispatch(redirectToRoute(`/`));
    })
    .catch(() => {
      dispatch(loggedInFail());
    })
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
    .then(({data}) => dispatch(getFilm(data)))
    .catch(({response}) => {
      if (response.status === 404) {
        dispatch(redirectToRoute(`/404`));
      }
    })
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`comments/${id}`)
    .then(({data}) => dispatch(getReviews(data)))
    .catch(() => { })
);

export const addReview = (movieId, rating, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${movieId}`, {rating, comment})
    .then(() => dispatch(redirectToRoute(`/films/${movieId}`)))
);

export const fetchPromoMovie = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => dispatch(getFilm(data)))
    .catch(() => { })
);

export const addToMyList = (movieId, isFavorite) => (dispatch, _getState, api) => (
  api.post(`/favorite/${movieId}/${isFavorite ? 1 : 0}`)
    .then(() => dispatch(setMovieFavorite(movieId, isFavorite)))
);
