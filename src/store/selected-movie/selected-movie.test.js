import MockAdapter from "axios-mock-adapter";

import {createApi} from "../../api";
import {addToMyList, fetchFilm} from "../../api-actions";
import {adaptMovieToClient} from "../../api-adapter";
import {ActionType} from "../action";
import {mockMovie} from "../action.test";
import {selectedMovie} from "./selected-movie";

const api = createApi(() => { });
describe(`Reducer 'selected movie' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(selectedMovie(undefined, {})).toEqual({
      movie: null,
      isLoaded: false
    });
  });

  it(`Reducer should get selected movie`, () => {
    const state = {
      movie: null,
      isLoaded: false
    };

    const getSelectedMovieAction = {
      type: ActionType.GET_FILM,
      payload: adaptMovieToClient(mockMovie)
    };

    expect(selectedMovie(state, getSelectedMovieAction));
  });

  it(`Reducer should set movie favorite`, () => {
    const state = {
      movie: null,
      isLoaded: false
    };

    const setFavoriteMovieAction = {
      type: ActionType.SET_MOVIE_FAVORITE,
      payload: {
        movieId: 1,
        isFavorite: true
      }
    };

    expect(selectedMovie(state, setFavoriteMovieAction));
  });
});

describe(`Async operations work correctly`, () => {
  it(`Async operation for getting movie works correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/films/1`)
      .reply(200, mockMovie);

    fetchFilm(1)(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.GET_FILM,
          payload: adaptMovieToClient(mockMovie)
        });
      });
  });

  it(`Async operation for setting favorite movie to 'true' works correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200);

    addToMyList(1, true)(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_MOVIE_FAVORITE,
          payload: {
            movieId: 1,
            isFavorite: true
          }
        });
      });
  });

  it(`Async operation for setting favorite movie to 'false' works correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(200);

    addToMyList(1, false)(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_MOVIE_FAVORITE,
          payload: {
            movieId: 1,
            isFavorite: false
          }
        });
      });
  });
});
