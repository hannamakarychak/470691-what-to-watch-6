import {ActionType} from "../action";

const initialState = {
  isLoaded: false,
  list: []
};

export const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_REVIEWS:
      return {
        ...state,
        isLoaded: true,
        list: action.payload
      };

    default:
      return state;
  }
};
