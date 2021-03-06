import {ActionCreator} from "./store/action";
import {AuthorizationStatus} from "./constants";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.getAllMovies(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({auth}) => dispatch(ActionCreator.requireAuthorization(auth)))
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
