import {AuthorizationStatus} from "../../constants";
import {ActionType} from "../action";

export const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: null,
  avatar: null,
  isLoaded: false,
  hasError: false
};

export const userAuthorization = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
        isLoaded: true
      };

    case ActionType.LOGGED_IN:
      return {
        ...state,
        email: action.payload.email,
        avatar: action.payload.avatar,
        isLoaded: true,
        hasError: false
      };

    case ActionType.LOGGED_IN_FAIL:
      return {
        ...state,
        isLoaded: true,
        hasError: true
      };

    default:
      return state;
  }
};
