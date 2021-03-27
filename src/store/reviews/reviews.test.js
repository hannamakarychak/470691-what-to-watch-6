import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api';
import {ActionType} from '../action';
import {reviews} from './reviews';
import {mockReviews} from '../action.test';
import {addReview, fetchReviews} from '../../api-actions';

const api = createApi(() => { });
describe(`Reducer 'reviews' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reviews(undefined, {})).toEqual({
      list: [],
      isLoaded: false
    });
  });

  it(`Reducer should update reviews list`, () => {
    const state = {
      list: [],
      isLoaded: false
    };
    const getReviewsAction = {
      type: ActionType.GET_REVIEWS,
      payload: mockReviews
    };

    expect(reviews(state, getReviewsAction)).toEqual({
      list: mockReviews,
      isLoaded: true
    });
  });

  it(`Async operation for getting reviews works correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    apiMock
      .onGet(`comments/1`)
      .reply(200, mockReviews);

    fetchReviews(1)(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.GET_REVIEWS,
          payload: mockReviews
        });
      });
  });

  it(`Async operation for adding review works correctly`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = {
      rating: 2,
      comment: `super cool movie`
    };

    apiMock
      .onPost(`/comments/1`, fakeReview)
      .reply(200);

    return addReview(1, 2, `super cool movie`)(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/films/1`
        });
      });
  });
});
