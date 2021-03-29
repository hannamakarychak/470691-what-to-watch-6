import {
  getAllMovies,
  getFilm,
  getReviews,
  loggedIn,
  redirectToRoute,
  requireAuthorization,
  setMovieFavorite,
  loggedInFail,
  addReviewRequest,
  addReviewSuccess,
  addReviewFail
} from "./store/action";
import {AuthorizationStatus} from "./constants";
import {adaptMovieToClient, adaptUserToClient} from "./api-adapter";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(getAllMovies(data.map(adaptMovieToClient))))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      const userData = adaptUserToClient(data);
      dispatch(loggedIn(userData.email, userData.avatarUrl));
    })
    .catch(() => { })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      const userData = adaptUserToClient(data);
      dispatch(loggedIn(userData.email, userData.avatarUrl));
      dispatch(redirectToRoute(`/`));
    })
    .catch(() => {
      dispatch(loggedInFail());
    })
);

export const fetchFilm = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
    .then(({data}) => dispatch(getFilm(adaptMovieToClient(data))))
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

export const addReview = (movieId, rating, comment) => (dispatch, _getState, api) => {
  dispatch(addReviewRequest());

  return api.post(`/comments/${movieId}`, {rating, comment})
    .then(() => {
      dispatch(addReviewSuccess());
      dispatch(redirectToRoute(`/films/${movieId}`));
    })
    .catch(() => {
      dispatch(addReviewFail());
    });
};

export const fetchPromoMovie = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => dispatch(getFilm(adaptMovieToClient(data))))
    .catch(() => { })
);

export const addToMyList = (movieId, isFavorite) => (dispatch, _getState, api) => (
  api.post(`/favorite/${movieId}/${isFavorite ? 1 : 0}`)
    .then(() => dispatch(setMovieFavorite(movieId, isFavorite)))
);
