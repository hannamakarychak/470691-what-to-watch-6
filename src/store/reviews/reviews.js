import {ActionType} from "../action";

const initialState = {
  isLoaded: false,
  list: [],
  isSending: false,
  hasError: false
};

export const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS:
      return {
        ...state,
        isLoaded: true,
        list: action.payload
      };

    case ActionType.ADD_REVIEW_REQUEST:
      return {
        ...state,
        hasError: false,
        isSending: true,
      };

    case ActionType.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isSending: false,
        hasError: false
      };

    case ActionType.ADD_REVIEW_FAIL:
      return {
        ...state,
        isSending: false,
        hasError: true
      };

    default:
      return state;
  }
};
