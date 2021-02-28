import {ActionCreator} from "./store/action";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.getAllMovies(data)))
);
