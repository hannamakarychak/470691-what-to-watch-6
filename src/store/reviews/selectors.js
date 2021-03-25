import {NameSpace} from "../reducer";

export const reviewsSelector = (state) => state[NameSpace.REVIEWS].list;
export const reviewsIsLoadedSelector = (state) => state[NameSpace.REVIEWS].isLoaded;
