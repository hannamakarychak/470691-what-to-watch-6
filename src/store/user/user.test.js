import MockAdapter from "axios-mock-adapter";

import {createApi} from "../../api";
import {userAuthorization} from "./user";
import {AuthorizationStatus} from "../../constants";
import {ActionType} from "../action";
import {checkAuth, login} from "../../api-actions";

const api = createApi(() => { });

describe(`Reducer reviews should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(userAuthorization(undefined, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: null,
      avatar: null,
      isLoaded: false,
      hasError: false
    });
  });

  it(`Reducer should update authorization status to 'AUTH'`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: null,
      avatar: null,
      isLoaded: false,
      hasError: false
    };
    const requireAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(userAuthorization(state, requireAuthorizationAction)).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
      email: null,
      avatar: null,
      isLoaded: true,
      hasError: false
    });
  });

  it(`Reducer should update user data after login`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: null,
      avatar: null,
      isLoaded: false,
      hasError: false
    };
    const loggedInAction = {
      type: ActionType.LOGGED_IN,
      payload: {
        email: `test@gmail.com`,
        avatar: `https://avatar.com/face.png`
      }
    };

    expect(userAuthorization(state, loggedInAction)).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      email: `test@gmail.com`,
      avatar: `https://avatar.com/face.png`,
      isLoaded: true,
      hasError: false
    });
  });
});

describe(`Async operations work correctly`, () => {
  it(`Should make a correct Api call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {
        "email": `email@test.com`,
        "avatar_url": `https://avatar.com/face.png`
      });

    return checkAuthLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOGGED_IN,
          payload: {
            email: `email@test.com`,
            avatar: `https://avatar.com/face.png`
          }
        });
      });
  });

  it(`Should post correct Api call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkLoginLoader = login({"email": `email@test.com`, "avatar_url": `https://avatar.com/face.png`});

    apiMock
      .onPost(`/login`)
      .reply(200, {
        "email": `email@test.com`,
        "avatar_url": `https://avatar.com/face.png`
      });

    return checkLoginLoader(dispatch, () => { }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOGGED_IN,
          payload: {
            email: `email@test.com`,
            avatar: `https://avatar.com/face.png`
          }
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`
        });
      });
  });
});
