import {NameSpace} from "../reducer";

export const reviewsSelector = (state) => state[NameSpace.REVIEWS].list;
export const reviewsIsLoadedSelector = (state) => state[NameSpace.REVIEWS].isLoaded;
export const reviewIsSendingSelector = (state) => state[NameSpace.REVIEWS].isSending;
export const reviewHasErrorSelector = (state) => state[NameSpace.REVIEWS].hasError;
